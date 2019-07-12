import { AsyncStorage } from 'react-native';
import {
    ACCOUNT_FETCH_LIST_FAIL,
    ACCOUNT_FETCH_LIST_SUCCESS,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_SELECTED_MONEY_ICON,
    ACCOUNT_UPDATE_PROPS,
    ACCOUNT_RECEIVE_PROPS
} from '../../Actions/AccountActions/types';
import { db } from '../../utils/firebaseConfig';

export const updateAccountProps=(dispatch,payload)=>{
    dispatch({ type :ACCOUNT_UPDATE_PROPS,payload:payload})
}
export const receivePropsAccountLoad=()=>{
    return { type: ACCOUNT_RECEIVE_PROPS }
}
export const accountListFetch = () => {
    return dispatch => {
        var items = [];
        var total=0
        db.ref('/newAccount/').once('value', function (snapshot) {
            snapshot.forEach(item => {
                let response = item.val();
                total =  parseInt(response.initial_balance) + parseInt(total);
                return total
            })
            
            if (snapshot.val()) {
                snapshot.forEach(child => {
                    items.push({
                        id: child.key,
                        account_name: child.val().account_name,
                        initial_balance: child.val().initial_balance,
                        selected_color_icon: child.val().selected_color_icon,
                        selected_color_index:child.val().selected_color_index
                    })
                    return items
                })

            }
            const payload={
                items:items,
                total:total
            }
            if (items != null) {
                dispatch({ type: ACCOUNT_FETCH_LIST_SUCCESS, payload: payload })
            } else {
                dispatch({ type: ACCOUNT_FETCH_LIST_FAIL, payload: "Something Wrong" })
            }
        });
    }
}


export const accountdeletesuccess=(dispatch,id)=>{
    dispatch({ type : ACCOUNT_DELETE_SUCCESS, payload:id })
}

export const accountScreenLoad=()=>{
    return dispatch=>{
        AsyncStorage.getItem("selected_money_icon").then(icon=>{
            dispatch({ type : ACCOUNT_SELECTED_MONEY_ICON, payload:icon })
        })
    }
}
export const updateAccountMoneyIcon=(dispatch,icon)=>{
    dispatch({ type: ACCOUNT_SELECTED_MONEY_ICON, payload:icon})
}