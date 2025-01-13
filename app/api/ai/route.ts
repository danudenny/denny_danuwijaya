import { NextResponse } from 'next/server';
import { chatWithAI } from '@/app/utils/ai';

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await chatWithAI(message, context);
    
    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('AI API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process AI request',
        message: error.message || 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
