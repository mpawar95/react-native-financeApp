import { AsyncStorage } from 'react-native';
import {
    SETTING_VISIBLE_LIST,
    MODAL_VISIBLE,
    SELECTED_MONEY_ICON,
    SETTING_RESET,
    SETTING_FLATLIST_ITEM_SELECT,
    SETTING_ITEM_SELECTED_ITEM,
    SETTING_REVEIVE_PROPS,
    SETTING_UPDATE_PROPS
} from '../../Actions/HomeActions/types';
import { updateHomeMoneyIcon } from '../HomeActions/HomeAction'
import {updateAccountMoneyIcon} from '../AccountActions/AccountAction'
import { updateFavouriteMoneyIcon } from '../FavouriteActions/favouriteAction'
import { updateIncomeMoneyIcon } from '../HomeActions/AddIncomeAction'
import { updateIncomeDetailMoneyIcon } from '../HomeActions/IncomeDetailAction'
import { updateExpenceMoneyIcon } from '../HomeActions/AddExpenceAction'
import { updateExpenceDetailMoneyIcon } from '../HomeActions/ExpenceDetailAction'
import { updateEditDetailMoneyIcon  } from '../HomeActions/EditIncomeAction'
import { updateStatisticsMoneyIcon } from '../HomeActions/StatisticsAction';
import { updateAccountDetailMoneyIcon } from '../HomeActions/AccountDetailAction'
import { drawerComponentLoad } from '../HomeActions/DrawerAction'
export const receiveSettingProps=()=>{
    return { type: SETTING_REVEIVE_PROPS }
}
export const updateSettingProps=(dispatch,payload)=>{
    dispatch({ 
        type: SETTING_UPDATE_PROPS,
        payload:payload
    })
}
export const settingVisibilityList = (value) => {
    return { type: SETTING_VISIBLE_LIST, payload: value }
}
export const resetModalvisibility = (value) => {
    return { type: SETTING_RESET, payload: value }
}

export const modalvisibility = (value) => {
    return { type: MODAL_VISIBLE, payload: value }
}

export const onPressItemSelected=(value)=>{
    return { type : SETTING_FLATLIST_ITEM_SELECT ,payload:value}
}
export const onPressSelectedItems=(item_name,item_key,item_icon)=>{
    const payload={
        item_name:item_name,
        item_key:item_key,
        item_icon:item_icon
    }
    return { type: SETTING_ITEM_SELECTED_ITEM, payload: payload }
}
export const selected_Money_App_Icon = (icon, navigation) => {
    return dispatch => {
        AsyncStorage.setItem("selected_money_icon", icon)
        updateHomeMoneyIcon(dispatch, icon)
        updateAccountMoneyIcon(dispatch, icon)
        updateFavouriteMoneyIcon(dispatch, icon)
        updateIncomeMoneyIcon(dispatch, icon)
        updateIncomeDetailMoneyIcon(dispatch, icon)
        updateExpenceMoneyIcon(dispatch, icon)
        updateExpenceDetailMoneyIcon(dispatch, icon)
        updateEditDetailMoneyIcon(dispatch, icon)
        updateStatisticsMoneyIcon(dispatch,icon)
        updateAccountDetailMoneyIcon(dispatch,icon)
        drawerComponentLoad(dispatch,0)
        
        dispatch({ type: SELECTED_MONEY_ICON })
        navigation.navigate("Home")
        
    }
}