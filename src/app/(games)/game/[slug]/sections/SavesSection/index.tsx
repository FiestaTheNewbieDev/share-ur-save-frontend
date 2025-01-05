'use client';

import SaveCard from '@/app/(games)/game/[slug]/components/SaveCard';
import { useGamePageCtx } from '@/app/(games)/game/[slug]/context';
import Paginator from '@/components/Paginator';
import Spinner from '@/components/Spinner';
import Tabs from '@/components/Tabs';
import SavesActions from '@/store/saves/actions';
import useSaves from '@/store/saves/selector';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import './style.scss';

export default function SavesSectionsRenderer() {
	const context = useGamePageCtx();

	const router = useRouter();

	function handlePageChange(page: number) {
		context.pagination.setPage(page);

		const params = new URLSearchParams();
		params.append('tab', context.tab);
		params.append('page', page.toString());
		params.append('size', context.pagination.size.toString());

		router.push(`?${params.toString()}`, undefined, { shallow: true });
	}

	function handlePageSizeChange(size: number) {
		context.pagination.setPage(1);
		context.pagination.setSize(size);

		const params = new URLSearchParams();
		params.append('tab', context.tab);
		params.append('page', '1');
		params.append('size', size.toString());

		router.push(`?${params.toString()}`, undefined, { shallow: true });
	}

	useEffect(() => {
		SavesActions.fetchSaves(context.gameUuid, {
			tab: context.tab,
			size: context.pagination.size,
			page: context.pagination.page,
		}).then(({ totalCount, totalPages }) => {
			context.pagination.setTotalCount(totalCount);
			context.pagination.setTotalPages(totalPages);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.tab, context.pagination.size, context.pagination.page]);

	return (
		<section className="game__saves-section">
			<Tabs
				className="game__saves-tabs weglot-translate"
				selected={context.tab}
				onTab={context.setTab}
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

			<SavesRendering />

			<Paginator
				className="game__saves-paginator"
				currentPage={context.pagination.page}
				pageSize={context.pagination.size}
				totalCount={context.pagination.totalCount}
				totalPages={context.pagination.totalPages}
				onPageChange={handlePageChange}
				onSizeChange={handlePageSizeChange}
			/>
		</section>
	);
}

function SavesRendering() {
	const { gameUuid, tab } = useGamePageCtx();
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
					<SaveCard key={index} save={save} />
				))}
			</ul>
		);
	}

	return <div className="game__saves-error-container">Error</div>;
}
