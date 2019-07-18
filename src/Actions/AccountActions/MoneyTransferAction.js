import moment from 'moment';
import {
    TRANSFER_ACCOUNT_FETCH_LIST_SUCCESS,
    TRANSFER_ACCOUNT_FETCH_LIST_FAIL,
    TRANSFER_VISIBLE_LIST,
    TRANSFER_AMOUNT_CHANGE,
    TRANSFER_AMOUNT_CHANGE_INVALID,
    TRANSFER_DATE_CHANGED,
    TRANSFER_NOTES_CHANGE,
    TRANSFER_VISIBLE_LIST_2,
    TRANSFER_IS_SELECTED_1,
    TRANSFER_IS_SELECTED_2,
    TANSFER_ADD_INCOME_DETAIL_SUCCESS,
    TANSFER_ADD_INCOME_DETAIL_FAIL,
    MONEY_TRANSFER_SELECTED_ITEM_1,
    MONEY_TRANSFER_SELECTED_ITEM_2,
    MONEY_TRANSFER_SCREEN_LOAD
} from '../AccountActions/types'
import { db } from '../../utils/firebaseConfig';
import { Expressions } from '../../utils/expression';
import {
    updateItemlocally
} from '../AccountActions/AccountAction'


export const moneyTransferScreenLoad=()=>{
    return {type :MONEY_TRANSFER_SCREEN_LOAD}
}


export const onPressMoneyTransferSelectedItem1 = (item_acc_name, item_icon, item_selected_color, item_key, item_id, item_index) => {
    const payload = {
        item_acc_name: item_acc_name,
        item_icon: item_icon,
        item_selected_color: item_selected_color,
        item_key: item_key,
        item_id: item_id,
        item_index: item_index
    }
    return { type: MONEY_TRANSFER_SELECTED_ITEM_1, payload: payload }
}

export const onPressMoneyTransferSelectedItem2 = (item_acc_name, item_icon, item_selected_color, item_key, item_id) => {
    const payload = {
        item_acc_name: item_acc_name,
        item_icon: item_icon,
        item_selected_color: item_selected_color,
        item_key: item_key,
        item_id: item_id,
    }
    return { type: MONEY_TRANSFER_SELECTED_ITEM_2, payload: payload }
}



export const transferAccountListFetch = () => {
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
                        resolve(dispatch({ type: TRANSFER_ACCOUNT_FETCH_LIST_SUCCESS, payload: items }))
                    } else {
                        reject(dispatch({ type: TRANSFER_ACCOUNT_FETCH_LIST_FAIL, payload: "Something Wrong" }))
                    }
                });
            })
        })
    }
}

export const transferVisibilityList = (value) => {
    return { type: TRANSFER_VISIBLE_LIST, payload: value }
}

export const transferVisibilityList2 = (value) => {
    return { type: TRANSFER_VISIBLE_LIST_2, payload: value }
}
export const amountInputChange = (text) => {
    var is_valid;
    if (Expressions.NUMERIC.test(text)) {
        is_valid = false
        return { type: TRANSFER_AMOUNT_CHANGE, payload: text }
    } else {
        return { type: TRANSFER_AMOUNT_CHANGE_INVALID }
    }
}

export const transferDateChange = (text) => {
    return { type: TRANSFER_DATE_CHANGED, payload: text }
}


export const transferNoteInputChange = (text) => {
    return { type: TRANSFER_NOTES_CHANGE, payload: text }
}


export const onTransferPressItem1 = (value) => {
    return { type: TRANSFER_IS_SELECTED_1, payload: value }
}

export const onTransferPressItem2 = (value) => {
    return { type: TRANSFER_IS_SELECTED_2, payload: value }
}

export const onSubmitTransferAmount = (
    from_id,
    to_id,
    from_account,
    to_account,
    description,
    newDescription,
    createOnDate,
    amount,
    selected_color,
    notes,
    navigator
) => {
    return dispatch => {
        return new Promise((resolve,reject)=>{
                if (!from_id && !to_id && !description && !createOnDate && !amount && !selected_color) {
                    reject(dispatch({ type: TANSFER_ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" }))
                } else {
                    db.ref('/newAccount/').child(from_id).once('value', function (snapshot) {
                        db.ref('/newAccount/').child(from_id).update({
                            initial_balance: parseInt(snapshot.val().initial_balance) - parseInt(amount)
                        })
                    })
                    db.ref('/newAccount/').child(to_id).once('value', function (snapshot) {
                        db.ref('/newAccount/').child(to_id).update({
                            initial_balance: parseInt(snapshot.val().initial_balance) + parseInt(amount)
                        })
                    })
                    updateItemlocally(dispatch,from_id,to_id,amount)
                    db.ref("/addNewIncome").push({
                        newIncome: amount,
                        accountName: description,
                        newDescription:newDescription,
                        from_account:from_account,
                        to_account:to_account,
                        categoryName: "Transfer",
                        createdOnDate: createOnDate,
                        time: moment().format('MMMM DD') + ", " + moment().format('YYYY') + " " + moment().format("hh:mm:ss"),
                        Notes: notes ? notes : "",
                        icon_color: selected_color,
                        is_income: false,
                        is_expance: false,
                        is_transfer: true,
                        is_favourite: false
                    }).then(res => {
                        transferIncomeDetailSuccess(dispatch, navigator,resolve,reject)
                    }).catch(err => {
                        transferIncomeDetailFail(dispatch, navigator,resolve,reject)
                    })
                }
        })
    }
}
export const transferIncomeDetailSuccess = (dispatch, navigator,resolve,reject) => {
    resolve(dispatch({ type: TANSFER_ADD_INCOME_DETAIL_SUCCESS, payload: "success" }))
    try {
        navigator.pop();
        navigator.reset()
    }
    catch (error) {
        reject(dispatch({ type: TANSFER_ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" }))
    }
}
export const transferIncomeDetailFail = (dispatch, navigator,resolve,reject) => {
    reject(dispatch({ type: TANSFER_ADD_INCOME_DETAIL_FAIL, payload: "Something Wrong" }))
}
