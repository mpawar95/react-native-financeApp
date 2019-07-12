import { combineReducers } from "redux";
import homeReducer from './MainScreenReducers/homeScreenReducers';
import accountReducer from './MainScreenReducers/accountReducers';
import categoriesReducer from './MainScreenReducers/categoriesReducers';
import trendReducer from './MainScreenReducers/trendReducers';
import favouriteReducer from './MainScreenReducers/favouriteReducers';
import settingReducer from './MainScreenReducers/settingReducers';
import addNewReducer from './AddItemReducers/AddNewAccountReducer';
import addIncomeReducer from './HomeReducers/addIncomeReducer';
import statisticsReducer from './HomeReducers/statisticsReducer';
import addExpenceReducer from './HomeReducers/addExpenceReducer';
import incomeDetailReducer from './HomeReducers/incomeDetailReducer';
import expenceDetailReducer from './HomeReducers/expenceDetailReducer';
import editAccountReducer from './AddItemReducers/EditAccountReducer';
import editIncomeReducer from './HomeReducers/editIncomeReducer';
import moneyTransferReducer from './AddItemReducers/MoneyTransferReducer';
import accountDetailReducer from './HomeReducers/AccountDetailReducer';
import NewCategoryReducer from './CategoryReducers/NewCategoryReducer';
import EditCategoryReducer from './CategoryReducers/EditCategoryReducer';
import DrawerReducer from './MainScreenReducers/DrawerReducer';
export default combineReducers({
    drawer:DrawerReducer,
    home: homeReducer,
    account: accountReducer,
    categories: categoriesReducer,
    trend: trendReducer,
    favorite: favouriteReducer,
    settings: settingReducer,
    addnew: addNewReducer,
    addIncome: addIncomeReducer,
    statistics: statisticsReducer,
    addExprence: addExpenceReducer,
    incomedetail: incomeDetailReducer,
    expencedetail: expenceDetailReducer,
    edit: editAccountReducer,
    editIncome: editIncomeReducer,
    transfer:moneyTransferReducer,
    accountDetail:accountDetailReducer,
    newCat:NewCategoryReducer,
    editCategory:EditCategoryReducer,
});