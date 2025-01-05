import Sidebar from '@/app/settings/components/Sidebar';
import ContentContainer from '@/components/ContentContainer';
import { ReactNode } from 'react';
import './style.scss';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<ContentContainer className="settings__container">
			<Sidebar />
			<div className="settings__content">{children}</div>
		</ContentContainer>
	);
}
