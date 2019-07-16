import { AsyncStorage } from 'react-native';
import moment from 'moment'
import {
    HOME_ACCOUNT_FETCH_LIST_FAIL,
    HOME_ACCOUNT_FETCH_LIST_SUCCESS,
    VISIBLE_LIST,
    TODAY_DATE,
    YESTERDAY_DATE,
    INCOME_FETCH_LIST_SUCCESS,
    INCOME_FETCH_LIST_FAIL,
    DELETE_INCOME_DETAIL_SUCCESS,
    DELETE_INCOME_DETAIL_FAIL,
    UNFAVORITE_ITEM_SUCCESS,
    UNFAVORITE_ITEM_FAIL,
    HOME_SELECTED_MONEY_ICON,
    HOME_REFRESH_ITEM,
    DATE_RANGE_PICKER_DIALOG_VISIBLE,
    FLATLIST_ITEM_SELECTED,
    SELECTED_RANGE,
    ITEM_FLATLIST_SELECTED,
    HOME_UPDATE_PROPS,
    HOME_RECIEVE_PROPS
} from '../../Actions/HomeActions/types';
import { db } from '../../utils/firebaseConfig';

export const getDate = (prop) => {
    return dispatch => {
        if (prop.prop == "today") {
            var today = moment().format('DD.MM.YYYY')
            dispatch({ type: TODAY_DATE, payload: today })
        }
        else if (prop.prop == "yesterday") {
            var yesterday = moment().subtract(1, 'days').calendar('DD.MM.YYYY');
            dispatch({ type: YESTERDAY_DATE, payload: yesterday.toString() })
        }
    }
}
export const onPressFlatListItem=(value)=>{
    return { type : FLATLIST_ITEM_SELECTED ,payload:value }
}
export const visibilityList = (value) => {
    return { type: VISIBLE_LIST, payload: value }
}
export const selectDateRange=(range)=>{
    return { type : SELECTED_RANGE, payload:range}
}
export const onPressSelectedFlatListName=(item_name,item_key)=>{
    const payload={
        item_name:item_name,
        item_index:item_key
    }
    return { type : ITEM_FLATLIST_SELECTED , payload:payload}
}
export const homeAccountListFetch = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            var items = [];
            var total = 0;
            db.ref('/newAccount/').once('value', function (snapshot) {
                snapshot.forEach(item => {
                    let response = item.val();
                    total = parseInt(response.initial_balance) + parseInt(total);
                    return total
                })
                snapshot.forEach(child => {
                    items.push({
                        id: child.key,
                        account_name: child.val().account_name,
                        initial_balance: child.val().initial_balance,
                        selected_color_icon: child.val().selected_color_icon
                    })
                    return items
                });
                const payload = {
                    items: items,
                    total: total
                }
                if (items != null) {
                    resolve(dispatch({ type: HOME_ACCOUNT_FETCH_LIST_SUCCESS, payload: payload }))
                } else {
                    reject(dispatch({ type: HOME_ACCOUNT_FETCH_LIST_FAIL, payload: "Something Wrong" }))
                }
            })
        })
    }
}

export const getIncome = (from_date, to_date) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            db.ref('/addNewIncome/').orderByChild("createdOnDate").startAt(from_date).endAt(to_date).on('value', function (snapshot) {
                if (snapshot.val()) {
                    var incomeItems = [];
                    snapshot.forEach(child => {
                        incomeItems.push({
                            id: child.key,
                            Notes: child.val().Notes,
                            accountName: child.val().accountName,
                            categoryName: child.val().categoryName,
                            createdOnDate: child.val().createdOnDate,
                            newDescription: child.val().newDescription,
                            icon_color: child.val().icon_color,
                            newIncome: child.val().newIncome,
                            time: child.val().time,
                            is_income: child.val().is_income,
                            is_expance: child.val().is_expance,
                            is_transfer: child.val().is_transfer,
                            is_favourite: child.val().is_favourite
                        })
                        if (incomeItems != null) {
                            resolve(dispatch({ type: INCOME_FETCH_LIST_SUCCESS, payload: incomeItems }))
                        } else {
                            reject(dispatch({ type: INCOME_FETCH_LIST_FAIL, payload: "Something Wrong" }))
                        }
                    })

                }
                else {
                    reject(ispatch({ type: INCOME_FETCH_LIST_FAIL, payload: null }))
                }
            })
        })
    }
}

export const deleteIncomeDetial = (item) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            if (item.item.is_transfer || item.item.is_income || item.item.is_favourite || item.item.is_expance) {
                db.ref('/addNewIncome/').child(item.item.id).remove().then((success) => {
                    if (success) {
                        resolve(dispatch({ type: DELETE_INCOME_DETAIL_SUCCESS }))
                    }
                    else {
                        reject(dispatch({ type: DELETE_INCOME_DETAIL_FAIL }))
                    }
                })
            }
        })
    }
}
export const setOnFavorite = (item) => {
    return dispatch => {
        db.ref('/addNewIncome/').child(item.item.id).update({
            is_favourite: true,
        })
    }
}

export const setOnUnFavorite = (item) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            db.ref('/addNewIncome/').child(item.item.id).once('value', function (snapshot) {
                db.ref('/addNewIncome/').child(item.item.id).update({
                    is_favourite: false
                })
            }).then((success) => {
                resolve(dispatch({ type: UNFAVORITE_ITEM_SUCCESS }))
            }).catch(err => {
                reject(dispatch({ type: UNFAVORITE_ITEM_FAIL }))
            })
        })
    }
}

export const homeScreenLoad = () => {
    return dispatch => {
        AsyncStorage.getItem("selected_money_icon").then(icon => {
            dispatch({ type: HOME_SELECTED_MONEY_ICON, payload: icon })
        })
    }
}
export const updateHomeMoneyIcon = (dispatch, icon) => {
    dispatch({ type: HOME_SELECTED_MONEY_ICON, payload: icon })
}

export const refreshingHomePage = (dispatch) => {
    dispatch({ type: HOME_REFRESH_ITEM })
}

export const datePickerDialogVisible = (value) => {
    return { type: DATE_RANGE_PICKER_DIALOG_VISIBLE, payload: value }
}
export const homeUpdateProps=(dispatch,payload)=>{
    dispatch({ type : HOME_UPDATE_PROPS ,payload:payload})
}
export const receivePropsHomeLoad=()=>{
    return { type: HOME_RECIEVE_PROPS }
}