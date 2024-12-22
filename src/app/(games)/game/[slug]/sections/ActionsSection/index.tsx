import AddSaveBtn from '@/app/(games)/game/[slug]/sections/ActionsSection/AddSaveBtn';
import './style.scss';

interface IProps {
	gameUuid: string;
}

export default function ActionsSection({ gameUuid }: IProps) {
	return (
		<section className="game__actions-section">
			<div className="left"></div>
			<div className="right">
				<AddSaveBtn gameUuid={gameUuid} />
			</div>
		</section>
	);
}
