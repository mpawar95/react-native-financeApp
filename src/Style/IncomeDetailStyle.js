import { StyleSheet, Platform } from "react-native";
import { Color } from '../utils/Colors';

export const styles = StyleSheet.create({
      subHeader: {
            flex: 3, backgroundColor: Color.BACKGROUND_COLOR
      },
      viewStyle: {
            width: "100%", height: 44, backgroundColor: "white", marginTop: 5, borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, borderRadius: 3
      },
      viewMoney: {
            fontWeight: "700", fontSize: 20, color: Color.PRIMARY
      },
      plusIcon: {
            fontWeight: "700",
            fontSize: 24,
            color: Color.PRIMARY
      },
      categoryItem: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flex: 1
      },
      accountlist: {
            height: 150, width: "100%", borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, zIndex: 1, position: "absolute", backgroundColor: 'white'
      },
      headerTextStyle:{
            fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
      },
      backIcon:{
            height: 40, width: 40, alignContent: 'center', justifyContent: 'center'
      }
})