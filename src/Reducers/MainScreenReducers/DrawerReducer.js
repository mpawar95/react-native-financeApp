import {
	DRAWER_ITEM_KEY,
	UPDATE_PROPS,
	DRAWER_COMPONENT_LOAD,
} from '../../Actions/HomeActions/types';

const INITIAL_STATE = {
	data:[
		{ name: "Home", key: 0, icon: "home" },
		{ name: "Acconts", key: 1, icon: "folder-open" },
		{ name: "Categories", key: 2, icon: "tablet" },
		{ name: "Trends", key: 3, icon: "trending-up" },
		{ name: "Favorites", key: 4, icon: "star" },
		{ name: "Settings", key: 5, icon: "settings" },
	],
	selected_index:0,
	selected_name:"",
	seatedPropsName:"Home",
	seatedPropsKey:0
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DRAWER_COMPONENT_LOAD:
			return { 
				...state, 
				selected_index: action.payload.index 
			}
		case DRAWER_ITEM_KEY:
			return { 
				...state, 
				selected_index: action.payload.item_key, 
				selected_name: action.payload.item_name 
			}
		case UPDATE_PROPS:
			return { 
				...state, 
				seatedPropsName: action.payload.item_name, 
				seatedPropsKey: action.payload.item_key 
			}
		default:
			return state;
	}
};
