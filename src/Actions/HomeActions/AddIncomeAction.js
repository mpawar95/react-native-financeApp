import { AsyncStorage } from 'react-native';


import { 

    CHANGE_INCOME_TEXT,
    INCOME_SELECTED_MONEY_ICON
} from '../../Actions/HomeActions/types';
import { Expressions } from '../../utils/expression';

export const changeText=(text)=>{
    return { type: CHANGE_INCOME_TEXT, payload: text }
}

export const IncomeScreenLoad=()=>{
    return dispatch=>{
        AsyncStorage.getItem("selected_money_icon").then(icon=>{
            dispatch({ type : INCOME_SELECTED_MONEY_ICON, payload:icon })
        })
    }
}
export const updateIncomeMoneyIcon=(dispatch,icon)=>{
    dispatch({ type: INCOME_SELECTED_MONEY_ICON, payload:icon})
}