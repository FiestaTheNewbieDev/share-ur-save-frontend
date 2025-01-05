import {
	faChevronRight,
	faLock,
	faTrash,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import './style.scss';

export default function Sidebar() {
	return (
		<aside className="settings__sidebar">
			<h1 className="title weglot-translate">Settings</h1>
			<ul>
				<li>
					<Link href="/settings/personal">
						<div>
							<FontAwesomeIcon icon={faUser} />
							<span className="weglot-translate">Personal</span>
						</div>
						<FontAwesomeIcon icon={faChevronRight} />
					</Link>
				</li>
				<li>
					<Link href="/settings/security">
						<div>
							<FontAwesomeIcon icon={faLock} />
							<span className="weglot-translate">Security</span>
						</div>
						<FontAwesomeIcon icon={faChevronRight} />
					</Link>
				</li>
				<li>
					<Link href="/settings/delete">
						<div>
							<FontAwesomeIcon icon={faTrash} />
							<span className="weglot-translate">
								Delete account
							</span>
						</div>
						<FontAwesomeIcon icon={faChevronRight} />
					</Link>
				</li>
			</ul>
		</aside>
	);
}
