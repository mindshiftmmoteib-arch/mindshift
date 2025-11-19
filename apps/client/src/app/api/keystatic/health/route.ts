import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const hasClientSecret = !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const hasSecret = !!process.env.KEYSTATIC_SECRET;

  return NextResponse.json({
    clientId: clientId ? `${clientId.substring(0, 10)}...` : 'NOT_SET',
    hasClientSecret,
    hasSecret,
    nodeEnv: process.env.NODE_ENV,
  });
}
