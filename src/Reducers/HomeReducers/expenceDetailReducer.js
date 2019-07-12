import moment from "moment";

import {
	EXPENCE_FLATLIST_VISIBILITY,
	EXPENCE_IS_SELECTED,
	EXPENCE_GET_ACCOUNT_LIST_SUCCESS,
	EXPENCE_GET_ACCOUNT_LIST_FAIL,
	EXPENCE_CATEGORY_MODAL_VISIBLE,
	EXPENCE_CATEGORY_IS_SELECTED,
	EXPENCE_DATE_CHANGED,
	EXPENCE_NOTES_INPUT_CHANGE,
	EXPENCE_ADD_INCOME_DETAIL_FAIL,
	EXPENCE_ADD_INCOME_DETAIL_SUCCESS,
	EXPENCE_INCOME_DETAIL_FAIL,
	UPDATE_EXPANCE_DETAIL_SUCCESS,
	EXPENCE_DETAIL_SELECTED_MONEY_ICON,
	EXPENCE_DETAIL_SCREEN_LOAD,
	EXPENCE_DETAIL_SELECTED_ACCOUNT_ITEMS,
	EXPENCE_DETAIL_SELECTED_CATEGORY_ITEMS,
	EXPENCE_DETAIL_SET_ITEMS
} from '../../Actions/HomeActions/types'
const INITIAL_STATE = {
	is_visible_flatlist: false,
	is_selected: false,
	account_Data: [],
	dialogVisible: false,
	is_category_selected: false,
	selected_money_icon: "",
	todayDate: moment().format('MMMM DD') + ", " + moment().format('YYYY'),
	category_Data: [
		{ cat_name: "Taxi", key: 0, icon: "home" },
		{ cat_name: "Sport", key: 1, icon: "home" },
		{ cat_name: "Pets", key: 2, icon: "home" },
		{ cat_name: "Home", key: 3, icon: "home" },
		{ cat_name: "Health", key: 4, icon: "home" },
		{ cat_name: "Gifts", key: 5, icon: "home" },
		{ cat_name: "Food", key: 6, icon: "home" },
		{ cat_name: "Entertainment", key: 7, icon: "home" },
		{ cat_name: "Eating out", key: 8, icon: "home" },
		{ cat_name: "Comunication", key: 9, icon: "home" },
		{ cat_name: "Car", key: 10, icon: "home" },
		{ cat_name: "Bills", key: 11, icon: "home" },
	],
	selected_name: "Account",
	selected_icon_name: "",
	selected_icon_color: "",
	selected_index: 0,
	selected_key: "",
	selected_cat_name: "Category",
	selected_cat_index: 0,
	selected_cat_icon_name: ""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EXPENCE_DETAIL_SCREEN_LOAD:
			return { ...state, ...INITIAL_STATE }
		case EXPENCE_DETAIL_SET_ITEMS:
			return {
				...state,
				selected_icon_color: action.payload.item_icon_color,
				selected_name: action.payload.item_accountName,
				selected_cat_name: action.payload.item_categoryName,
				selected_cat_icon_name: action.payload.item_cat_icon,
				is_selected: true,
				is_category_selected: true
			}
		case EXPENCE_DETAIL_SELECTED_MONEY_ICON:
			return { ...state, selected_money_icon: action.payload }
		case EXPENCE_FLATLIST_VISIBILITY:
			return { ...state, is_visible_flatlist: action.payload }
		case EXPENCE_IS_SELECTED:
			return { ...state, is_selected: action.payload }
		case EXPENCE_GET_ACCOUNT_LIST_SUCCESS:
			return { ...state, account_Data: action.payload }
		case EXPENCE_GET_ACCOUNT_LIST_FAIL:
			return { ...state, ...INITIAL_STATE }
		case EXPENCE_DETAIL_SELECTED_ACCOUNT_ITEMS:
			return {
				...state,
				selected_name: action.payload.item_account_name,
				selected_icon_name: action.payload.item_icon,
				selected_icon_color: action.payload.item_selected_color_icon,
				selected_index: action.payload.item_key,
				selected_key: action.payload.item_id,
			}
		case EXPENCE_DETAIL_SELECTED_CATEGORY_ITEMS:
			return {
				...state,
				selected_cat_name: action.payload.item_cat_name,
				selected_cat_index: action.payload.item_cat_id,
				selected_cat_icon_name: action.payload.item_cat_icon,
			}

		case EXPENCE_CATEGORY_MODAL_VISIBLE:
			return { ...state, dialogVisible: action.payload }
		case EXPENCE_CATEGORY_IS_SELECTED:
			return { ...state, is_category_selected: action.payload }
		case EXPENCE_DATE_CHANGED:
			return { ...state, todayDate: action.payload }
		case EXPENCE_NOTES_INPUT_CHANGE:
			return { ...state, notesValue: action.payload }
		case EXPENCE_INCOME_DETAIL_FAIL:
			return { ...state, ...INITIAL_STATE }
		case EXPENCE_ADD_INCOME_DETAIL_SUCCESS:
			return { ...state, account_Data: action.payload }
		case EXPENCE_ADD_INCOME_DETAIL_FAIL:
			return { ...state, ...INITIAL_STATE }
		case UPDATE_EXPANCE_DETAIL_SUCCESS:
			return { ...state, }
		default:
			return state;
	}
};
