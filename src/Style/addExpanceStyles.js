import { StyleSheet, Platform } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    
      row: {
        flex: 1,
        flexDirection: 'row',
      },
      backIcon:{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' },
      headerTitleStyle: {
        fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
    }
})