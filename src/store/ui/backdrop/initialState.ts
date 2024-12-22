export type BackdropState = {
	stack: {
		id: string;
		zIndex: number;
	}[];
};

const initialState: BackdropState = {
	stack: [],
};

export default initialState;
