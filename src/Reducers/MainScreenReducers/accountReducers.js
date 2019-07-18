import {
	ACCOUNT_FETCH_LIST_FAIL,
	ACCOUNT_FETCH_LIST_SUCCESS,
	ACCOUNT_DELETE_SUCCESS,
	ACCOUNT_SELECTED_MONEY_ICON,
	ACCOUNT_UPDATE_PROPS,
	ACCOUNT_RECEIVE_PROPS,
	ADD_LOCAL_DATA,
	UPDATE_TRANSFER_ITEM
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
		case ADD_LOCAL_DATA:
			const newfilter = state.account_list.filter(function(item,index){
				return item.id != ""
			})
			var addNew = newfilter.concat(action.payload)
			const newadd = { 
				id: "", 
				account_name: "plusIcon", 
				initial_balance: 0, 
				selected_color_icon: "", 
				selected_color_index: 0 
			}
			addNew.push(newadd)
			return {
				...state,
				account_list:addNew,
				totalAmount: parseInt(action.payload.totalAmount) + parseInt(action.payload.initial_balance)
			}
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
			var amountTotal
			var filtered = state.account_list.filter(function (item, index, arr) {
				if(item.id == action.payload.id){
					amountTotal = parseInt(action.payload.totalAmount) - parseInt(item.initial_balance)
					return item.id != action.payload.id
				}
				return item
			});
			return { ...state, account_list: filtered,totalAmount:amountTotal }
		case UPDATE_TRANSFER_ITEM:
			var updateItem = state.account_list.filter(function (item) {
				if (item.id == action.payload.from_id) {
					return item.initial_balance = parseInt(item.initial_balance) - parseInt(action.initial_balance)
				}
				if(item.id == action.payload.to_id){
					return item.initial_balance = parseInt(item.initial_balance) + parseInt(action.initial_balance)
				}
				return item
			})
			return {
				...state,
				account_list: updateItem
			}
		default:
			return state;
	}
};
