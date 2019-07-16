import { AsyncStorage } from 'react-native';
import moment from 'moment'
import {
    TODAY_FAV_DATE,
    YESTERDAY_FAV_DATE,
    VISIBLE_FAV_LIST,
    INCOME_FAV_FETCH_LIST_SUCCESS,
    INCOME_FAV_FETCH_LIST_FAIL,
    FAVOURITE_SELECTED_MONEY_ICON,
    FAVOURITE_DATE_RANGE_PICKER_DIALOG_VISIBLE,
    FAVOURITE_FLATLIST_ITEM_SELECTED,
    ITEM_FLATLIST_SELECTED,
    SELECTED_RANGE,
    FAVOURITE_RECEIVE_PROPS,
    FAVOURITE_UPDATE_PROPS
} from '../../Actions/FavouriteActions/types';
import { db } from '../../utils/firebaseConfig';

export const receivePropsFavouriteLoad=()=>{
    return { type: FAVOURITE_RECEIVE_PROPS }
}
export const favouriteUpdateProps=(dispatch,payload)=>{
    dispatch({ type : FAVOURITE_UPDATE_PROPS ,payload:payload})
}
export const getFavouriteDate = (prop) => {
    return dispatch => {
        if (prop.prop == "today") {
            var today = moment().format('DD.MM.YYYY')
            dispatch({ type: TODAY_FAV_DATE, payload: today })
        }
        else if (prop.prop == "yesterday") {
            var yesterday = moment().subtract(1, 'days').calendar('DD.MM.YYYY');
            dispatch({ type: YESTERDAY_FAV_DATE, payload: yesterday.toString() })
        }

    }
}

export const visibilityFavList = (value) => {
    return { type: VISIBLE_FAV_LIST, payload: value }
}
export const deleteFavouriteItem = (id) => {
    return dispatch => {
        db.ref('/addNewIncome/').child(id).update({
            is_favourite: false,
        })
    }
}
export const onPressFavouriteFlatListItem=(value)=>{
    return { type : FAVOURITE_FLATLIST_ITEM_SELECTED ,payload:value }
}
export const onPressFavouriteSeletedItem=(item_name,item_key)=>{
    const payload={
        item_name:item_name,
        item_index:item_key
    }
    return { type : ITEM_FLATLIST_SELECTED , payload:payload}
}
export const selectedFavouriteRange=(range)=>{
    return { type : SELECTED_RANGE, payload:range}
}
export const getFavIncome = (from_date, to_date) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            db.ref('/addNewIncome/').orderByChild("createdOnDate").startAt(from_date).endAt(to_date).on('value', function (snapshot) {
                if (snapshot.val()) {
                    var incomeItems = [];
                    snapshot.forEach(child => {
                        if (child.val().is_favourite) {
                            incomeItems.push({
                                id: child.key,
                                Notes: child.val().Notes,
                                accountName: child.val().accountName,
                                categoryName: child.val().categoryName,
                                createdOnDate: child.val().createdOnDate,
                                icon_color: child.val().icon_color,
                                newIncome: child.val().newIncome,
                                time: child.val().time,
                                is_income: child.val().is_income,
                                is_expance: child.val().is_expance,
                                is_transfer: child.val().is_transfer,
                                is_favourite: child.val().is_favourite,
                            })
                        }
                        if (incomeItems.length != 0) {
                            resolve(dispatch({ type: INCOME_FAV_FETCH_LIST_SUCCESS, payload: incomeItems }))
                        } else {
                            reject(dispatch({ type: INCOME_FAV_FETCH_LIST_FAIL, payload: null }))
                        }
                    })
                } else {
                    reject(dispatch({ type: INCOME_FAV_FETCH_LIST_FAIL, payload: null }))
                }
            })
        })
    }
}

export const FavouriteScreenLoad = () => {
    return dispatch => {
        AsyncStorage.getItem("selected_money_icon").then(icon => {
            dispatch({ type: FAVOURITE_SELECTED_MONEY_ICON, payload: icon })
        })
    }
}
export const updateFavouriteMoneyIcon = (dispatch, icon) => {
    dispatch({ type: FAVOURITE_SELECTED_MONEY_ICON, payload: icon })
}

export const favouriteDateRangePicker = (value) => {
    return { type: FAVOURITE_DATE_RANGE_PICKER_DIALOG_VISIBLE, payload: value }
}