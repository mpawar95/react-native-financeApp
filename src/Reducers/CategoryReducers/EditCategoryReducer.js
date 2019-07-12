
import {
	EDIT_CATEGORY_NAME_CHANGED,
	EDIT_CATEGORY_MODAL_VISIBLE,
	EDIT_CATEGORY_FAIL,
	EDIT_CATEGORY_SUCCESS,
	GET_CATEGORY_SUCCESS,
	GET_CATEGORY_FAIL,
	UPDATE_ITEM_FAIL,
	UPDATE_ITEM_SUCCESS,
	EDIT_CATEGORY_SELECTED_ITEMS,
	EDIT_CATEGORY_SET_ITEM,
	EDIT_CATEGORY_HANDLE_BACK_PRESS
} from '../../Actions/CategoryActions/types';
const INITIAL_STATE = {
	dialogVisible: false,
	categoryName: "",
	category_icon: "",
	selected_cat_icon_name:"",
	selected_cat_index:0,
	category_Icon: [
		{  key: 0, icon: "airplay" },
		{  key: 1, icon: "assistant" },
		{  key: 2, icon: "beenhere" },
		{  key: 3, icon: "build" },
		{  key: 4, icon: "cached" },
		{  key: 5, icon: "cake" },
		{  key: 6, icon: "call" },
		{  key: 7, icon: "casino" },
		{  key: 8, icon: "cast" },
		{  key: 9, icon: "close" },
		{  key: 10, icon: "done" },
		{  key: 11, icon: "face" },
	],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EDIT_CATEGORY_HANDLE_BACK_PRESS:
			return {
				...state,
				...INITIAL_STATE
			}
		case EDIT_CATEGORY_SET_ITEM:
			return {
				...state,
				selected_cat_icon_name:action.payload
			}
		case EDIT_CATEGORY_MODAL_VISIBLE: 
			return { ...state, dialogVisible: action.payload }
		case EDIT_CATEGORY_NAME_CHANGED:
			return { ...state, categoryName: action.payload }
		case GET_CATEGORY_SUCCESS:
			return { ...state, categoryName: action.payload.oldCategoryName, category_icon: action.payload.oldCategoryIcon }
		case GET_CATEGORY_FAIL:
			return { ...state, ...INITIAL_STATE }
		case UPDATE_ITEM_SUCCESS:
			return {...state, }
		case UPDATE_ITEM_FAIL:
			return {...state, ...INITIAL_STATE}
		case EDIT_CATEGORY_SELECTED_ITEMS:
			return {
				...state,
				selected_cat_icon_name:action.payload.item_icon,
				selected_cat_index:action.payload.item_key
			}
		default:
			return state;
	}
};
