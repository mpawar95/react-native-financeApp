import { StyleSheet, Platform } from "react-native";
import { Color } from '../utils/Colors';

export const styles = StyleSheet.create({
      headerTextStyle:{
            fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
      },
      backIcon:{
            height: 40, width: 40, alignContent: 'center', justifyContent: 'center'
      }
})