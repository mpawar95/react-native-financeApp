import { AsyncStorage } from 'react-native';
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
import { db } from '../../utils/firebaseConfig';

export const updateAccountProps=(dispatch,payload)=>{
    dispatch({ type :ACCOUNT_UPDATE_PROPS,payload:payload})
}
export const receivePropsAccountLoad=()=>{
    return { type: ACCOUNT_RECEIVE_PROPS }
}
export const accountListFetch = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            var items = [];
            var total = 0
            
            db.ref('/newAccount/').once('value', function (snapshot) {
                snapshot.forEach(item => {
                    let response = item.val();
                    total = parseInt(response.initial_balance) + parseInt(total);
                    return total
                })
                if (snapshot.val()) {
                    snapshot.forEach(child => {
                        items.push({
                            id: child.key,
                            account_name: child.val().account_name,
                            initial_balance: child.val().initial_balance,
                            selected_color_icon: child.val().selected_color_icon,
                            selected_color_index: child.val().selected_color_index
                        })
                        return items
                    })

                }
                const payload = {
                    items: items,
                    total: total
                }
                if (items != null) {
                    resolve(dispatch({ type: ACCOUNT_FETCH_LIST_SUCCESS, payload: payload }))
                } else {
                    reject(dispatch({ type: ACCOUNT_FETCH_LIST_FAIL, payload: "Something Wrong" }))
                }
            });
        })
        
    }
}


export const accountdeletesuccess=(dispatch,id,balance,totalAmount)=>{
    const payload={
        id:id,
        balance:balance,
        totalAmount:totalAmount
    }
    dispatch({ type : ACCOUNT_DELETE_SUCCESS, payload:payload })
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
export const addlocalData=(dispatch,totalAmount)=>{
    db.ref('/newAccount/').limitToLast(1).once('child_added', function (snapshot) {
     
        const payload={
            id: snapshot.key,
            account_name: snapshot.val().account_name,
            initial_balance: snapshot.val().initial_balance,
            selected_color_icon: snapshot.val().selected_color_icon,
            selected_color_index: snapshot.val().selected_color_index,
            totalAmount:totalAmount
        }
        dispatch({ type: ADD_LOCAL_DATA, payload:payload})
    });
}
export const updateItemlocally = (dispatch, from_id, to_id,amount) => {
    db.ref("/newAccount/").once("child_changed", function (snapshot) {
        const payload = {
            from_id: from_id,
            to_id: to_id
        }
        dispatch({ type: UPDATE_TRANSFER_ITEM, payload: payload ,initial_balance :amount })
    })
}