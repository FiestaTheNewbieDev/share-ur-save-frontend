'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { SavesTab } from 'share-ur-save-common';

interface IGamePageContext {
	gameUuid: string;
	setGameUuid: (gameUuid: string) => void;

	tab: SavesTab;
	setTab: (tab: SavesTab) => void;

	pagination: {
		page: number;
		setPage: (page: number) => void;

		size: number;
		setSize: (size: number) => void;

		totalCount: number;
		setTotalCount: (totalCount: number) => void;

		totalPages: number;
		setTotalPages: (totalPages: number) => void;
	};
}

export const GamePageContext = createContext<IGamePageContext>(
	{} as IGamePageContext,
);

interface IProps {
	gameUuid: string;
	tab: SavesTab;
	page: number;
	size: number;
	children: React.ReactNode;
}

export default function GamePageCtxProvider({
	gameUuid,
	tab,
	page,
	size,
	children,
}: IProps) {
	const [_gameUuid, _setGameUuid] = useState<string>(gameUuid);
	const [_tab, _setTab] = useState<SavesTab>(tab);
	const [_page, _setPage] = useState<number>(page);
	const [_size, _setSize] = useState<number>(size);
	const [totalCount, _setTotalCount] = useState<number>(0);
	const [totalPages, _setTotalPages] = useState<number>(1);

	const setGameUuid = useCallback((gameUuid: string) => {
		_setGameUuid(gameUuid);
	}, []);

	const setTab = useCallback((tab: SavesTab) => {
		_setTab(tab);
	}, []);

	const setPage = useCallback((page: number) => {
		_setPage(page);
	}, []);

	const setSize = useCallback((size: number) => {
		_setSize(size);
	}, []);

	const setTotalCount = useCallback((totalCount: number) => {
		_setTotalCount(totalCount);
	}, []);

	const setTotalPages = useCallback((totalPages: number) => {
		_setTotalPages(totalPages);
	}, []);

	const value: IGamePageContext = {
		gameUuid: _gameUuid,
		setGameUuid,

		tab: _tab,
		setTab,

		pagination: {
			page: _page,
			setPage: setPage,

			size: _size,
			setSize: setSize,

			totalCount: totalCount,
			setTotalCount,

			totalPages: totalPages,
			setTotalPages,
		},
	};

	return (
		<GamePageContext.Provider value={value}>
			{children}
		</GamePageContext.Provider>
	);
}

export const useGamePageCtx = () => useContext(GamePageContext);
