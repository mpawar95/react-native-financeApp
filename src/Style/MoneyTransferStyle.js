import { StyleSheet, Dimensions,Platform } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    dropDownlist:{
        flexDirection: "row", width: "100%", height: 44, backgroundColor: 'white', borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, justifyContent: 'space-between', alignItems: 'center', borderRadius: 3, 
    },
    viewStyle:{
        width: "100%", height: 44, backgroundColor: "white", marginTop: 5, borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, borderRadius: 3
  },
    headerTextStyle: {
        fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
    },
    backIcon: {
        height: 40, width: 40, alignContent: 'center', justifyContent: 'center'
    }
})