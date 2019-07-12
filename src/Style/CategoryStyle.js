import { StyleSheet, Dimensions,Platform } from "react-native";
import { Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    activeTabTextStyle:
        { color: Color.WHITE_COLOR, fontWeight: "500",fontSize:18 },
    activeTabStyle:
        { backgroundColor: Color.PRIMARY, fontWeight: "500" },
    tabsContainerStyle:
        { height: 40, margin: 10 },
    tabStyle:
        { borderColor: Color.PRIMARY },
    tabTextStyle:
        { color: Color.PRIMARY,fontSize:18 },
    Floatminus: {
        fontWeight: "700", fontSize: 50, color: "white", bottom: 5
    },
    Floatplus: {
        fontWeight: "700", fontSize: 50, color: "white", bottom: Platform.OS === "ios" ? 5 : 10
    },
})