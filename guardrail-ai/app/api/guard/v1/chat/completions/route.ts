import { ratelimit } from '@/lib/rate-limiter';
import { runIncomingPromptChecks, runOutgoingResponseChecks } from '@/lib/security';
import { CerebrasResponse } from '@/types/global';
import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { NextResponse } from 'next/server';

const securityClient = new Cerebras({
  apiKey: process.env.GUARDRAIL_INTERNAL_CEREBRAS_KEY,
});

export async function POST(request: Request) {
  // Rate Limiting check
  const apiKey = request.headers.get('x-guardrail-api-key');

  if (apiKey) {
    const { success } = await ratelimit.limit(apiKey);
    if (!success) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }
  }

  // Authentication check
  if (apiKey !== process.env.GUARDRAIL_MASTER_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized: Invalid API Key' }, { status: 401 });
  }

  try {
    const authHeader = request.headers.get('Authorization');
    const userCerebrasKey = authHeader?.split(' ')[1];

    const body = await request.json();
    
    const { 
      message: userInput, 
      model: userRequestedModel,
    } = body;

    if (!userInput || !userCerebrasKey) {
      return NextResponse.json({
        error: 'Fields "message" and a valid Cerebras "Authorization" header are required'
      }, { status: 400 });
    }

    // --- STAGE 1: INCOMING PROMPT CHECK ---
    const incomingCheck = await runIncomingPromptChecks(userInput, securityClient);
    if (incomingCheck.decision === 'BLOCKED') {
      return NextResponse.json({
        error: {
          message: "Request blocked by Guardrail AI (Incoming).",
          code: incomingCheck.reason
        }
      }, { status: 403 });
    }

    // --- NEW: STAGE 2: PASS THE REQUEST TO THE MAIN LLM ---
    // Use the user's requested model, or a default if not provided ---
    console.log(`✅ Incoming checks passed. Calling main LLM on behalf of the user...`);

    const userClient = new Cerebras({ apiKey: userCerebrasKey });

    const modelToUse = userRequestedModel || 'llama-4-scout-17b-16e-instruct';
    const mainLLMResponse = await userClient.chat.completions.create({
      model: modelToUse,
      messages: [{
        role: 'user',
        content: userInput
      }],
      temperature: 0.7,
    }) as CerebrasResponse;

    const mainLLMContent = mainLLMResponse.choices[0].message.content || '';


    // --- STAGE 3: OUTGOING RESPONSE CHECK ---
    // We now pass the *real* response to our final security agent.
    const outgoingCheck = await runOutgoingResponseChecks(mainLLMContent, securityClient);
    if (outgoingCheck.decision === 'BLOCKED') {
      return NextResponse.json({
        error: {
          message: "Response blocked by Guardrail AI (Outgoing).",
          code: outgoingCheck.reason
        }
      }, { status: 403 });
    }

    // --- STAGE 4: If all checks pass, return the REAL response ---
    console.log("✅ All checks passed. Sending final response to user.");
    return NextResponse.json(mainLLMResponse);

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({
      error: 'An internal server error occurred'
    }, { status: 500 });
  }
}