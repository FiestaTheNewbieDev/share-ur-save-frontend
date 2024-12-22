export type GenericState<T extends any> = {
	data: T;
};

const genericInitialState = {
	data: undefined,
};

export default genericInitialState;
