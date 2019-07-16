import { AsyncStorage } from 'react-native';
import moment from "moment";

import {
    EXPENCE_FLATLIST_VISIBILITY,
    EXPENCE_IS_SELECTED,
    EXPENCE_GET_ACCOUNT_LIST_SUCCESS,
    EXPENCE_GET_ACCOUNT_LIST_FAIL,
    EXPENCE_CATEGORY_MODAL_VISIBLE,
    EXPENCE_CATEGORY_IS_SELECTED,
    EXPENCE_DATE_CHANGED,
    EXPENCE_NOTES_INPUT_CHANGE,
    EXPENCE_DETAIL_SELECTED_ACCOUNT_ITEMS,
    EXPENCE_ADD_INCOME_DETAIL_FAIL,
    EXPENCE_ADD_INCOME_DETAIL_SUCCESS,
    EXPENCE_INCOME_DETAIL_FAIL,
    UPDATE_EXPANCE_DETAIL_SUCCESS,
    EXPENCE_DETAIL_SELECTED_MONEY_ICON,
    EXPENCE_DETAIL_SCREEN_LOAD,
    EXPENCE_DETAIL_SELECTED_CATEGORY_ITEMS,
    EXPENCE_DETAIL_SET_ITEMS
} from '../../Actions/HomeActions/types';
import { db } from '../../utils/firebaseConfig';
export const expenceDetailScreenLoad = () => {
    return { type: EXPENCE_DETAIL_SCREEN_LOAD }
}
export const expence_FlatList_visibility = (value) => {
    return { type: EXPENCE_FLATLIST_VISIBILITY, payload: value }
}

export const expenceNoteInputChange = (text) => {
    return { type: EXPENCE_NOTES_INPUT_CHANGE, payload: text }
}

export const onExpncePressItem = (value) => {
    return { type: EXPENCE_IS_SELECTED, payload: value }
}

export const expenceCategoryModalVisible = (value) => {
    return { type: EXPENCE_CATEGORY_MODAL_VISIBLE, payload: value }
}

export const expenceonPressCatItem = (value) => {
    return { type: EXPENCE_CATEGORY_IS_SELECTED, payload: value }
}


export const expenceDateChange = (text) => {
    return { type: EXPENCE_DATE_CHANGED, payload: text }
}

