import SERVICES from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const PRIVATE_ROUTES = ['/profile'];
const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
	let user = null;
	try {
		user = (
			await SERVICES.auth.fetchUser(
				request.cookies.get('session_id')?.value,
			)
		).data.user;
	} catch (error) {}

	let response = NextResponse.next();
	if (user) response.headers.set('x-user', JSON.stringify(user));

	if (PRIVATE_ROUTES.includes(request.nextUrl.pathname) && !user) {
		response = NextResponse.redirect(new URL('/sign-in', request.url));
		response.headers.set('Cache-Control', 'no-store');
	}

	if (PUBLIC_ROUTES.includes(request.nextUrl.pathname) && user) {
		const referer = request.headers.get('referer') || '/profile';
		response = NextResponse.redirect(new URL(referer, request.url));
		response.headers.set('Cache-Control', 'no-store');
	}

	return response;
}

export const config = {
	matcher: '/:path*',
};
