import { AsyncStorage } from 'react-native';
import moment from 'moment'

import {
    STATISTICS_FLATLIST_VISIBLITY,
    STATISTICS_TODAY_DATE,
    STATISTICS_YESTERDAY_DATE,
    INCOME_ACTIVE,
    EXPANCE_ACTIVE,
    GET_INFORMATION_SUCCESS,
    GET_INFORMATION_FAIL,
    STATISTICS_SELECTED_MONEY_ICON,
    STATISTICS_ACCOUNT_FETCH_LIST_SUCCESS,
    STATISTICS_ACCOUNT_FETCH_LIST_FAIL,
    STATISTICS_FLATLIST_ITEM,
    STATISTICS_SELECTED_ITEM,
    STATISTICS_DATE_RANGE_PICKER,
    STATISTICS_SELECTED_RANGE,
    STATISTICS_CHANGE_INDEX,
    STATISTIC_SCREEN_LOAD,
    SET_DEFAULT_DATE
} from '../../Actions/HomeActions/types';
import { db } from '../../utils/firebaseConfig';


class structure {
    constructor(accountname, color, incometotal) {
        this.accountname = accountname
        this.color = color
        this.incometotal = parseInt(incometotal)
    }
    addIncome = (income) => {
        this.incometotal += parseInt(income)
    }
}
export const setDate =(from_date, to_date)=>{
    const payload={
        from_date:from_date,
        to_date:to_date
    }
    return { type : SET_DEFAULT_DATE, payload:payload}
}
export const firststatisticsScreenLoad = () => {
    return { type: STATISTIC_SCREEN_LOAD }
}
export const visibilityStatList = (value) => {
    return { type: STATISTICS_FLATLIST_VISIBLITY, payload: value }
}
export const onPressStatisticsItem = (value) => {
    return { type: STATISTICS_FLATLIST_ITEM, payload: value }
}
export const selectedItemIndex = (index) => {
    return { type: STATISTICS_CHANGE_INDEX, payload: index }
}
export const onPressStatisticsSelectedName = (item_name, item_key) => {

    const payload = {
        item_name: item_name,
        item_key: item_key
    }
    return { type: STATISTICS_SELECTED_ITEM, payload, payload }
}
export const statisticsDateRangePicker = (value) => {
    return { type: STATISTICS_DATE_RANGE_PICKER, payload: value }
}
export const selectStatisticsDateRange = (range) => {
    return { type: STATISTICS_SELECTED_RANGE, payload: range }
}
export const getStatiscticsDate = (prop) => {
    return dispatch => {
        if (prop.prop == "today") {
            var today = moment().format('DD.MM.YYYY')
            dispatch({ type: STATISTICS_TODAY_DATE, payload: today })
        }
        else if (prop.prop == "yesterday") {
            var yesterday = moment().subtract(1, 'days').calendar('DD.MM.YYYY');
            dispatch({ type: STATISTICS_YESTERDAY_DATE, payload: yesterday.toString() })
        }
    }
}

export const getPage = (page) => {
    return dispatch => {
        if (page == "Income") {
            dispatch({ type: INCOME_ACTIVE })
        }
        else if (page == "Expance") {
            dispatch({ type: EXPANCE_ACTIVE })
        }
    }
}

export const getInformation = (index, from_date, to_date) => {
    
    return dispatch => {
        return new Promise((resolve, reject) => {
            var incomeItems = [];
            var expenceItems = [];
            db.ref('/addNewIncome/').orderByChild("createdOnDate").startAt(from_date).endAt(to_date).once('value', function (snapshot) {
                if (snapshot.val()) {
                    snapshot.forEach(child => {
                        if (index == 0) {
                            if (child.val().is_income) {
                                incomeItems.push({
                                    newIncome: child.val().newIncome,
                                    icon_color: child.val().icon_color,
                                    is_expance: child.val().is_expance,
                                    is_income: child.val().is_income,
                                    accountName: child.val().accountName,
                                    categoryName: child.val().categoryName,
                                    createdOnDate: child.val().createdOnDate,
                                    time: child.val().time,
                                })
                                return incomeItems;
                            }
                        } else {
                            if (child.val().is_expance) {
                                expenceItems.push({
                                    newIncome: child.val().newIncome,
                                    icon_color: child.val().icon_color,
                                    is_expance: child.val().is_expance,
                                    is_income: child.val().is_income,
                                    accountName: child.val().accountName,
                                    categoryName: child.val().categoryName,
                                    createdOnDate: child.val().createdOnDate,
                                    time: child.val().time,
                                })
                                return expenceItems;

                            }
                        }

                    });
                    var incomeBalArray = [];
                    var incomeColorArray = [];
                    var incommeTotal = 0
                    var newIncomeArray = []
                    var incomeMap = new Map();
                    var expanceMap = new Map();
                    if (index == 0) {
                        for (i = 0; i < incomeItems.length; i++) {
                            if (incomeMap.get(incomeItems[i].accountName) == null) {
                                incomeMap.set(incomeItems[i].accountName, new structure(incomeItems[i].accountName, incomeItems[i].icon_color, incomeItems[i].newIncome))
                            } else {
                                var temp = incomeMap.get(incomeItems[i].accountName)
                                temp.addIncome(incomeItems[i].newIncome)
                            }
                        }

                        for (var value of incomeMap.values()) {
                            incomeBalArray.push(value.incometotal)
                            incomeColorArray.push(value.color)
                            incommeTotal += value.incometotal
                            newIncomeArray.push(value)
                        }
                    } else {
                        for (i = 0; i < expenceItems.length; i++) {
                            if (expanceMap.get(expenceItems[i].accountName) == null) {
                                expanceMap.set(expenceItems[i].accountName, new structure(expenceItems[i].accountName, expenceItems[i].icon_color, expenceItems[i].newIncome))
                            } else {
                                var temp = expanceMap.get(expenceItems[i].accountName)
                                temp.addIncome(expenceItems[i].newIncome)
                            }
                        }

                        for (var value of expanceMap.values()) {
                            incomeBalArray.push(value.incometotal)
                            incomeColorArray.push(value.color)
                            incommeTotal += value.incometotal
                            newIncomeArray.push(value)
                        }
                    }
                    const payload = {
                        incomeBalArray: incomeBalArray,
                        incomeColorArray: incomeColorArray,
                        incommeTotal: incommeTotal,
                        newIncomeArray: newIncomeArray
                    }
                    if (incomeItems.length) {
                        resolve(dispatch({ type: GET_INFORMATION_SUCCESS, payload: payload }))
                    }
                    else if (expenceItems.length) {
                        resolve(dispatch({ type: GET_INFORMATION_SUCCESS, payload: payload }))
                    }
                    else {
                        resolve(dispatch({ type: GET_INFORMATION_FAIL, payload: payload }))
                    }
                } else {
                    reject(dispatch({ type: GET_INFORMATION_FAIL, payload: null }))
                }
            })
        })
    }
}


export const statisticsScreenLoad = () => {
    return dispatch => {
        AsyncStorage.getItem("selected_money_icon").then(icon => {
            dispatch({ type: STATISTICS_SELECTED_MONEY_ICON, payload: icon })
        })
    }
}
export const updateStatisticsMoneyIcon = (dispatch, icon) => {
    dispatch({ type: STATISTICS_SELECTED_MONEY_ICON, payload: icon })
}