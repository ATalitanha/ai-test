import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

export class ApiHandler {
  static success<T>(data: T): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      data,
    };
    return NextResponse.json(response);
  }

  static error(error: string, status: number = 400): NextResponse {
    const response: ApiResponse<never> = {
      success: false,
      error,
    };
    return NextResponse.json(response, { status });
  }

  static unauthorized(message: string = 'Unauthorized'): NextResponse {
    return this.error(message, 401);
  }

  static forbidden(message: string = 'Forbidden'): NextResponse {
    return this.error(message, 403);
  }

  static notFound(message: string = 'Not found'): NextResponse {
    return this.error(message, 404);
  }

  static serverError(message: string = 'Internal server error'): NextResponse {
    return this.error(message, 500);
  }
}