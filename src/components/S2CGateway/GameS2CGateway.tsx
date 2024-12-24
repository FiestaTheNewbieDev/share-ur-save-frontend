'use client';

import GamesActions from '@/store/games/actions';
import { useEffect } from 'react';
import { CombinedGame } from 'share-ur-save-common';

interface IProps {
	game: CombinedGame;
}

export default function GameS2CGateway({ game }: IProps) {
	useEffect(() => {
		GamesActions.setGame(game);
	}, [game]);

	return null;
}
