

import { 
	EXPENCE_SELECTED_MONEY_ICON
	} from '../../Actions/HomeActions/types';
const INITIAL_STATE = {
	selected_money_icon:""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EXPENCE_SELECTED_MONEY_ICON:
			return {...state, selected_money_icon:action.payload}
		default:
			return state;
	}
};
