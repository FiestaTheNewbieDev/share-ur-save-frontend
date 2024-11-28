import TextInput from '@/components/input/TextInput';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

interface IProps {
	full?: boolean;
}

export default function MiniSearchbar(props: IProps) {
	return (
		<div
			className="mini-searchbar"
			{...(props.full && { 'data-full': true })}
		>
			<TextInput
				placeholder="Search your favorite games..."
				startIcon={faSearch}
				full
			/>
		</div>
	);
}
