import ContentContainer from '@/components/ContentContainer';
import './style.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ContentContainer className="game__container">
			{children}
		</ContentContainer>
	);
}
