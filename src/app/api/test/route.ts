import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  try {
    // Test connection to your backend
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: 'test@example.com',
        password: 'testpassword',
        authType: 'email'
      })
    });
    
    const data = await response.text();
    
    return NextResponse.json({
      status: response.status,
      backendUrl,
      response: data,
      headers: Object.fromEntries(response.headers.entries())
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      backendUrl
    }, { status: 500 });
  }
}