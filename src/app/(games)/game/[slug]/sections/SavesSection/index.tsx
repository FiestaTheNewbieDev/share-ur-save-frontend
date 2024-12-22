'use client';

import LinkButton from '@/components/button/LinkButton';
import Spinner from '@/components/Spinner';
import Tabs from '@/components/Tabs';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AggregatedSave } from 'share-ur-save-common';
import './style.scss';

export default function SavesSectionsRenderer() {
	const searchParams = useSearchParams();
	const tabParam = searchParams.get('tab');

	const [section, setSection] = useState(tabParam || 'new-today');

	const saves: AggregatedSave[] = [
		{
			title: 'Save 1',
			description: 'Save 1 description',
			downloadUrl: 'https://example.com/save1.zip',
			author: {
				uuid: '1',
				username: 'fiesta0412',
				displayName: 'Fiesta0412',
			},
		} as AggregatedSave,
		{
			title: 'Save 2',
			description: 'Save 2 description',
			downloadUrl: 'https://example.com/save2.zip',
			author: {
				uuid: '2',
				username: 'fiesta0412',
				displayName: 'Fiesta0412',
			},
		} as AggregatedSave,
		{
			title: 'Save 2',
			description: 'Save 2 description',
			downloadUrl: 'https://example.com/save2.zip',
			author: {
				uuid: '2',
				username: 'fiesta0412',
				displayName: 'Fiesta0412',
			},
		} as AggregatedSave,
		{
			title: 'Save 2',
			description: 'Save 2 description',
			downloadUrl: 'https://example.com/save2.zip',
			author: {
				uuid: '2',
				username: 'fiesta0412',
				displayName: 'Fiesta0412',
			},
		} as AggregatedSave,
		{
			title: 'Save 2',
			description: 'Save 2 description',
			downloadUrl: 'https://example.com/save2.zip',
			author: {
				uuid: '2',
				username: 'fiesta0412',
				displayName: 'Fiesta0412',
			},
		} as AggregatedSave,
		{
			title: 'Save 2',
			description: 'Save 2 description',
			downloadUrl: 'https://example.com/save2.zip',
			author: {
				uuid: '2',
				username: 'fiesta0412',
				displayName: 'Fiesta0412',
			},
		} as AggregatedSave,
		{
			title: 'Save 2',
			description: 'Save 2 description',
			downloadUrl: 'https://example.com/save2.zip',
			author: {
				uuid: '2',
				username: 'fiesta0412',
				displayName: 'Fiesta0412',
			},
		} as AggregatedSave,
	];

	return (
		<section className="game__saves-section">
			<Tabs
				className="game__saves-tabs weglot-translate"
				selected={section}
				onTab={setSection}
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

			<ul className="game__saves-list">
				{saves.length <= 0 && (
					<div className="loading-container">
						<Spinner />
					</div>
				)}

				{saves.length > 0 &&
					saves.map((save, index) => (
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
								<span className="weglot-translate">
									Download
								</span>
							</LinkButton>
						</li>
					))}
			</ul>
		</section>
	);
}
