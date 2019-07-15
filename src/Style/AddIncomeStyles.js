import { StyleSheet, Platform } from "react-native";
import { Color } from '../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  navigationTitle: {
    fontSize: 17, justifyContent: 'center', color: "#636863"
  },
  centerTextView: {
    flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
  },
  plusIcon: {
    fontWeight: "700", fontSize: 24, color: "white"
  },
  dollarIcon: {
    fontWeight: "700", fontSize: 20, color: "white", marginLeft: 5
  },
  textView:{
    fontSize:20,fontWeight:"700",color:"white"
  },
  backIcon:{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' },
  headerTitleStyle:{
    fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
  }
})