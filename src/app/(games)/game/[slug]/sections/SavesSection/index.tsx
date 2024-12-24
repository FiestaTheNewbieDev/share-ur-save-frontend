'use client';

import { LinkButton } from '@/components/button';
import Spinner from '@/components/Spinner';
import Tabs from '@/components/Tabs';
import SavesActions from '@/store/saves/actions';
import useSaves from '@/store/saves/selector';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AggregatedSave, SavesTab } from 'share-ur-save-common';
import './style.scss';

type Props = Readonly<{ gameUuid: string }>;

export default function SavesSectionsRenderer({ gameUuid }: Props) {
	const searchParams = useSearchParams();
	const tabParam = searchParams.get('tab');

	const [tab, setTab] = useState<SavesTab>(
		(tabParam as SavesTab) || 'new-today',
	);

	const saves: AggregatedSave[] = [];

	useEffect(() => {
		SavesActions.fetchSaves(gameUuid, { tab, size: 10, page: 1 });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	return (
		<section className="game__saves-section">
			<Tabs
				className="game__saves-tabs weglot-translate"
				selected={tab}
				onTab={setTab}
				shallow
			>
				<Tabs.Item name="new-today" href="?tab=new-today">
					NEW TODAY
				</Tabs.Item>
				<Tabs.Item name="new-this-week" href="?tab=new-this-week">
					NEW THIS WEEK
				</Tabs.Item>
				<Tabs.Item name="latest" href="?tab=latest">
					LATEST
				</Tabs.Item>
				<Tabs.Item name="popular" href="?tab=popular">
					POPULAR
				</Tabs.Item>
			</Tabs>

			<SavesRendering gameUuid={gameUuid} tab={tab} />
		</section>
	);
}

function SavesRendering({
	gameUuid,
	tab,
}: {
	gameUuid: string;
	tab: SavesTab;
}) {
	const state = useSaves(gameUuid);

	if (!state || !state[tab] || state[tab].status === 'FETCHING') {
		return (
			<div className="game__saves-loading-container">
				<Spinner />
			</div>
		);
	} else if (
		state[tab].status === 'NOT_FETCHED' ||
		(state[tab].status === 'FETCHED' && !state[tab].data.length)
	) {
		return <div className="game__saves-error-container">No Saves</div>;
	} else if (state[tab].status === 'FETCHED') {
		return (
			<ul className="game__saves-list">
				{state[tab].data.map((save, index) => (
					<li key={index} className="item">
						<Image
							src={'https://placehold.co/128x64.jpg'}
							alt=""
							width={128}
							height={64}
						/>
						<div className="info">
							<p className="title">{save.title}</p>
							<p className="desc">{save.description}</p>
						</div>
						<LinkButton href={save.downloadUrl} target="_blank">
							<FontAwesomeIcon icon={faDownload} />
							<span className="weglot-translate">Download</span>
						</LinkButton>
					</li>
				))}
			</ul>
		);
	}

	return <div className="game__saves-error-container">Error</div>;
}
