import moment from 'moment';
import {
	TRANSFER_ACCOUNT_FETCH_LIST_SUCCESS,
	TRANSFER_ACCOUNT_FETCH_LIST_FAIL,
	TRANSFER_VISIBLE_LIST,
	TRANSFER_AMOUNT_CHANGE,
	TRANSFER_AMOUNT_CHANGE_INVALID,
	TRANSFER_DATE_CHANGED,
	TRANSFER_NOTES_CHANGE,
	TRANSFER_VISIBLE_LIST_2,
	TRANSFER_IS_SELECTED_1,
	TRANSFER_IS_SELECTED_2,
	TANSFER_ADD_INCOME_DETAIL_SUCCESS,
	TANSFER_ADD_INCOME_DETAIL_FAIL,
	MONEY_TRANSFER_SELECTED_ITEM_1,
	MONEY_TRANSFER_SELECTED_ITEM_2,
	MONEY_TRANSFER_SCREEN_LOAD
} from '../../Actions/AccountActions/types'

const INITIAL_STATE = {
	account_Data: [],
	error: "",
	is_visible_flatlist: false,
	is_visible_flatlist2: false,
	is_balance_valid: true,
	amount: '',
	amount_valid:false,
	notesValue:"",
	todayDate:moment().format('MMMM DD') + ", " + moment().format('YYYY'),
	delete_item2:"",
	is_selected1:false,
	is_selected2:false,
	selected_index: 0,
	selected_name: "Account",
	selected_icon_name: "",
	selected_icon_color: "",
	item_index:0,
	selected_index2: 0,
	selected_name2: "Account",
	selected_icon_name2: "",
	selected_icon_color2: "",
	selected_key2: "",
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MONEY_TRANSFER_SCREEN_LOAD:
			return {...state, ...INITIAL_STATE}
		case TRANSFER_ACCOUNT_FETCH_LIST_SUCCESS:
			return { ...state, account_Data: action.payload }
		case TRANSFER_ACCOUNT_FETCH_LIST_FAIL:
			return { ...state, ...INITIAL_STATE , error: action.payload }
		case TRANSFER_VISIBLE_LIST:
			return { ...state, is_visible_flatlist: action.payload }
		case MONEY_TRANSFER_SELECTED_ITEM_1:
			return {
				...state, 
				selected_name: action.payload.item_acc_name,
				selected_icon_name: action.payload.item_icon,
				selected_icon_color: action.payload.item_selected_color,
				selected_index: action.payload.item_key,
				item_index:action.payload.item_index,
				selected_key:action.payload.item_id,
			}
		case MONEY_TRANSFER_SELECTED_ITEM_2:
			return {
				...state,
				selected_name2: action.payload.item_acc_name,
				selected_icon_name2: action.payload.item_icon,
				selected_icon_color2: action.payload.item_selected_color,
				selected_index2: action.payload.item_key,
				selected_key2: action.payload.item_id,
			}
		case TRANSFER_VISIBLE_LIST_2:
			return { ...state, is_visible_flatlist2: action.payload }
		case TRANSFER_AMOUNT_CHANGE:
			return { ...state, amount: action.payload,amount_valid:true }
		case TRANSFER_AMOUNT_CHANGE_INVALID:
			return { ...state, amount:"",amount_valid:false }
		case TRANSFER_DATE_CHANGED:
			return { ...state, todayDate:action.payload }
		case TRANSFER_NOTES_CHANGE:
			return { ...state, notesValue:action.payload }
		case TRANSFER_IS_SELECTED_1:
			return { ...state, is_selected1:action.payload }
		case TRANSFER_IS_SELECTED_2:
			return { ...state, is_selected2:action.payload }
		case TANSFER_ADD_INCOME_DETAIL_SUCCESS:
			return { ...state, }
		case TANSFER_ADD_INCOME_DETAIL_FAIL:
			return { ...state, ...INITIAL_STATE , error: action.payload }
		default:
			return state;
	}
};
