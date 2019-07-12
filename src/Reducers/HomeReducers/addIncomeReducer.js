

import { 

	CHANGE_INCOME_TEXT,
	INCOME_SELECTED_MONEY_ICON
	} from '../../Actions/HomeActions/types';

const INITIAL_STATE = {
	add_income:"",
	count:0,
	selected_money_icon:""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case INCOME_SELECTED_MONEY_ICON:
		return {...state, selected_money_icon:action.payload}
		case CHANGE_INCOME_TEXT:
			return { ...state, add_income: action.payload , count : action.payload.length > 6 ? action.payload : 0 }
		default:
			return state;
	}
};