export const onPressExpenceItems = (item_account_name, item_icon, item_selected_color_icon, item_key, item_id) => {
    const payload = {
        item_account_name: item_account_name,
        item_icon: item_icon,
        item_selected_color_icon: item_selected_color_icon,
        item_key: item_key,
        item_id: item_id
    }
    return { type: EXPENCE_DETAIL_SELECTED_ACCOUNT_ITEMS, payload: payload }
}
export const expenceCatItems = (item_cat_name, item_cat_icon, item_cat_id) => {
    const payload = {
        item_cat_name: item_cat_name,
        item_cat_icon: item_cat_icon,
        item_cat_id: item_cat_id,
    }
    return { type: EXPENCE_DETAIL_SELECTED_CATEGORY_ITEMS, payload: payload }
}
export const expenceSetItem = (item_accountName, item_cat_icon, item_icon_color, item_categoryName) => {
    const payload = {
        item_accountName: item_accountName,
        item_cat_icon: item_cat_icon,
        item_icon_color: item_icon_color,
        item_categoryName: item_categoryName
    }
    return { type: EXPENCE_DETAIL_SET_ITEMS, payload: payload }
}
export const expenceGetAccountList = () => {
    return dispatch => {
        var items = [];
        db.ref('/newAccount/').on('value', function (snapshot) {
            snapshot.forEach(child => {
                items.push({
                    id: child.key,
                    account_name: child.val().account_name,
                    initial_balance: child.val().initial_balance,
                    selected_color_icon: child.val().selected_color_icon
                })
                if (items != null) {
                    dispatch({ type: EXPENCE_GET_ACCOUNT_LIST_SUCCESS, payload: items })
                } else {
                    dispatch({ type: EXPENCE_GET_ACCOUNT_LIST_FAIL, payload: "Something Wrong" })
                }
            })
        })
    }
}
export const expenceIncomeDetail = (
    income,
    selected_name,
    selected_cat_name,
    todayDate,
    icon_color,
    notesValue,
    navigator,
    selected_key
) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            if (!income && !selected_name && !selected_cat_name && !todayDate) {
                reject(dispatch({ type: EXPENCE_INCOME_DETAIL_FAIL, payload: "Something Wrong" }))
            } else {
                let Data = {
                    newIncome: income,
                    accountName: selected_name,
                    categoryName: selected_cat_name,
                    createdOnDate: todayDate,
                    time: moment().format('MMMM DD') + ", " + moment().format('YYYY'),
                    Notes: notesValue
                }
                db.ref('/newAccount/').child(selected_key).once('value', function (snapshot) {
                    db.ref('/newAccount/').child(selected_key).update({
                        initial_balance: parseInt(snapshot.val().initial_balance) - parseInt(income)
                    })
                })

                db.ref("/addNewIncome").push({
                    newIncome: income,
                    accountName: selected_name,
                    categoryName: selected_cat_name,
                    createdOnDate: todayDate,
                    time: moment().format('MMMM DD') + ", " + moment().format('YYYY') + " " + moment().format("hh:mm:ss"),
                    Notes: notesValue ? notesValue : "",
                    icon_color: icon_color,
                    is_income: false,
                    is_expance: true,
                    is_transfer: false,
                    is_favourite: false
                }).then(res => {
                    expenceDetailSuccess(dispatch, Data, navigator, resolve, reject)
                }).catch(err => {
                    expenceDetailFail(dispatch, Data, navigator, resolve, reject)
                })

            }
        })
    }
}
export const expenceDetailSuccess = (dispatch, Data, navigator,resolve,reject) => {
    resolve(dispatch({ type: EXPENCE_ADD_INCOME_DETAIL_SUCCESS, payload: "success" }))
    try {
        navigator.navigate("Home");
        navigator.reset()
    }
    catch (error) {
        reject(dispatch({ type: EXPENCE_ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" }))
    }
}
export const expenceDetailFail = (dispatch, Data, navigator,resolve,reject) => {
    reject(dispatch({ type: EXPENCE_ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" }))
}

export const updateExpanceDetail = (
    item_id,
    income,
    selected_name,
    selected_cat_name,
    todayDate,
    icon_color,
    notesValue,
    navigator,
    selected_key
) => {
    return dispatch => {
        db.ref('/addNewIncome/').child(item_id).update({
            newIncome: income,
            accountName: selected_name,
            categoryName: selected_cat_name,
            createdOnDate: todayDate,
            icon_color: icon_color,
            Notes: notesValue,
        }).then(res => {
            updateExpanceSuccess(dispatch, navigator)
        }).catch(err => {

        })
        db.ref('/newAccount/').child(selected_key).once('value', function (snapshot) {
            db.ref('/newAccount/').child(selected_key).update({
                initial_balance: parseInt(snapshot.val().initial_balance) - parseInt(income)
            })
        })



    }
}
export const updateExpanceSuccess = (dispatch, navigator) => {
    dispatch({ type: UPDATE_EXPANCE_DETAIL_SUCCESS })
    navigator.navigate("Home");
}


export const ExpenceDetailScreenLoad = () => {
    return dispatch => {
        AsyncStorage.getItem("selected_money_icon").then(icon => {
            dispatch({ type: EXPENCE_DETAIL_SELECTED_MONEY_ICON, payload: icon })
        })
    }
}
export const updateExpenceDetailMoneyIcon = (dispatch, icon) => {
    dispatch({ type: EXPENCE_DETAIL_SELECTED_MONEY_ICON, payload: icon })
}