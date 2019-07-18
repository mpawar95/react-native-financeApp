import { AsyncStorage } from 'react-native';
import moment from 'moment'
import {
    ACCOUNT_DETAIL_SELECTED_MONEY_ICON,
    ACCOUNT_DETAIL_FETCH_LIST_SUCCESS,
    ACCOUNT_DETAIL_FETCH_LIST_FAIL,
    ACCOUNT_DETAIL_TODAY_DATE,
    ACCOUNT_DETAIL_YESTERDAY_DATE,
    ACCOUNT_DETAIL_VISIBLE_LIST,
    ACCOUNT_DETAIL_INCOME_FETCH_LIST_SUCCESS,
    ACCOUNT_DETAIL_INCOME_FETCH_LIST_FAIL,
    DELETE_ACCOUNT_DETAIL_SUCCESS,
    DELETE_ACCOUNT_DETAIL_FAIL,
    ACCOUN_SCREEN_DATE_RANGE_PICKER_VISIBLE,
    ACCOUNT_FLATLIST_ITEM_SELECTED,
    ACCOUNT_SELECTED_RANGE,
    ACCOUNT_ITEM_FLATLIST_SELECTED,
    SET_ACCOUNT_NAME,
    ACCOUNT_DETAIL_SET_DEFAULT_DATE
} from '../../Actions/HomeActions/types';
import { db } from '../../utils/firebaseConfig'

export const onPressSelectedItem=(value)=>{
    return { type : ACCOUNT_FLATLIST_ITEM_SELECTED ,payload:value }
}
export const onPressSelectedName=(item_name,item_key)=>{
    const payload={
        item_name:item_name,
        item_index:item_key
    }
    return { type : ACCOUNT_ITEM_FLATLIST_SELECTED , payload:payload}
}
export const accountDetailScreenLoad = () => {
    return dispatch => {
        AsyncStorage.getItem("selected_money_icon").then(icon => {
            dispatch({ type: ACCOUNT_DETAIL_SELECTED_MONEY_ICON, payload: icon })
        })
    }
}
export const setPreviousAccountName=(name)=>{

    return {type : SET_ACCOUNT_NAME, payload:name }
}
export const accountDetailSetDate = (from_date, to_date) => {
    const payload = {
        from_date: from_date,
        to_date: to_date
    }
    return { type: ACCOUNT_DETAIL_SET_DEFAULT_DATE, payload: payload }
}
export const setNextAccountName=(name)=>{

    return {type : SET_ACCOUNT_NAME, payload:name }
}

export const updateAccountDetailMoneyIcon = (dispatch, icon) => {
    dispatch({ type: ACCOUNT_DETAIL_SELECTED_MONEY_ICON, payload: icon })
}

export const selectAccountDetailDateRange=(range)=>{
    return {type: ACCOUNT_SELECTED_RANGE , payload:range}
}
export const accountDetailListFetch = () => {
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
                        resolve(dispatch({ type: ACCOUNT_DETAIL_FETCH_LIST_SUCCESS, payload: items }))
                    } else {
                        reject(dispatch({ type: ACCOUNT_DETAIL_FETCH_LIST_FAIL, payload: "Something Wrong" }))
                    }
                });
            })
        })
    }
}

export const accountDetailFlatListVisibility = (value) => {
    return { type: ACCOUNT_DETAIL_VISIBLE_LIST, payload: value }
}

export const accountDetailGetDate = (prop) => {
    return dispatch => {
        if (prop.prop == "today") {
            var today = moment().format('DD.MM.YYYY')
            dispatch({ type: ACCOUNT_DETAIL_TODAY_DATE, payload: today })
        }
        else if (prop.prop == "yesterday") {
            var yesterday = moment().subtract(1, 'days').calendar('DD.MM.YYYY');
            dispatch({ type: ACCOUNT_DETAIL_YESTERDAY_DATE, payload: yesterday.toString() })
        }
    }
}

export const accountDetailGetIncome = (account_name,from_date,to_date) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            var incomeItems = [];
            db.ref('/addNewIncome/').orderByChild("createdOnDate").startAt(from_date).endAt(to_date).on('value', function (snapshot) {
                if (snapshot.val()) {
                    snapshot.forEach(child => {
                        if (child.val().accountName === account_name || child.val().from_account === account_name || child.val().to_account === account_name) {
                            incomeItems.push({
                                id: child.key,
                                Notes: child.val().Notes,
                                accountName: child.val().accountName,
                                categoryName: child.val().categoryName,
                                createdOnDate: child.val().createdOnDate,
                                icon_color: child.val().icon_color,
                                newIncome: child.val().newIncome,
                                from_account:child.val().from_account,
                                to_account:child.val().to_account,
                                newDescription:child.val().newDescription,
                                time: child.val().time,
                                is_income: child.val().is_income,
                                is_expance: child.val().is_expance,
                                is_transfer: child.val().is_transfer,
                                is_favourite: child.val().is_favourite
                            })
                            return incomeItems;
                        } else {
                            reject(dispatch({ type: ACCOUNT_DETAIL_INCOME_FETCH_LIST_FAIL, payload: null }))
                        }
                    });
                    const payload = {
                        incomeItems: incomeItems,
                        account_name: account_name
                    }
                    if (!incomeItems.length == 0) {
                        resolve(dispatch({ type: ACCOUNT_DETAIL_INCOME_FETCH_LIST_SUCCESS, payload: payload }))
                    } else {
                        reject(dispatch({ type: ACCOUNT_DETAIL_INCOME_FETCH_LIST_FAIL, payload: null }))
                    }
                } else {
                    reject(dispatch({ type: ACCOUNT_DETAIL_INCOME_FETCH_LIST_FAIL, payload: null }))
                }
            })
        })
    }
}


export const deleteAccountDetial = (id) => {
    return dispatch => {
        // db.ref('/newAccount/').child(id).once('value', function (snapshot) {
        //     db.ref('/newAccount/').child(id).update({
        //         initial_balance: parseInt(snapshot.val().initial_balance) - parseInt(income) 
        //     })
        // })
        db.ref('/addNewIncome/').child(id).remove().then((success) => {
            if (success) {
                dispatch({ type: DELETE_ACCOUNT_DETAIL_SUCCESS })
            }
            else {
                dispatch({ type: DELETE_ACCOUNT_DETAIL_FAIL })
            }
        })
    }
}
export const accountScreenDatePickerDialogVisible=(value)=>{
    return { type : ACCOUN_SCREEN_DATE_RANGE_PICKER_VISIBLE, payload:value}
}

export const setOnAccountDetailFavorite = (item) => {
    return dispatch => {
        db.ref('/addNewIncome/').child(item.item.id).update({
            is_favourite: true
        })
    }
}

export const setOnAccountDetailUnFavorite = (item) => {
    return dispatch => {
        db.ref('/addNewIncome/').child(item.item.id).update({
            is_favourite: false
        })
    }
}