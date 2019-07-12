import {
	CATEGORY_NAME_CHANGED,
	CATEGORY_FLATLIST_VISIBLE,
	CATEGORY_MODAL_VISIBLE,
	ADD_NEW_CATEGORY_FAIL,
	ADD_NEW_CATEGORY_SUCCESS,
	CATEGORY_SELECTED_FLATLIST_ITEM,
	CATEGORY_FLATLIST_SELECTED_ITEM_NAME,
	CATEGORY_FLATLIST_SELECTED_CAT_ITEM,
	NEW_CATEGORY_SCREEN_LOAD
} from '../../Actions/CategoryActions/types';

const INITIAL_STATE = {
	categoryName:"",
	is_category_avail:false,
	is_displaylist:false,
	dialogVisible:false,
	is_selected:false,
	data: [
		{ select: "Expence", key: 0 },
		{ select: "Income", key: 1 },
	],
	category_Icon: [
		{ key: 0, icon: "airplay" },
		{ key: 1, icon: "assistant" },
		{ key: 2, icon: "beenhere" },
		{ key: 3, icon: "build" },
		{ key: 4, icon: "cached" },
		{ key: 5, icon: "cake" },
		{ key: 6, icon: "call" },
		{ key: 7, icon: "casino" },
		{ key: 8, icon: "cast" },
		{ key: 9, icon: "close" },
		{ key: 10, icon: "done" },
		{ key: 11, icon: "face" },
	],
	selected_index: "",
	selected_name: "",
	selected_cat_icon_name: "airplay",
	selected_cat_index: 0,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEW_CATEGORY_SCREEN_LOAD:
			return {...state, ...INITIAL_STATE}
		case CATEGORY_NAME_CHANGED:
			return { ...state, categoryName:action.payload, is_category_avail:true }
		case CATEGORY_FLATLIST_VISIBLE:
			return { ...state, is_displaylist: action.payload }
		case CATEGORY_MODAL_VISIBLE:
			return { ...state, dialogVisible: action.payload }
		case ADD_NEW_CATEGORY_SUCCESS:
			return { ...state, ...INITIAL_STATE}
		case ADD_NEW_CATEGORY_FAIL:
			return { ...state, ...INITIAL_STATE}
		case CATEGORY_SELECTED_FLATLIST_ITEM:
			return { ...state, is_selected: action.payload }
		case CATEGORY_FLATLIST_SELECTED_ITEM_NAME:
			return { ...state, selected_name: action.payload.item_name, selected_index: action.payload.item_key }
		case CATEGORY_FLATLIST_SELECTED_CAT_ITEM:
			return { ...state, selected_cat_icon_name:action.payload.item_icon,selected_cat_index:action.payload.item_key }
		default:
			return state;
	}
};
