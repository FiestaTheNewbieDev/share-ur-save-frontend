import { RootContextProvider } from '@/app/context';
import Navbar from '@/components/Navbar';
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
	let user: User = null;
	const userHeader = (await headers()).get('X-User-Info');

	if (userHeader) {
		user = JSON.parse(atob(userHeader));
	}

	return (
		<html lang="en">
			<body id="root" className={inter.className}>
				<RootContextProvider userFromServer={user}>
					<Toaster
						position="top-center"
						closeButton={true}
						richColors
					/>
					<Navbar />
					<main>{children}</main>
				</RootContextProvider>
			</body>
		</html>
	);
}
