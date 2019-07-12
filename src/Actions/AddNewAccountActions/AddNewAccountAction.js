import { AsyncStorage } from 'react-native';
import moment from "moment";
import {
    ACCOUNT_INPUT_CHANGE,
    BALANCE_INPUT_CHANGE,
    CREATE_NEW_ACCOUNT_SUCCESS,
    CREATE_NEW_ACCOUNT_FAIL,
    BALANCE_INPUT_INVALID,
    ADD_NEWACCOUNT_ITEM_SELECTED,
    ADD_NEWACCOUNT_COLOR_SELECTED,
    ADD_NEW_ACCOUNT_SCREEN_LOAD
} from '../../Actions/AddNewAccountActions/types';
import { Expressions } from '../../utils/expression';
import { db } from '../../utils/firebaseConfig';

export const onPressNewAccountSelectedItem=(item_key,item_color)=>{
    const payload={
        item_key:item_key,
        item_color:item_color
    }
    return { type: ADD_NEWACCOUNT_ITEM_SELECTED, payload: payload }
}
export const addNewAccountScreenLoad=()=>{
    return { type : ADD_NEW_ACCOUNT_SCREEN_LOAD }
}
export const onColorIconPress=(value)=>{
    return {type: ADD_NEWACCOUNT_COLOR_SELECTED ,payload : value}
}

export const onAccountInputChange = (text) => {
    return { type: ACCOUNT_INPUT_CHANGE, payload: text }
}

export const onBalanceInputChange = (text) => {
    var is_valid;
    if (Expressions.NUMERIC.test(text)) {
        is_valid = false
        return { type: BALANCE_INPUT_CHANGE, payload: text }
    }
    else{
        return { type: BALANCE_INPUT_INVALID }
    }
}


export const addNewAccount = (acc_name, init_bal, selected_color, selected_index,navigator) => {
    return dispatch => {
        let data = [
            {
                acc_name: acc_name,
                init_bal: init_bal,
                selected_color: selected_color,
            }
        ]
        db.ref('/newAccount').push({
            account_name: acc_name,
            initial_balance: init_bal,
            selected_color_icon: selected_color,
            selected_color_index:selected_index,
            time: moment().format('hh:mm:ss a'),
        }).then((response) => {
            createAccountSuccess(dispatch, data, navigator)
        }).catch((error) => {
            dispatch({ type: CREATE_NEW_ACCOUNT_FAIL ,payload: error })
        })
    }
}
createAccountSuccess=(dispatch,data,navigator)=>{
    dispatch({ type: CREATE_NEW_ACCOUNT_SUCCESS, payload: data })
    navigator.navigator.pop()
}
createAccountFail=()=>{
    dispatch({ type: CREATE_NEW_ACCOUNT_FAIL, payload: "Something Wrong" })
}