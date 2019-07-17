import { AsyncStorage } from 'react-native';
import moment from "moment";
import {
    FLATLIST_VISIBILITY,
    INCOME_DETAIL_PAGE_LOAD,
    NOTES_INPUT_CHANGE,
    IS_SELECTED,
    CATEGORY_MODAL_VISIBLE,
    CATEGORY_IS_SELECTED,
    DATE_CHANGED,
    ADD_INCOME_DETAIL_SUCCESS,
    ADD_INCOME_DETAIL_FAIL,
    GET_ACCOUNT_LIST_SUCCESS,
    GET_ACCOUNT_LIST_FAIL,
    UPDATE_INCOME_DETAIL_SUCCESS,
    INCOME_DETAIL_SELECTED_MONEY_ICON,
    INCOME_DETAIL_SCREEN_LOAD,
    INCOME_DETAIL_SELECTED_ACCOUNT_ITEMS,
    INCOME_DETAIL_SELECTED_CATEGORY_ITEMS,
    INCOME_DETAIL_SET_ITEMS
} from '../../Actions/HomeActions/types';

import { db } from '../../utils/firebaseConfig';

export const flatList_visibility = (value) => {
    return { type: FLATLIST_VISIBILITY, payload: value }
}

export const incomeDetailScreenLoad = () => {
    return { type: INCOME_DETAIL_PAGE_LOAD }
}

export const noteInputChange = (text) => {
    return { type: NOTES_INPUT_CHANGE, payload: text }
}

export const onPressItem = (value) => {
    return { type: IS_SELECTED, payload: value }
}

export const categoryModalVisible = (value) => {
    return { type: CATEGORY_MODAL_VISIBLE, payload: value }
}

export const onPressCatItem = (value) => {
    return { type: CATEGORY_IS_SELECTED, payload: value }
}


export const dateChange = (text) => {
    return { type: DATE_CHANGED, payload: text }
}
export  const onPressIncomeItemSelected=(item_account_name,item_icon,item_selected_color_icon,item_key,item_id)=>{
    const payload={
        item_account_name:item_account_name,
        item_icon:item_icon,
        item_selected_color_icon:item_selected_color_icon,
        item_key:item_key,
        item_id:item_id
    }
    return { type : INCOME_DETAIL_SELECTED_ACCOUNT_ITEMS,payload:payload}
}
export const onPressIncomeCatSelected=(item_cat_name,item_cat_icon,item_cat_id)=>{
    const payload={
        item_cat_name:item_cat_name,
        item_cat_icon:item_cat_icon,
        item_cat_id:item_cat_id,
    }
    return { type : INCOME_DETAIL_SELECTED_CATEGORY_ITEMS,payload:payload}
}
export const setItems=(item_accountName,item_cat_icon,item_icon_color,item_categoryName)=>{
    const payload={
        item_accountName:item_accountName,
        item_cat_icon:item_cat_icon,
        item_icon_color:item_icon_color,
        item_categoryName:item_categoryName
    }
    return { type : INCOME_DETAIL_SET_ITEMS, payload:payload}
}
export const getAccountList = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
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
                        resolve(dispatch({ type: GET_ACCOUNT_LIST_SUCCESS, payload: items }))
                    } else {
                        reject(dispatch({ type: GET_ACCOUNT_LIST_FAIL, payload: "Something Wrong" }))
                    }
                })
            })
        })

    }
}
export const addIncomeDetail = (
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
        if (!income && !selected_name && !selected_cat_name && !todayDate) {
            dispatch({ type: ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" })
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
                    initial_balance: parseInt(snapshot.val().initial_balance) + parseInt(income)
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
                is_income: true,
                is_expance: false,
                is_transfer: false,
                is_favourite: false,
                selected_key:selected_key
            }).then(res => {
                incomeDetailSuccess(dispatch, Data, navigator)
            }).catch(err => {
                incomeDetailFail(dispatch, Data, navigator)
            })
        }
    }
}
export const incomeDetailSuccess = (dispatch, Data, navigator) => {
    
    dispatch({ type: ADD_INCOME_DETAIL_SUCCESS, payload: "success" })

    try {
        navigator.navigate("Home");
        navigator.reset()
    }
    catch (error) {
       dispatch({ type: ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" })
    }
}
export const incomeDetailFail = (dispatch, Data, navigator) => {
    dispatch({ type: ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" })
}


export const updateIncomeDetail = (
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
            updateSuccess(dispatch, navigator)
        }).catch(err => {
            console.log(err)
        })
        db.ref('/newAccount/').child(selected_key).once('value', function (snapshot) {
            db.ref('/newAccount/').child(selected_key).update({
                initial_balance: parseInt(snapshot.val().initial_balance) + parseInt(income)
            })
        })



    }
}
export const updateSuccess = (dispatch, navigator) => {
    dispatch({ type: UPDATE_INCOME_DETAIL_SUCCESS })
    navigator.navigate("Home");
}

export const incomeDetailIconScreenLoad = () => {
    return dispatch => {
        AsyncStorage.getItem("selected_money_icon").then(icon => {
            dispatch({ type: INCOME_DETAIL_SELECTED_MONEY_ICON, payload: icon })
        })
    }
}

export const updateIncomeDetailMoneyIcon = (dispatch, icon) => {
    dispatch({ type: INCOME_DETAIL_SELECTED_MONEY_ICON, payload: icon })
}