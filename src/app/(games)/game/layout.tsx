import './style.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="game__container">{children}</div>;
}
