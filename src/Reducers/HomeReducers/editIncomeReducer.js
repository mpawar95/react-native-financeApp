
import {
    EDIT_ACCOUNT_SELECTED_MONEY_ICON
} from '../../Actions/AccountActions/types';
const INITIAL_STATE = {
	selected_money_icon:""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EDIT_ACCOUNT_SELECTED_MONEY_ICON:
			return {...state, selected_money_icon:action.payload}	
		default:
			return state;
	}
};
