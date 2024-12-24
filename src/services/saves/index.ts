import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';
import { Save, SavesTab } from 'share-ur-save-common';

const BASE_URL = '/saves';

type SavesService = {
	addSave: typeof addSave;
	fetchGameSaves: typeof fetchGameSaves;
};

const addSave = (
	gameUuid: string,
	body: { title: string; description?: string; downloadUrl: string },
): Promise<ApiResponse<{ save: Save }>> =>
	requester(true).post<{ save: Save }>(`/save/${gameUuid}`, body);

const fetchGameSaves = (
	gameUuid: string,
	params: { tab: SavesTab; size: number; page: number },
): Promise<ApiResponse<{ count: number; saves: Save[] }>> => {
	const urlParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		urlParams.append(key, value.toString());
	}

	return requester(false).get<{ count: number; saves: Save[] }>(
		`${BASE_URL}/${gameUuid}?${urlParams.toString()}`,
	);
};

const savesService: SavesService = {
	addSave,
	fetchGameSaves,
};

export default savesService;
