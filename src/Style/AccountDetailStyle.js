import { StyleSheet, Dimensions,Platform } from "react-native";
import {Color } from '../utils/Colors';
export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 6
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: Color.WHITE_COLOR,
  },
  dropDownlist1: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    backgroundColor: 'white',
    borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
  },
  dropDownlist: {
    padding: 12,
    height: 44,
    fontSize: 15,
    justifyContent:"center",
    borderRadius: 3,
    borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,
},
  swiperAmountText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  swiperAccountNameText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton:{
    color : Color.WHITE_COLOR,
    fontSize:28,
    fontWeight:"700",
    height:40,
    width:20,
    marginLeft:10,
    marginRight:10,
  },
  prevButton:{
    color : Color.WHITE_COLOR,
    fontSize:28,
    fontWeight:"700",
    height:40,
    width:20,
    marginLeft:10,
    
  },
  thirdHeaderTransaction: {
    zIndex: -1,
    justifyContent: "space-between",
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    bottom: 5
  },
  backIcon:{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' },
  headerTitleStyle:{
    fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
  },
})