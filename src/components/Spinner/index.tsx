import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

export default function Spinner() {
	return <FontAwesomeIcon className="spinner" icon={faSpinner} />;
}
