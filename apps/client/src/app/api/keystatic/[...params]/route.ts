import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Check if we have valid Keystatic credentials
const hasValidCredentials =
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  process.env.KEYSTATIC_SECRET &&
  !process.env.KEYSTATIC_GITHUB_CLIENT_ID.includes('placeholder') &&
  !process.env.KEYSTATIC_GITHUB_CLIENT_SECRET.includes('placeholder');

// Only create handler if we have valid credentials
const handler = hasValidCredentials
  ? makeRouteHandler({
      config,
      clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!,
      secret: process.env.KEYSTATIC_SECRET!,
    })
  : null;

export async function GET(request: Request) {
  if (!handler) {
    return NextResponse.json(
      {
        error: 'Keystatic not configured',
        message: 'Please set up Keystatic environment variables. See VERCEL_BUILD_FIX.md for instructions.',
        requiredVars: [
          'KEYSTATIC_GITHUB_CLIENT_ID',
          'KEYSTATIC_GITHUB_CLIENT_SECRET',
          'KEYSTATIC_SECRET',
          'NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG'
        ]
      },
      { status: 503 }
    );
  }
  return handler.GET(request);
}

export async function POST(request: Request) {
  if (!handler) {
    return NextResponse.json(
      {
        error: 'Keystatic not configured',
        message: 'Please set up Keystatic environment variables. See VERCEL_BUILD_FIX.md for instructions.'
      },
      { status: 503 }
    );
  }
  return handler.POST(request);
}
