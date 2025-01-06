import { Button, LinkButton } from '@/components/button';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { AggregatedSave } from 'share-ur-save-common';

import { useGamePageCtx } from '@/app/(games)/game/[slug]/context';
import getPlaceholderUrl from '@/misc/getPlaceholderUrl';
import getDisplayName from '@/misc/user/getDisplayName';
import SavesActions from '@/store/saves/actions';
import { User } from '@/types/users';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import './style.scss';

export default function SaveCard({ save }: { save: AggregatedSave }) {
	const { tab } = useGamePageCtx();

	function upvote() {
		SavesActions.upvote(save.uuid, tab);
	}

	function downvote() {
		SavesActions.downvote(save.uuid, tab);
	}

	return (
		<li className="game__save-card">
			<Image
				src={save.thumbnailUrl || getPlaceholderUrl()}
				alt=""
				width={128}
				height={64}
			/>
			<div className="content">
				<p className="title">{save.title}</p>
				<p className="author">
					<span className="weglot-translate">Author:</span>{' '}
					<span className="value">
						{getDisplayName(save.author as User)}
					</span>
				</p>
				<p className="upload-date">
					<span className="weglot-translate">Uploaded:</span>{' '}
					<span className="value">
						{new Date(save.createdAt).toLocaleDateString()}
					</span>
				</p>
				<p className="last-update">
					<span className="weglot-translate">Last updated:</span>{' '}
					<span className="value">
						{new Date(save.updatedAt).toLocaleDateString()}
					</span>
				</p>
			</div>
			<div className="actions">
				<div className="upvote-actions">
					<Button
						onClick={upvote}
						variant={
							save.customerVote?.type === 'UP'
								? 'primary'
								: 'outline'
						}
					>
						<ArrowBigUp />
					</Button>
					<Button>{save.score}</Button>
					<Button
						onClick={downvote}
						variant={
							save.customerVote?.type === 'DOWN'
								? 'primary'
								: 'outline'
						}
					>
						<ArrowBigDown />
					</Button>
				</div>
				<LinkButton href={save.downloadUrl} target="_blank">
					<FontAwesomeIcon icon={faDownload} />
					<span className="weglot-translate">Download</span>
				</LinkButton>
			</div>
		</li>
	);
}
