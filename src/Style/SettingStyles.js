import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    dropDownlist: {
        flexDirection: "row", 
        width: "100%", 
        height: 44, 
        backgroundColor: 'white', 
        borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderRadius: 3,
    },
    Peri: { 
        fontWeight: '700', 
        color: "#000000", 
    },
    Fy: { 
        fontWeight: '700', 
        color: "#6c9961" 
    },
    bottomCopyright: { 
        flexDirection: "row", 
        justifyContent: "center", 
        position: 'absolute', 
        bottom: 0, 
        alignSelf: 'center' 
    },
    viewButton: { 
        flexDirection: "row", 
        zIndex: -1, 
        marginTop: 10, 
        height: 35, 
        justifyContent: 'space-around' 
    },
    generateButton: { 
        flex: 1, 
        backgroundColor: Color.PRIMARY, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 10 
    },
    resetButton: { 
        flex: 1, 
        backgroundColor: Color.RED_COLOR, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: 10 
    },
    textStyle: { 
        fontWeight: "700", 
        color: "white" 
    },
    displayList: { 
        width: "100%", 
        height: 135, 
        borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, 
        zIndex: 1, 
        position: "absolute", 
        backgroundColor: 'white' 
    }
})