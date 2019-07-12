
import {
	SETTING_VISIBLE_LIST,
	MODAL_VISIBLE,
	SELECTED_MONEY_ICON,
	SETTING_RESET,
	SETTING_FLATLIST_ITEM_SELECT,
	SETTING_ITEM_SELECTED_ITEM,
	SETTING_REVEIVE_PROPS,
    SETTING_UPDATE_PROPS
} from '../../Actions/HomeActions/types'

const INITIAL_STATE = {
	is_displaylist: false,
	is_dialog_visible: false,
	is_reset_dialog_visible: false,
	data: [
        { select: "US Dollar", key: 0, icon:"$" },
        { select: "Euro", key: 1,icon:"E" },
        { select: "Hryvnia", key: 2,icon:"H" },
	],
	is_selected:false,
	selected_index: 0,
    selected_name: "US Dollar",
	selected_icon:"$",
	seatedPropsName:"",
	seatedPropsKey:0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SETTING_REVEIVE_PROPS:
			return {...state , ...INITIAL_STATE}
		case SETTING_VISIBLE_LIST:
			return { ...state, is_displaylist: action.payload }
		case SETTING_UPDATE_PROPS:
			return { ...state, seatedPropsName: action.payload.item_name, seatedPropsKey: action.payload.item_key }
		case SETTING_FLATLIST_ITEM_SELECT:
			return { ...state, is_selected: action.payload }
		case MODAL_VISIBLE:
			return { ...state, is_dialog_visible: action.payload }
		case SELECTED_MONEY_ICON:
			return { ...state, ...INITIAL_STATE }
		case SETTING_RESET:
			return { ...state, is_reset_dialog_visible: action.payload }
		case SETTING_ITEM_SELECTED_ITEM:
			return{ ...state,selected_name:action.payload.item_name, selected_index:action.payload.item_key, selected_icon:action.payload.item_icon}
		default:
			return state;
	}
};
