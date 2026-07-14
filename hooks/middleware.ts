import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.cookies.get('session')) {
    const res = NextResponse.next();
    const myWixClient = createClient({
      auth: OAuthStrategy({clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!})
    });
    res.cookies.set(
      'session',
      JSON.stringify(await myWixClient.auth.generateVisitorTokens())
    );
    return res;
  }
}