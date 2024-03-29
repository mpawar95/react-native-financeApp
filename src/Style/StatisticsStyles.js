import { StyleSheet, Dimensions,Platform } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    Floatminus:{
        fontWeight:"700", fontSize:50,color:"white",bottom:5
    },
    Floatplus:{
        fontWeight:"700", fontSize:50,color:"white",bottom: Platform.OS === "ios" ? 5 : 10
    },
    secondHeader:{
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        backgroundColor:Color.BACKGROUND_COLOR
    },
    firstFlatListViewStyle:{
        alignItems: 'center', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'
    },
    commonFlatListDollar:{
        fontSize: 18, color: "white", fontWeight: "700",marginLeft:5,marginRight:5
    },
    dropDownlist:{
        padding: 12,
        height: 44,
        fontSize: 15,
        alignItems: 'center',
        borderRadius: 3,
        alignItems: "center",
        borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
    },
    activeTabTextStyle:
    { color: Color.WHITE_COLOR, fontWeight: "500",fontSize:18, zIndex: -1, },
    activeTabStyle:
        { backgroundColor: Color.PRIMARY, fontWeight: "500", zIndex: -1, },
    tabsContainerStyle:
        { height: 40, margin: 10, zIndex: -1, },
    tabStyle:
        { borderColor: Color.PRIMARY, zIndex: -1, },
    tabTextStyle:
        { color: Color.PRIMARY,fontSize:18, zIndex: -1, },
    backIcon:{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' },
    headerTitleStyle:{
        fontSize: 17, 
        color: "#636863", 
        alignContent: 'center', 
        justifyContent: 'center', 
        marginLeft: Platform.OS === "ios" ? 0 : -20
    },
    selectionList:{ flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10 },
    StatisticEmpty:{
        bottom: 24, left: 61, fontSize: 18, fontWeight:"600"
    }
})