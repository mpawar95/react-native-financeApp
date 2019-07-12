import { StyleSheet, Dimensions,Platform } from "react-native";
import { Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    inputContainerIos: {
        marginLeft: 18,
        height: 44,
        width: "75%",
        borderWidth: 0.5,
        borderRadius: 4,
        paddingLeft: 12,
        paddingTop: 14,
        color: "#636863",
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor:Color.LIGHT_FONT_COLOR
    },
    inputContainerAndroid: {
        marginLeft: 18,
        width: "70%",
        height: 44,
        borderWidth: 0.5,
        borderRadius: 4,
        color: "#636863",
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor:Color.LIGHT_FONT_COLOR
    },
    dropDownlist:{
        flexDirection: "row", width: "100%", height: 44, backgroundColor: 'white', borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, justifyContent: 'space-between', alignItems: 'center', borderRadius: 3, 
    }
})