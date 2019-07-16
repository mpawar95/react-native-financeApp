import {
	HOME_ACCOUNT_FETCH_LIST_FAIL,
	HOME_ACCOUNT_FETCH_LIST_SUCCESS,
	VISIBLE_LIST,
	TODAY_DATE,
	YESTERDAY_DATE,
	INCOME_FETCH_LIST_SUCCESS,
	INCOME_FETCH_LIST_FAIL,
	FAVORITE_ITEM_ADDED_SUCCESS,
	FAVORITE_ITEM_ADDED_FAIL,
	DELETE_INCOME_DETAIL_SUCCESS,
	DELETE_INCOME_DETAIL_FAIL,
	UNFAVORITE_ITEM_FAIL,
	UNFAVORITE_ITEM_SUCCESS,
	HOME_SELECTED_MONEY_ICON,
	HOME_REFRESH_ITEM,
	DATE_RANGE_PICKER_DIALOG_VISIBLE,
	FLATLIST_ITEM_SELECTED,
	SELECTED_RANGE,
	ITEM_FLATLIST_SELECTED,
	HOME_UPDATE_PROPS,
	HOME_RECIEVE_PROPS
} from '../../Actions/HomeActions/types';

const INITIAL_STATE = {
	account_list: [],
	error: '',
	totalAmount: 0,
	account_list_count: 0,
	is_displaylist: false,
	date: "",
	is_today: false,
	is_yesterday: false,
	income_list: [],
	is_favorite: false,
	selected_money_icon: "",
	refreshing: false,
	dialogVisible: false,
	is_selected: false,
	selectedDate:"",
	data: [
		"Week",
		"Month",
		"Year",
	],
	selectedFlatListName: "",
	selectedFlatListIndex: 0,
	seatedPropsName: "",
	seatedPropsKey:0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HOME_RECIEVE_PROPS:
			return {...state, ...INITIAL_STATE}
		case HOME_SELECTED_MONEY_ICON:
			return { ...state, selected_money_icon: action.payload }
		case FLATLIST_ITEM_SELECTED:
			return { ...state, is_selected: action.payload }
		case ITEM_FLATLIST_SELECTED:
			return { ...state, selectedFlatListName: action.payload.item_name, selectedFlatListIndex: action.payload.item_index }
		case HOME_ACCOUNT_FETCH_LIST_SUCCESS:
			return { ...state, account_list: action.payload.items, account_list_count: action.payload.items.length ,totalAmount: action.payload.total}
		case HOME_ACCOUNT_FETCH_LIST_FAIL:
			return { ...state, error: action.payload }
		case VISIBLE_LIST:
			return { ...state, is_displaylist: action.payload }
		case TODAY_DATE:
			return { ...state, date: action.payload, is_today: true, is_yesterday: false }
		case YESTERDAY_DATE:
			return { ...state, date: action.payload, is_today: false, is_yesterday: true }
		case INCOME_FETCH_LIST_SUCCESS:
			return {
				...state,
				income_list: action.payload,
			}
		case INCOME_FETCH_LIST_FAIL:
			return {
				...state,
				income_list: action.payload,
				refreshing: false
			}
		case FAVORITE_ITEM_ADDED_SUCCESS:
			return { ...state, is_favorite: true }
		case FAVORITE_ITEM_ADDED_FAIL:
			return { ...state, ...INITIAL_STATE }
		case DELETE_INCOME_DETAIL_SUCCESS:
			return { ...state }
		case DELETE_INCOME_DETAIL_FAIL:
			return { ...state, error: "Something Went Wrong" }
		case UNFAVORITE_ITEM_SUCCESS:
			return { ...state }
		case UNFAVORITE_ITEM_FAIL:
			return { ...state, error: "Something Went Wrong" }
		case HOME_REFRESH_ITEM:
			return { ...state, }
		case DATE_RANGE_PICKER_DIALOG_VISIBLE:
			return { ...state, dialogVisible: action.payload }
		case SELECTED_RANGE:
			return {...state , selectedDate :action.payload }
		case HOME_UPDATE_PROPS:
			return { ...state, seatedPropsName: action.payload.item_name, seatedPropsKey: action.payload.item_key }
		default:
			return state;
	}
};
