

import {
	ACCOUNT_DETAIL_SELECTED_MONEY_ICON,
	ACCOUNT_DETAIL_FETCH_LIST_SUCCESS,
	ACCOUNT_DETAIL_FETCH_LIST_FAIL,
	ACCOUNT_DETAIL_VISIBLE_LIST,
	ACCOUNT_DETAIL_TODAY_DATE,
	ACCOUNT_DETAIL_YESTERDAY_DATE,
	ACCOUNT_DETAIL_INCOME_FETCH_LIST_SUCCESS,
	ACCOUNT_DETAIL_INCOME_FETCH_LIST_FAIL,
	DELETE_ACCOUNT_DETAIL_SUCCESS,
	DELETE_ACCOUNT_DETAIL_FAIL,
	ACCOUNT_DETIAL_ITEM_UNFAVOURITE_SUCCESS,
	ACCOUNT_DETIAL_ITEM_UNFAVOURITE_FAIL,
	ACCOUN_SCREEN_DATE_RANGE_PICKER_VISIBLE,
	ACCOUNT_FLATLIST_ITEM_SELECTED,
	ACCOUNT_SELECTED_RANGE,
	ACCOUNT_ITEM_FLATLIST_SELECTED,
	SET_ACCOUNT_NAME,
	ACCOUNT_DETAIL_SET_DEFAULT_DATE
} from '../../Actions/HomeActions/types';
const INITIAL_STATE = {
	selected_money_icon: "",
	accont_list: [],
	income_list: [],
	error: "",
	is_displaylist: false,
	date: "",
	is_today: false,
	is_yesterday: false,
	dialogVisible: false,
	is_selected: false,
	selectedFlatListName: "",
	selectedFlatListIndex: 0,
	data: [
		"Week",
		"Month",
		"Year",
	],
	selectedDate: "",
	selectedItem:"",
	from_date:"",
    to_date:""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACCOUNT_DETAIL_SELECTED_MONEY_ICON:
			return { ...state, selected_money_icon: action.payload }
		case ACCOUNT_DETAIL_SET_DEFAULT_DATE:
			return {
				...state,
				from_date:action.payload.from_date,
				to_date:action.payload.to_date
			}
		case ACCOUNT_DETAIL_FETCH_LIST_SUCCESS:
			return { ...state, accont_list: action.payload }
		case ACCOUNT_DETAIL_FETCH_LIST_FAIL:
			return { ...state, error: action.payload }
		case ACCOUNT_ITEM_FLATLIST_SELECTED:
			return { ...state, selectedFlatListName: action.payload.item_name, selectedFlatListIndex: action.payload.item_index }
		case ACCOUNT_DETAIL_VISIBLE_LIST:
			return { ...state, is_displaylist: action.payload }
		case ACCOUNT_FLATLIST_ITEM_SELECTED:
			return { ...state, is_selected: action.payload }
		case ACCOUNT_DETAIL_TODAY_DATE:
			return { ...state, date: action.payload, is_today: true, is_yesterday: false }
		case ACCOUNT_DETAIL_YESTERDAY_DATE:
			return { ...state, date: action.payload, is_today: false, is_yesterday: true }
		case ACCOUNT_DETAIL_INCOME_FETCH_LIST_SUCCESS:
			return { ...state, income_list: action.payload.incomeItems, selectedItem:action.payload.account_name }
		case ACCOUNT_DETAIL_INCOME_FETCH_LIST_FAIL:
			return { ...state, income_list: action.payload }
		case DELETE_ACCOUNT_DETAIL_SUCCESS:
			return { ...state }
		case DELETE_ACCOUNT_DETAIL_FAIL:
			return { ...state, error: "Something Went Wrong" }
		case ACCOUNT_DETIAL_ITEM_UNFAVOURITE_SUCCESS:
			return { ...state }
		case ACCOUNT_DETIAL_ITEM_UNFAVOURITE_FAIL:
			return { ...state, error: "Something Went Wrong" }
		case ACCOUN_SCREEN_DATE_RANGE_PICKER_VISIBLE:
			return { ...state, dialogVisible: action.payload }
		case ACCOUNT_SELECTED_RANGE:
			return { ...state, selectedDate: action.payload }
		case SET_ACCOUNT_NAME:
			return {...state, selectedItem:action.payload}
		default:
			return state;
	}
};
