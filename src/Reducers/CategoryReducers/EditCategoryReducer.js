
import {
	EDIT_CATEGORY_NAME_CHANGED,
	EDIT_CATEGORY_MODAL_VISIBLE,
	EDIT_CATEGORY_FAIL,
	EDIT_CATEGORY_SUCCESS,
	GET_CATEGORY_SUCCESS,
	GET_CATEGORY_FAIL,
	UPDATE_ITEM_FAIL,
    UPDATE_ITEM_SUCCESS
} from '../../Actions/CategoryActions/types';
const INITIAL_STATE = {
	dialogVisible: false,
	categoryName: "",
	category_icon: "",
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EDIT_CATEGORY_MODAL_VISIBLE: 
			return { ...state, dialogVisible: action.payload }
		case EDIT_CATEGORY_NAME_CHANGED:
			return { ...state, categoryName: action.payload }
		case GET_CATEGORY_SUCCESS:
			return { ...state, categoryName: action.payload.oldCategoryName, category_icon: action.payload.oldCategoryIcon }
		case GET_CATEGORY_FAIL:
			return { ...state, ...INITIAL_STATE }
		case UPDATE_ITEM_SUCCESS:
			return {...state, }
		case UPDATE_ITEM_FAIL:
			return {...state, ...INITIAL_STATE}
		default:
			return state;
	}
};
