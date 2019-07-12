import { StyleSheet, Dimensions } from "react-native";
import {Color } from '../utils/Colors';

export const styles = StyleSheet.create({
    ifIOS:{
        flexDirection: 'row', marginLeft: 20, paddingTop: 50, marginBottom: 5 
    },
    isANDROID:{
        flexDirection: 'row', marginLeft: 20, paddingTop: 5, marginBottom: 5 
    },
    titleFirst:{
        fontWeight: '700', color: "#000000", fontSize: 24
    },
    titleSub:{
        fontWeight: '700', color: "#6c9961", fontSize: 24 
    },
    itemSelected:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.DRAWER_COLOR
    },
    itemNotSelected:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    viewHeight:{
        backgroundColor: Color.PRIMARY,
        width: 8,
        height: 50
    },
    withoutHeight:{
        width: 8,
        height: 50
    }
})