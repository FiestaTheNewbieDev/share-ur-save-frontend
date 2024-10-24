import { RootContextProvider } from '@/app/context';
import Navbar from '@/components/Navbar';
import '@/styles/global.scss';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ShareUrSave',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	let user = null;

	const cookieStore = cookies();
	const userHeader = cookieStore.get('x-user');

	if (userHeader) {
		user = JSON.parse(userHeader.value);
	}

	return (
		<html lang="en">
			<body className={inter.className}>
				<RootContextProvider userFromServer={user}>
					<Navbar />
					{children}
				</RootContextProvider>
			</body>
		</html>
	);
}
