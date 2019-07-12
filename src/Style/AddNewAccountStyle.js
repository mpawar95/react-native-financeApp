import { StyleSheet, Platform } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    CircleShapeView: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    navigationHeaderTitleStyle:{
        fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
    },
    navigationHeaderLeft:{
        height: 40, width: 40, alignContent: 'center', justifyContent: 'center'
    }
})