import moment from "moment";
import {
	FLATLIST_VISIBILITY,
	INCOME_DETAIL_PAGE_LOAD,
	NOTES_INPUT_CHANGE,
	IS_SELECTED,
	CATEGORY_MODAL_VISIBLE,
	CATEGORY_IS_SELECTED,
	DATE_CHANGED,
	ADD_INCOME_DETAIL_FAIL,
	ADD_INCOME_DETAIL_SUCCESS,
	GET_ACCOUNT_LIST_SUCCESS,
	GET_ACCOUNT_LIST_FAIL,
	UPDATE_INCOME_DETAIL_SUCCESS,
	INCOME_DETAIL_SELECTED_MONEY_ICON,
	INCOME_DETAIL_SCREEN_LOAD,
	INCOME_DETAIL_SELECTED_ACCOUNT_ITEMS,
	INCOME_DETAIL_SELECTED_CATEGORY_ITEMS,
	INCOME_DETAIL_SET_ITEMS
} from '../../Actions/HomeActions/types';
const INITIAL_STATE = {
	is_visible_flatlist: false,
	is_selected: false,
	is_category_selected: false,
	dialogVisible: false,
	selected_index: "",
	selected_name: "Account",
	selected_icon_name:"",
	selected_icon_color: "#000000",
	selected_key:"",
	todayDate: moment().format('MMMM DD') + ", " + moment().format('YYYY'),
	account_Data: [],
	category_Data: [
		{ cat_name: "Deposite", key: 0, icon: "home" },
		{ cat_name: "Saving", key: 1, icon: "home" },
		{ cat_name: "Salary", key: 2, icon: "home" },
	],
	notesValue: "",
	selected_money_icon:"",
	selected_cat_name: "Category",
	selected_cat_index: 0,
	selected_cat_icon_name: "",
	
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case INCOME_DETAIL_PAGE_LOAD:
			return { ...state, ...INITIAL_STATE }
		case INCOME_DETAIL_SET_ITEMS:
			return {
				...state,
				selected_icon_color:action.payload.item_icon_color,
				selected_name:action.payload.item_accountName,
				selected_cat_name:action.payload.item_categoryName,
				selected_cat_icon_name:action.payload.item_cat_icon,
				is_selected:true,
				is_category_selected:true
			}
		case INCOME_DETAIL_SELECTED_MONEY_ICON:
			return {...state, selected_money_icon:action.payload}
		case NOTES_INPUT_CHANGE:
			return { ...state, notesValue: action.payload }
		case FLATLIST_VISIBILITY:
			return { ...state, is_visible_flatlist: action.payload }
		case INCOME_DETAIL_SELECTED_ACCOUNT_ITEMS:
			return {
				...state,
				selected_name:action.payload.item_account_name,
				selected_icon_name:action.payload.item_icon,
				selected_icon_color:action.payload.item_selected_color_icon,
				selected_index:action.payload.item_key,
				selected_key:action.payload.item_id,
				
			}
		case INCOME_DETAIL_SELECTED_CATEGORY_ITEMS:
			return {
				...state,
				selected_cat_name:action.payload.item_cat_name,
				selected_cat_index:action.payload.item_cat_id,
				selected_cat_icon_name:action.payload.item_cat_icon,
			}
		case IS_SELECTED:
			return { ...state, is_selected: action.payload }
		case CATEGORY_MODAL_VISIBLE:
			return { ...state, dialogVisible: action.payload }
		case CATEGORY_IS_SELECTED:
			return { ...state, is_category_selected: action.payload }
		case DATE_CHANGED:
			return { ...state, todayDate: action.payload }
		case ADD_INCOME_DETAIL_SUCCESS:
			return { ...state, ...INITIAL_STATE }
		case ADD_INCOME_DETAIL_FAIL:
			return { ...state, ...INITIAL_STATE }
		case GET_ACCOUNT_LIST_SUCCESS:
			return { ...state, account_Data: action.payload }
		case GET_ACCOUNT_LIST_FAIL:
			return { ...state, ...INITIAL_STATE }
		case UPDATE_INCOME_DETAIL_SUCCESS:
			return { ...state, }
		default:
			return { ...state }
	}
};
