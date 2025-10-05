// app/api/protected/route.ts

import { NextResponse } from 'next/server';
import axios, { isAxiosError } from 'axios';

// The URL where your Guardrail AI Docker container will be running
const GUARDRAIL_API_URL = process.env.GUARDRAIL_API_URL || 'https://guardrail-ai-2trd.vercel.app/v1/chat/completions';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("🟢 PROTECTED: Calling Guardrail AI Service...");
    
    const guardrailResponse = await axios.post(
      GUARDRAIL_API_URL,
      body,
      {
        headers: {
          'x-guardrail-api-key': process.env.GUARDRAIL_API_KEY || '',
          'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY}`
        },
      }
    );

    return NextResponse.json(guardrailResponse.data);

  } catch (error) {
    // Forward the error from the Guardrail service
    if (isAxiosError(error)) {
      console.error('Error from Guardrail service:', error.response?.data);
      return NextResponse.json(
        error.response?.data || { error: 'An error occurred while contacting Guardrail' },
        { status: error.response?.status || 500 }
      );
    }
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}