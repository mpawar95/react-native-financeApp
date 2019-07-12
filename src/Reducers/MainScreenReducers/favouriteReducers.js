
import {
	TODAY_FAV_DATE,
	YESTERDAY_FAV_DATE,
	VISIBLE_FAV_LIST,
	INCOME_FAV_FETCH_LIST_SUCCESS,
	INCOME_FAV_FETCH_LIST_FAIL,
	DELETE_FAV_ITEM_SUCCESS,
	DELETE_FAV_ITEM_FAIL,
	FAVOURITE_SELECTED_MONEY_ICON,
	FAVOURITE_DATE_RANGE_PICKER_DIALOG_VISIBLE,
	FAVOURITE_FLATLIST_ITEM_SELECTED,
	ITEM_FLATLIST_SELECTED,
	SELECTED_RANGE,
	FAVOURITE_RECEIVE_PROPS,
	FAVOURITE_UPDATE_PROPS
} from '../../Actions/FavouriteActions/types'

const INITIAL_STATE = {
	is_displaylist: false,
	is_yesterday: "",
	is_today: "",
	fav_income_list: [],
	error: "",
	date: "",
	selected_money_icon: "",
	refreshing: false,
	dialogVisible: false,
	is_selected: false,
	// data: [
	// 	{ select: "Week", key: 0 },
	// 	{ select: "Month", key: 1 },
	// 	{ select: "Year", key: 2 },
	// ],
	data: [
		"Week",
		"Month",
		"Year",
	],
	selectedFlatListName: "",
	selectedFlatListIndex: 0,
	selectedDate:"",
	seatedPropsName:"",
	seatedPropsKey:0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FAVOURITE_RECEIVE_PROPS:
			return {...state, ...INITIAL_STATE}
		case FAVOURITE_UPDATE_PROPS:
			return { ...state, seatedPropsName: action.payload.item_name, seatedPropsKey: action.payload.item_key }
		case FAVOURITE_SELECTED_MONEY_ICON:
			return { ...state, selected_money_icon: action.payload }
		case TODAY_FAV_DATE:
			return { ...state, date: action.payload, is_today: true, is_yesterday: false }
		case YESTERDAY_FAV_DATE:
			return { ...state, date: action.payload, is_today: false, is_yesterday: true }
		case VISIBLE_FAV_LIST:
			return { ...state, is_displaylist: action.payload }
		case FAVOURITE_FLATLIST_ITEM_SELECTED:
			return { ...state, is_selected: action.payload }
		case ITEM_FLATLIST_SELECTED:
			return { ...state, selectedFlatListName: action.payload.item_name, selectedFlatListIndex: action.payload.item_index }
		case INCOME_FAV_FETCH_LIST_SUCCESS:
			return { ...state, fav_income_list: action.payload }
		case INCOME_FAV_FETCH_LIST_FAIL:
			return { ...state, fav_income_list: action.payload, refreshing: false }
		case DELETE_FAV_ITEM_SUCCESS:
			return { ...state }
		case DELETE_FAV_ITEM_FAIL:
			return { ...state, error: "Something Went Wrong" }
		case FAVOURITE_DATE_RANGE_PICKER_DIALOG_VISIBLE:
			return { ...state, dialogVisible: action.payload }
		case SELECTED_RANGE:
			return {...state , selectedDate :action.payload }
		default:
			return state;
	}
};
