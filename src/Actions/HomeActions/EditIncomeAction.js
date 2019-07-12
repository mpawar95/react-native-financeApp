

import { AsyncStorage } from 'react-native';
import {
    EDIT_ACCOUNT_SELECTED_MONEY_ICON
} from '../../Actions/AccountActions/types';
import { db } from '../../utils/firebaseConfig';

export const EditIncomeScreenLoad=()=>{
    return dispatch=>{
        AsyncStorage.getItem("selected_money_icon").then(icon=>{
            dispatch({ type : EDIT_ACCOUNT_SELECTED_MONEY_ICON, payload:icon })
        })
    }
}
export const updateEditDetailMoneyIcon=(dispatch,icon)=>{
    dispatch({ type: EDIT_ACCOUNT_SELECTED_MONEY_ICON, payload:icon})
}