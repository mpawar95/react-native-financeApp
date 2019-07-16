
import {
	STATISTICS_FLATLIST_VISIBLITY,
	STATISTICS_TODAY_DATE,
	STATISTICS_YESTERDAY_DATE,
	INCOME_ACTIVE,
	EXPANCE_ACTIVE,
	GET_INFORMATION_SUCCESS,
	GET_INFORMATION_FAIL,
	STATISTICS_SELECTED_MONEY_ICON,
	STATISTICS_ACCOUNT_FETCH_LIST_FAIL,
	STATISTICS_FLATLIST_ITEM,
	STATISTICS_SELECTED_ITEM,
	STATISTICS_DATE_RANGE_PICKER,
	STATISTICS_SELECTED_RANGE,
	STATISTICS_CHANGE_INDEX,
	STATISTIC_SCREEN_LOAD
} from '../../Actions/HomeActions/types'
import { Color } from '../../utils/Colors';
const INITIAL_STATE = {
	date: "",
	is_today: false,
	is_yesterday: false,
	is_income: false,
	is_expence: false,
	income_list: [],
	account_balance:[0],
	icon_color:[Color.LIGHT_FONT_COLOR],
	incomeTotal:0,
	selected_money_icon:"",
	account_name:[],
	account_list:[],
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
	selected_index: "",
	selected_name: "",
	dialogVisible:false,
	selectedDate:"",
	selectedIndex:0,
	selectedFlatListName:""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STATISTIC_SCREEN_LOAD:
			return {...state, ...INITIAL_STATE}
		case STATISTICS_SELECTED_MONEY_ICON:
			return {...state, selected_money_icon:action.payload} 
		case STATISTICS_FLATLIST_VISIBLITY:
			return { ...state, is_flatList_visible: action.payload }
		case STATISTICS_CHANGE_INDEX:
			return {...state, selectedIndex:action.payload}
		case STATISTICS_FLATLIST_ITEM:
			return { ...state, is_selected: action.payload }
		case STATISTICS_SELECTED_ITEM:
			return { ...state, selectedFlatListName: action.payload.item_name, selected_index: action.payload.item_key }
		case STATISTICS_TODAY_DATE:
			return { ...state, date: action.payload, is_today: true, is_yesterday: false }
		case STATISTICS_YESTERDAY_DATE:
			return { ...state, date: action.payload, is_today: false, is_yesterday: true }
		case INCOME_ACTIVE:
			return { ...state, is_income: true, is_expence: false }
		case EXPANCE_ACTIVE:
			return { ...state, is_income: false, is_expence: true }
		case GET_INFORMATION_SUCCESS:
			return {
				...state,
				account_balance: action.payload.incomeBalArray,
				icon_color: action.payload.incomeColorArray,
				incomeTotal: action.payload.incommeTotal,
				account_name: action.payload.newIncomeArray
			}
		case GET_INFORMATION_FAIL:
			return {...state,
				account_balance: [0],
				icon_color: [Color.LIGHT_FONT_COLOR],
				incomeTotal: 0,
				account_name: null
			}
		case STATISTICS_ACCOUNT_FETCH_LIST_FAIL:
			return {...state, }
		case STATISTICS_DATE_RANGE_PICKER:
			return { ...state, dialogVisible: action.payload }
		case STATISTICS_SELECTED_RANGE:
			return { ...state, selectedDate: action.payload }
		default:
			return state;
	}
};
