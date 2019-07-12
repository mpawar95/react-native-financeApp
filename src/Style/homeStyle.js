import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    Floatminus: {
        fontWeight: "700",
        fontSize: 50,
        color: "white",
        bottom: 5
    },
    Floatplus: {
        fontWeight: "700",
        fontSize: 50,
        color: "white",
        bottom: Platform.OS === "ios" ? 5 : 10
    },
    secondHeader: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: Color.BACKGROUND_COLOR
    },
    firstFlatListViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    commonFlatListDollar: {
        fontSize: 18,
        color: "white",
        fontWeight: "700",
        marginLeft: 5,
        marginRight: 5
    },
    dropDownlist1: {
        flexDirection: "row",
        width: "100%",
        height: 44,
        backgroundColor: 'white',
        borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
      },
    dropDownlist: {
        padding: 12,
        height: 44,
        fontSize: 15,
        justifyContent:"center",
        borderRadius: 3,
        borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
    },
    thirdHeaderTransaction: {
        zIndex: -1,
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        bottom: 5
    },
    renderFlatList: {
        // flex:1,
        margin:10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: Color.BACKGROUND_COLOR
    },
    emptyCartImage:{
        alignItems: 'center', justifyContent: 'center', marginTop: 100
    },
    swipeRowItem:{
        color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop: 3 , fontWeight:"500",fontSize:12
    },
    
})