import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation';

import DrawerComponent from '../Screens/MainScreen/DrawerComponent';
import LoadingScreen from '../Screens/MainScreen/LoadingScreen';
import IntroAppScreen from '../Screens/MainScreen/IntroAppScreen';
import HomeScreen from '../Screens/MainScreen/HomeScreen'
import AccountScreen from '../Screens/MainScreen/AccountScreen'
import CategorieScreen from '../Screens/MainScreen/CategorieScreen'
import FavouriteScreen from '../Screens/MainScreen/FavouriteScreen'
import SettingScreen from '../Screens/MainScreen/SettingScreen'
import TrendScreen from '../Screens/MainScreen/TrendScreen'
import AddNewAccountScreen from '../Screens/AddItemsScreens/AddNewAccountScreen';
import AddIncomeScreen from '../Screens/Home/AddIncomeScreen';
import StatisticsScreen from '../Screens/Home/StatisticsScreen';
import AddExpenceScreen from '../Screens/Home/AddExpenceScreen';
import IncomeDetailScreen from '../Screens/Home/IncomeDetailScreen';
import ExpenceDetailScreen from '../Screens/Home/ExpenceDetailScreen';
import EditAccountScreen from '../Screens/AddItemsScreens/EditAccountScreen'
import EditIncomeDetailScreen from '../Screens/Home/EditIncomeDetailScreen'
import MoneyTransferScreen from '../Screens/AddItemsScreens/MoneyTransferScreen'
import AccountDetailScreen from '../Screens/Home/AccountDetailScreen';
import NewCategoryScreen from '../Screens/CategoryScreens/NewCategoryScreen';
import EditCategoryScreen from '../Screens/CategoryScreens/EditCategoryScreen';

const EditStack = createStackNavigator({

    EditAccount: {
        screen: EditAccountScreen,
    }
}
)
const INAccontStack = createStackNavigator({

    AddNewAccount: {
        screen: AddNewAccountScreen,
    },

}
)
const TranferStack = createStackNavigator({
    Transfer: {
        screen: MoneyTransferScreen
    }
}
)
const AccountStack = createStackNavigator({
    Acconts: {
        screen: AccountScreen, navigationOption: { header: null }
    },
    AddNewAccount: {
        screen: INAccontStack,
    },
    EditAccount: {
        screen: EditStack,
    },
    Transfer: {
        screen: TranferStack
    }
},
    {
        headerMode: "none"
    }
)

const INHomeStack = createStackNavigator({
    AddIncome: {
        screen: AddIncomeScreen,
    },
    IncomeDetail: {
        screen: IncomeDetailScreen,
    },
})
const InStatisticsStack = createStackNavigator({
    Statistics: {
        screen: StatisticsScreen,
    }
})
const InAddExpenceStack = createStackNavigator({
    AddExpence: {
        screen: AddExpenceScreen,
    },
    ExpanceDetail: {
        screen: ExpenceDetailScreen
    }
})
const EditIncomeStack = createStackNavigator({
    EditIncomeDetail: {
        screen: EditIncomeDetailScreen,
    }
})
const AccountDetailStack = createStackNavigator({
    AccountDetail: {
        screen: AccountDetailScreen,
    }
})
const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen, navigationOption: { header: null }
    },
    AddIncome: {
        screen: INHomeStack,
        navigationOption: { header: null }
    },
    Statistics: {
        screen: InStatisticsStack,
    },
    AddExpence: {
        screen: InAddExpenceStack,
    },
    EditIncomeDetail: {
        screen: EditIncomeStack,
    },
    AccountDetail: {
        screen: AccountDetailStack
    }

},
    {
        headerMode: "none"
    }
)
const NewCategoryStack = createStackNavigator({
    NewCategory: {
        screen: NewCategoryScreen
    }
})
const EditCategoryStack = createStackNavigator({
    EditCategory: {
        screen: EditCategoryScreen
    }
})
const CategorieStack = createStackNavigator({
    Categories: {
        screen: CategorieScreen,
    },
    NewCategory: {
        screen: NewCategoryStack
    },
    EditCategory:{
        screen: EditCategoryStack
    }
}, {
        headerMode: 'none'
})
const MainContainer = createDrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOption: { header: null }
    },
    Acconts: {
        screen: AccountStack,
        navigationOption: { header: null }
    },
    Categories: {
        screen: CategorieStack
    },
    Trends: {
        screen: TrendScreen
    },
    Favorites: {
        screen: FavouriteScreen
    },
    Settings: {
        screen: SettingScreen
    },
},

    {
        drawerWidth: 300,

        contentComponent: props => <DrawerComponent {...props} />,
    }
);
const rootContainer = createAppContainer(createSwitchNavigator(
    {
        Loading: {
            screen: LoadingScreen
        },
        Intro: {
            screen: IntroAppScreen
        },
        Main: {
            screen: MainContainer
        }
    },
    {
        headerMode: "none",
        initialRouteName: 'Loading',
    }
))


const AppContainer = createAppContainer(rootContainer);

export default class Application extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}