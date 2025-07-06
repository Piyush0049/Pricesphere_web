// lib/error.ts
import { NextResponse } from 'next/server';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}

// Handles thrown errors and returns standardized Next.js error responses
export function handleError(error: unknown) {
  if (error instanceof CustomError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  console.error('[UNEXPECTED ERROR]', error);

  return NextResponse.json(
    {
      success: false,
      message: 'Internal Server Error',
    },
    { status: 500 }
  );
}
