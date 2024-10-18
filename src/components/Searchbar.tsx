import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function Searchbar() {
	return (
		<div className="relative m-4 flex w-full flex-1 items-center rounded-lg border border-neutral-200 transition-colors duration-300 ease-in-out">
			<input
				type="text"
				placeholder="Search"
				className="flex-1 bg-transparent py-1 pl-2 pr-8 focus:outline-none"
			/>
			<button
				type="button"
				className="absolute right-2 !text-neutral-400"
			>
				<FontAwesomeIcon icon={faSearch} />
			</button>
		</div>
	);
}
