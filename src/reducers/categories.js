import { GET_CATEGORIES } from '../actions';

const categories = (state = [], action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};

export default categories;
