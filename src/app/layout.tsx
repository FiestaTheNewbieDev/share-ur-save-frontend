import Navbar from '@/components/Navbar';
import UserS2CGateway from '@/components/S2CGateway/UserS2CGateway';
import StoreProvider from '@/components/StoreProvider';
import WeglotInitializer from '@/components/WeglotInitializer';
import cn from '@/misc/classNames';
import '@/styles/global.scss';
import { User } from '@/types/users';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ShareUrSave',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const classNames = cn(inter.className);

	let user: User | null = null;
	const userHeader = (await headers()).get('X-User-Info');

	if (userHeader) {
		user = JSON.parse(atob(userHeader));
	}

	return (
		<html lang="en">
			<body id="root" className={classNames}>
				<StoreProvider>
					<Toaster
						position="top-center"
						closeButton={true}
						richColors
					/>

					<main>{children}</main>
					<Navbar />

					<UserS2CGateway user={user} />
				</StoreProvider>

				<WeglotInitializer />
			</body>
		</html>
	);
}
