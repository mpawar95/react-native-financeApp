import { StyleSheet, Dimensions,Platform } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
dropDownlist1:{
    flexDirection: "row", width: "100%", height: 44, backgroundColor: 'white', borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, justifyContent: 'space-between', alignItems: 'center', borderRadius: 3, 
},
dropDownlist: {
    padding: 12,
    height: 44,
    fontSize: 15,
    justifyContent:"center",
    borderRadius: 3,
    borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
},
})