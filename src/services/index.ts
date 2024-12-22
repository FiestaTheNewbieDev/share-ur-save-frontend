import authService from '@/services/auth';
import gamesService from '@/services/games';
import savesService from '@/services/saves';

const SERVICES = {
	auth: authService,
	games: gamesService,
	saves: savesService,
};

export default SERVICES;
