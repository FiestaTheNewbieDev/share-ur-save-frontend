import privateRoutesMiddleware from '@/middlewares/privateRoutesMiddleware';
import publicRoutesMiddleware from '@/middlewares/publicRoutesMiddleware';
import SERVICES from '@/services';
import { User } from '@/types/users';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	let user: User = null;
	try {
		user = (
			await SERVICES.auth.fetchUser(
				request.cookies.get('session_id')?.value,
			)
		).data.user;
	} catch (error) {}

	let response = NextResponse.next();
	if (user) response.headers.set('X-User-Info', btoa(JSON.stringify(user)));

	response = privateRoutesMiddleware(request, response, user);

	response = publicRoutesMiddleware(request, response, user);

	return response;
}

export const config = {
	matcher: '/:path*',
};
