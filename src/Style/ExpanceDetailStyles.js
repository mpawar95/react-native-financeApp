import { StyleSheet, Dimensions,Platform } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
   subHeader:{
        flex: 3, backgroundColor: Color.BACKGROUND_COLOR
   },
   viewStyle:{
         width: "100%", height: 44, backgroundColor: "white", marginTop: 5, borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, borderRadius: 3
   }
})