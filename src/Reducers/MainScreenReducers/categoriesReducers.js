
import {
	ADD_CATEGORY_FETCH_SUCCESS,
	ADD_CATEGORY_FETCH_FAIL,
	CATEGORY_UPDATE_PROPS,
    CATEGORY_RECEIVE_PROPS
} from '../../Actions/CategoryActions/types'
const INITIAL_STATE = {
	category_list:[],
	refreshing:false,
	seatedPropsName:"",
	seatedPropsKey:0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CATEGORY_RECEIVE_PROPS:
			return {...state, ...INITIAL_STATE}
		case CATEGORY_UPDATE_PROPS:
			return { ...state, seatedPropsName: action.payload.item_name, seatedPropsKey: action.payload.item_key }
		case ADD_CATEGORY_FETCH_SUCCESS:
			return {...state,category_list:action.payload}
		case ADD_CATEGORY_FETCH_FAIL:
			return {...state, refreshing:false}
		default:
			return state;
	}
};
