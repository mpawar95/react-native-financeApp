
import {
	ACCOUNT_INPUT_CHANGE,
	BALANCE_INPUT_CHANGE,
	CREATE_NEW_ACCOUNT_SUCCESS,
	CREATE_NEW_ACCOUNT_FAIL,
	BALANCE_INPUT_INVALID,
	ADD_NEWACCOUNT_ITEM_SELECTED,
	ADD_NEWACCOUNT_COLOR_SELECTED,
	ADD_NEW_ACCOUNT_SCREEN_LOAD
} from '../../Actions/AddNewAccountActions/types';


const INITIAL_STATE = {
	accountInput: '',
	balanceInput: '',
	is_balance_valid: true,
	is_account_name: 0,
	is_balance: 0,
	selected_index: 0,
	selected_color: "#a9a9a9",
	data: [
		{ color: "#a9a9a9", key: 0 },
		{ color: "#006400", key: 1 },
		{ color: "#bdb76b", key: 2 },
		{ color: "#8b008b", key: 3 },
		{ color: "#556b2f", key: 4 },
		{ color: "#ff8c00", key: 5 },
		{ color: "#9932cc", key: 6 },
		{ color: "#8b0000", key: 7 },
		{ color: "#e9967a", key: 8 },
		{ color: "#483d8b", key: 9 },
		{ color: "#2f4f4f", key: 10 },
		{ color: "#ff1493", key: 11 },
	],
	is_Color_Picker_Visible: false,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_NEW_ACCOUNT_SCREEN_LOAD:
			return { ...state, ...INITIAL_STATE }
		case ADD_NEWACCOUNT_ITEM_SELECTED:
			return { ...state, selected_index: action.payload.item_key, selected_color: action.payload.item_color }
		case ADD_NEWACCOUNT_COLOR_SELECTED:
			return { ...state, is_Color_Picker_Visible:action.payload}
		case ACCOUNT_INPUT_CHANGE:
			return { ...state, accountInput: action.payload, is_account_name: action.payload ? action.payload.length : 0 }
		case CREATE_NEW_ACCOUNT_SUCCESS:
			return { ...state, ...INITIAL_STATE }
		case CREATE_NEW_ACCOUNT_FAIL:
			return { ...state,  ...INITIAL_STATE}
		case BALANCE_INPUT_INVALID:
			return { ...state, balanceInput: "", is_balance: null }
		case BALANCE_INPUT_CHANGE:
			return { ...state, balanceInput: action.payload, is_balance: action.payload ? action.payload.length : 0 }
		default:
			return state;
	}
};
