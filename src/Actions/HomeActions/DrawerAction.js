
import {
    DRAWER_ITEM_KEY,
    UPDATE_PROPS,
    DRAWER_COMPONENT_LOAD,
} from './types'

import { 
    homeUpdateProps,
} from '../HomeActions/HomeAction'

import { 
    updateAccountProps,
} from '../AccountActions/AccountAction'
import { 
    updateCategoryProps,
} from '../CategoryActions/CategoryAction'
import { 
    favouriteUpdateProps,
} from '../FavouriteActions/favouriteAction'
import { 
    updateSettingProps
} from '../HomeActions/SettingAction'


export const onPressDrawerItem=(item_key,item_name)=>{
    const payload={
        item_name:item_name,
        item_key:item_key
    }
    return { type : DRAWER_ITEM_KEY ,payload:payload}
}
export const updateProps=(item_name,item_key)=>{
    return dispatch=>{
        const payload={
            item_name:item_name,
            item_key:item_key
        }
        homeUpdateProps(dispatch,payload)
        updateAccountProps(dispatch,payload)
        updateCategoryProps(dispatch,payload)
        favouriteUpdateProps(dispatch,payload)
        updateSettingProps(dispatch,payload)
        dispatch({type : UPDATE_PROPS , payload:payload})
    }
    
}
export const drawerComponentLoad=(dispatch,index)=>{
    payload={
        index:index
    }
    dispatch ({ type : DRAWER_COMPONENT_LOAD, payload:payload })
}