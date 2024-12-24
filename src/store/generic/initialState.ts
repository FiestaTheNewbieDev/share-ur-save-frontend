export type FetchStatus = 'NOT_FETCHED' | 'FETCHING' | 'FETCHED' | 'ERRORED';

export type FetchError = {
	code: number;
};

export type GenericState<T extends any> = { status: FetchStatus } & (
	| {
			status: 'NOT_FETCHED' | 'FETCHING';
	  }
	| {
			status: 'FETCHED';
			data: T;
	  }
	| {
			status: 'ERRORED';
			error: FetchError;
	  }
);

const genericInitialState: GenericState<any> = {
	status: 'NOT_FETCHED',
};

export default genericInitialState;
