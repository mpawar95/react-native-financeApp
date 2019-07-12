import { AsyncStorage } from 'react-native';
import { 
    EXPENCE_SELECTED_MONEY_ICON
} from '../../Actions/HomeActions/types';
import { Expressions } from '../../utils/expression';


export const ExpenceScreenLoad=()=>{
    return dispatch=>{
        AsyncStorage.getItem("selected_money_icon").then(icon=>{
            dispatch({ type : EXPENCE_SELECTED_MONEY_ICON, payload:icon })
        })
    }
}
export const updateExpenceMoneyIcon=(dispatch,icon)=>{
    dispatch({ type: EXPENCE_SELECTED_MONEY_ICON, payload:icon})
}