import { AsyncStorage } from 'react-native';
import {
    EDIT_ACCOUNT_INPUT_CHANGE,
    GET_ACCOUNT_NAME_SUCCESS,
    GET_ACCOUNT_NAME_FAIL,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAIL,
    EDIT_ACCOUNT_COLOR_PICKER_VISIBLE,
    EDIT_ACCOUNT_ITEM_SELECTED
} from '../../Actions/AccountActions/types';
import { db } from '../../utils/firebaseConfig';

export const editAccountInputChange=(text)=>{
    return { type: EDIT_ACCOUNT_INPUT_CHANGE, payload: text }
}
export const onPressColorPickerVisible=(value)=>{
    return { type :EDIT_ACCOUNT_COLOR_PICKER_VISIBLE ,payload:value}
}
export const onPressEditAccountSelectedItem=(item_key,item_color)=>{
    const payload={
        item_key:item_key,
        item_color:item_color
    }
    return { type : EDIT_ACCOUNT_ITEM_SELECTED ,payload:payload}
}
export const getAccount=(id)=>{
    return dispatch=>{
        db.ref('/newAccount/').child(id).once('value', function (snapshot) {
            let response = snapshot.val();
            let oldAccountName = response.account_name;
            let oldpickColor = response.selected_color_icon;
            let oldindexColor =response.selected_color_index;
            if (!response) {
                dispatch({ type: GET_ACCOUNT_NAME_FAIL, payload: "Something Wrong" })
            } else {
                dispatch({ 
                    type: GET_ACCOUNT_NAME_SUCCESS, 
                    account_name: oldAccountName, 
                    account_pick_color:oldpickColor, 
                    account_color_index: oldindexColor
                })
            }
        })
    }
}

export const updateAccount=(id,pick_color,accountInput,navigation)=>{
    return dispatch=>{    
    db.ref('/newAccount/').child(id).update({
            account_name:accountInput,
            selected_color_icon:pick_color
        }).then((success)=>{
            updateSuccess(dispatch,navigation)
            
        }).catch(error=>{
            updateFail(dispatch,navigation)
            return {type: UPDATE_ITEM_FAIL }
        })
    }
}

updateSuccess=(dispatch,navigation)=>{
    dispatch( {type: UPDATE_ITEM_SUCCESS })
    try{
        navigation.pop()
    }
    catch(error){

    }
    
}
updateFail=(dispatch,navigation)=>{
    dispatch( {type: UPDATE_ITEM_FAIL })
}


export const deleteAccount=(id,navigation)=>{
    return dispatch=>{
        db.ref('/newAccount/').child(id).remove()    
        navigation.pop()   
    }
}
export const deleteSuccess=(dispatch,navigation)=>{
    dispatch({ type: DELETE_ACCOUNT_SUCCESS })
    navigation.pop()
}

export const deleteFail=(dispatch,navigation)=>{
    dispatch({ type: DELETE_ACCOUNT_FAIL })
}

