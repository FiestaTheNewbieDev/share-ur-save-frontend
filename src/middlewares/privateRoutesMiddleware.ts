import match from '@/misc/match';
import { User } from '@/types/users';
import { NextRequest, NextResponse } from 'next/server';

const ROUTES = [/^\/settings.*/];

export default function privateRoutesMiddleware(
	request: NextRequest,
	response: NextResponse,
	user: User | null,
) {
	if (user) return response;

	for (const route of ROUTES) {
		if (match(request.nextUrl.pathname, route)) {
			const referer = request.headers.get('referer') || '/sign-in';
			response = NextResponse.redirect(new URL(referer, request.url));
			response.headers.set('Cache-Control', 'no-store');
		}
	}

	return response;
}
