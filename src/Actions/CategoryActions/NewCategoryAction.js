import {
    CATEGORY_NAME_CHANGED,
    CATEGORY_FLATLIST_VISIBLE,
    CATEGORY_MODAL_VISIBLE,
    ADD_NEW_CATEGORY_FAIL,
    ADD_NEW_CATEGORY_SUCCESS,
    CATEGORY_SELECTED_FLATLIST_ITEM,
    CATEGORY_FLATLIST_SELECTED_ITEM_NAME,
    CATEGORY_FLATLIST_SELECTED_CAT_ITEM,
    NEW_CATEGORY_SCREEN_LOAD
} from '../CategoryActions/types';
import { db } from '../../utils/firebaseConfig';

export const newCategoryScreenLoad=()=>{
    return { type : NEW_CATEGORY_SCREEN_LOAD }
}


export const categoryNameChanged = (text) => {
    return { type: CATEGORY_NAME_CHANGED, payload: text }
}
export const newCategoryFlatListVisibility=(value)=>{
    return {type: CATEGORY_FLATLIST_VISIBLE, payload: value}
}
export const newCategoryModalVisible=(value)=>{
    return {type: CATEGORY_MODAL_VISIBLE, payload: value}
}
export const onPressCategorySelectedItem=(value)=>{
    return {type:CATEGORY_SELECTED_FLATLIST_ITEM, payload:value}
}
export const onPressCategorySelectedItemName=(item_name,item_key)=>{
    const payload={
        item_name:item_name,
        item_key:item_key
    }
    return { type : CATEGORY_FLATLIST_SELECTED_ITEM_NAME, payload:payload}
}
export const onPressCatSelectedItemName=(item_icon,item_key)=>{
    const payload={
        item_icon:item_icon,
        item_key:item_key
    }
    return { type : CATEGORY_FLATLIST_SELECTED_CAT_ITEM, payload:payload}
}
export const addNewCategory = (cat_name, icon, cat_type_name, navigator) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            db.ref('/Category/').push({
                category_name: cat_name,
                selected_Icon: icon,
                category_type: cat_type_name,
            }).then((response) => {
                createCategorySuccess(dispatch, navigator, resolve, reject)
            }).catch((error) => {
                rejectdispatch({ type: ADD_NEW_CATEGORY_FAIL, payload: error })
            })
        })
    }
}

export const createCategorySuccess=(dispatch,navigator,resolve, reject)=>{
    resolve(dispatch({ type: ADD_NEW_CATEGORY_SUCCESS}))
    navigator.navigator.navigate("Categories")
}