
import {
	EDIT_ACCOUNT_INPUT_CHANGE,
	GET_ACCOUNT_NAME_SUCCESS,
	GET_ACCOUNT_NAME_FAIL,
	UPDATE_ITEM_SUCCESS,
	UPDATE_ITEM_FAIL,
	DELETE_ACCOUNT_SUCCESS,
	DELETE_ACCOUNT_FAIL,
	EDIT_ACCOUNT_COLOR_PICKER_VISIBLE,
	EDIT_ACCOUNT_ITEM_SELECTED
} from '../../Actions/AccountActions/types';
const INITIAL_STATE = {
	accountInput: "",
	error: "",
	pick_color: "#a9a9a9",
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
	selected_index:0,
	is_Color_Picker_Visible:false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EDIT_ACCOUNT_INPUT_CHANGE:
			return { ...state, accountInput: action.payload }
		case GET_ACCOUNT_NAME_SUCCESS:
			return {
				...state, 
				accountInput: action.account_name, 
				pick_color: action.account_pick_color,
				selected_index:action.account_color_index
			}
		case EDIT_ACCOUNT_ITEM_SELECTED:
			return {
				...state,
				pick_color:action.payload.item_color,
				selected_index:action.payload.item_key
			}
		case EDIT_ACCOUNT_COLOR_PICKER_VISIBLE:
			return {
				...state, 
				is_Color_Picker_Visible:action.payload
			}
		case GET_ACCOUNT_NAME_FAIL:
			return { ...state, error: "Something Wrong" }
		case UPDATE_ITEM_SUCCESS:
			return { ...state, }
		case UPDATE_ITEM_FAIL:
			return { ...state, error: "Something Wrong" }
		case DELETE_ACCOUNT_SUCCESS:
			return { ...state,...INITIAL_STATE}
		case DELETE_ACCOUNT_FAIL:
			return { ...state, error: "Something Wrong" }
		default:
			return state;
	}
};
