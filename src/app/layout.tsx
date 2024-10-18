import Navbar from '@/components/navbar/Navbar';
import StoreProvider from '@/components/StoreProvider';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ShareUrSave',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={classNames(inter.className, 'bg-slate-50')}>
				<StoreProvider>
					<Toaster richColors position="top-center" closeButton />
					<Navbar />
					{children}
				</StoreProvider>
			</body>
		</html>
	);
}
