import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';
import { Save } from 'share-ur-save-common';

const BASE_URL = '/save';

type SavesService = {
	addSave: typeof addSave;
};

const addSave = (
	gameUuid: string,
	body: { title: string; description?: string; downloadUrl: string },
): Promise<ApiResponse<{ save: Save }>> =>
	requester(true).post<{ save: Save }>(`${BASE_URL}/${gameUuid}`, body);

const savesService: SavesService = {
	addSave,
};

export default savesService;
