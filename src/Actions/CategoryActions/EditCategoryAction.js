import {
    EDIT_CATEGORY_NAME_CHANGED,
    
    EDIT_CATEGORY_MODAL_VISIBLE,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    UPDATE_ITEM_FAIL,
    UPDATE_ITEM_SUCCESS,
    EDIT_CATEGORY_SELECTED_ITEMS,
    EDIT_CATEGORY_SET_ITEM,
    EDIT_CATEGORY_HANDLE_BACK_PRESS
} from '../CategoryActions/types';
import { db } from '../../utils/firebaseConfig';


export const handleBackPress=()=>{
    return {type:EDIT_CATEGORY_HANDLE_BACK_PRESS}
}

export const editCategoryNameChanged = (text) => {
    return { type: EDIT_CATEGORY_NAME_CHANGED, payload: text }
}
export const editCategoryModalVisible=(value)=>{
    return {type: EDIT_CATEGORY_MODAL_VISIBLE, payload: value}
}
export const onPressEditCategoryItems=(item_icon,item_key)=>{
    const payload={
        item_icon:item_icon,
        item_key:item_key
    }
    return { type : EDIT_CATEGORY_SELECTED_ITEMS, payload:payload}
}
export const setItemEditCategory=(item_selected_Icon)=>{
    return {type : EDIT_CATEGORY_SET_ITEM , payload:item_selected_Icon}
}


export const editCategoryLoad=(id)=>{
    return dispatch => {
        db.ref('/Category/').child(id).once('value', function (snapshot) {
            let response = snapshot.val();
            const payload = {
                oldCategoryName: response.category_name,
                oldCategoryIcon: response.selected_Icon
            }
            if (!response) {
                dispatch({ type: GET_CATEGORY_FAIL, payload: "Something Wrong" })
            } else {
                dispatch({ type: GET_CATEGORY_SUCCESS, payload: payload })
            }
        })
    }
}

export const deleteCategory=(id,navigation)=>{
    return dispatch=>{
        db.ref('/Category/').child(id).remove()
        navigation.pop()
    }
}


export const updateCategory = (id, categoryName, selected_cat_icon_name, navigation) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            db.ref('/Category/').child(id).update({
                category_name: categoryName,
                selected_Icon: selected_cat_icon_name
            }).then((success) => {
                updateItemSuccess(dispatch, navigation, resolve, reject)
            }).catch(error => {
                updateItemFail(dispatch, navigation, resolve, reject)
            })
        })

    }
}

export const updateItemSuccess=(dispatch,navigation,resolve, reject)=>{
    resolve(dispatch( {type: UPDATE_ITEM_SUCCESS }))
    try{
        navigation.navigator.pop()
    }
    catch(error){
        reject(dispatch( {type: UPDATE_ITEM_FAIL }))
    }
    
}
export const updateItemFail=(dispatch,navigation,resolve, reject)=>{
    reject(dispatch( {type: UPDATE_ITEM_FAIL }))
}
