import { StyleSheet, Dimensions,Platform } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
   subHeader:{
        flex: 3, backgroundColor: Color.BACKGROUND_COLOR
   },
   viewStyle:{
         width: "100%", height: 44, backgroundColor: "white", marginTop: 5, borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, borderRadius: 3
   },
   backIcon:{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' },
   headerTitleStyle: {
      fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
  }
})