import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';
import { AggregatedSave, SavesTab } from 'share-ur-save-common';

type SavesService = {
	addSave: typeof addSave;
	fetchGameSaves: typeof fetchGameSaves;
	upvoteSave: typeof upvoteSave;
	downvoteSave: typeof downvoteSave;
};

type FetchGameSavesResponse = {
	count: number;
	saves: AggregatedSave[];
	totalCount: number;
	totalPages: number;
};

type VoteSaveResponse = {
	message: string;
	save: AggregatedSave;
};

const addSave = (
	gameUuid: string,
	body: {
		title: string;
		description?: string;
		downloadUrl: string;
		thumbnail?: File;
	},
): Promise<ApiResponse<{ save: AggregatedSave }>> => {
	const formData = new FormData();

	for (const [key, value] of Object.entries(body)) {
		if (value) formData.append(key, value);
	}

	return requester(true).post<{ save: AggregatedSave }>(
		`/game/${gameUuid}/add-save`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
	);
};

const fetchGameSaves = (
	gameUuid: string,
	params: { tab: SavesTab; size: number; page: number },
): Promise<ApiResponse<FetchGameSavesResponse>> => {
	const urlParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		urlParams.append(key, value.toString());
	}

	return requester(true).get<FetchGameSavesResponse>(
		`/game/${gameUuid}/get-saves?${urlParams.toString()}`,
	);
};

const upvoteSave = (saveUuid: string): Promise<ApiResponse<VoteSaveResponse>> =>
	requester(true).post<VoteSaveResponse>(`/save/${saveUuid}/upvote`);

const downvoteSave = (
	saveUuid: string,
): Promise<ApiResponse<VoteSaveResponse>> =>
	requester(true).post<VoteSaveResponse>(`/save/${saveUuid}/downvote`);

const savesService: SavesService = {
	addSave,
	fetchGameSaves,
	upvoteSave,
	downvoteSave,
};

export default savesService;
