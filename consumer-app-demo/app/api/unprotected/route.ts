// app/api/unprotected/route.ts

import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { NextResponse } from 'next/server';

// IMPORTANT: This API route uses the Cerebras key directly, bypassing our security.
const cerebras = new Cerebras({
    apiKey: process.env.CEREBRAS_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userInput = body.message;
    const userRequestedModel = body.model;

    console.log("🔴 UNPROTECTED: Calling Cerebras directly...");

    const mainLLMResponse = await cerebras.chat.completions.create({
        model: userRequestedModel,
        messages: [{ role: 'user', content: userInput }],
        temperature: 0.7,
    });
    
    return NextResponse.json(mainLLMResponse);

  } catch (error) {
    console.error('Error in unprotected route:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}