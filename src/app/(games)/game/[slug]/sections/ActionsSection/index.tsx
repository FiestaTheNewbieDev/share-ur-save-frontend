import AddSaveBtn from '@/app/(games)/game/[slug]/sections/ActionsSection/AddSaveBtn';
import getUserOnSSR from '@/hooks/server/getUserOnSSR';
import './style.scss';

interface IProps {
	gameUuid: string;
}

export default async function ActionsSection({ gameUuid }: IProps) {
	const user = await getUserOnSSR();

	return (
		<section className="game__actions-section">
			<div className="left"></div>
			<div className="right">
				{user && <AddSaveBtn gameUuid={gameUuid} />}
			</div>
		</section>
	);
}
