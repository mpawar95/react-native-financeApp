import {
	ACCOUNT_FETCH_LIST_FAIL,
	ACCOUNT_FETCH_LIST_SUCCESS,
	ACCOUNT_DELETE_SUCCESS,
	ACCOUNT_SELECTED_MONEY_ICON,
	ACCOUNT_UPDATE_PROPS,
	ACCOUNT_RECEIVE_PROPS
} from '../../Actions/AccountActions/types';

const INITIAL_STATE = {
	account_list: [],
	error: '',
	totalAmount: 0,
	selected_money_icon: "",
	account_list_count: 0,
	seatedPropsName: "",
	seatedPropsKey: 0,
	refreshing:false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACCOUNT_RECEIVE_PROPS:
			return { ...state, ...INITIAL_STATE }
		case ACCOUNT_UPDATE_PROPS:
			return { ...state, seatedPropsName: action.payload.item_name, seatedPropsKey: action.payload.item_key }
		case ACCOUNT_SELECTED_MONEY_ICON:
			return { ...state, selected_money_icon: action.payload }
		case ACCOUNT_FETCH_LIST_SUCCESS:
			const dummyData = { 
				id: "", 
				account_name: "plusIcon", 
				initial_balance: 0, 
				selected_color_icon: "", 
				selected_color_index: 0 
			}
			var array = [action.payload.items]
			array[0].push(dummyData)
			return {
				...state,
				account_list: action.payload.items,
				account_list_count: action.payload.items.length,
				totalAmount: action.payload.total
			}
		case ACCOUNT_FETCH_LIST_FAIL:
			return { ...state, error: action.payload }
		case ACCOUNT_DELETE_SUCCESS:
			const deleteAccount = state.account_list.map(item => {
				return item.id === action.payload
			})
			return { ...state, deleteAccount }
		default:
			return state;
	}
};
