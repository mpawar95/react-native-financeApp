import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  AsyncStorage  
} from 'react-native';

import { Color } from '../../utils/Colors';
import { SafeAreaView } from 'react-navigation';

class LoadingScreen extends Component {
  constructor(props){
    super(props)
    this._screenLoad();
  }
  _screenLoad = async () => {
    try {
      const is_visited = await AsyncStorage.getItem('is_visited')
      if (JSON.stringify(is_visited)) {
        this.props.navigation.navigate(is_visited ? "Main" : "Intro")
      }
    } catch (error) {
      console.log("AsyncStorage error");
    }
  }
  render() {
    return(
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex:1,justifyContent:'center',alignItems:'center', flexDirection:"row"}}>
          <Text style={{ fontWeight: '700', color: "#000000", fontSize: 24 }}>Peri</Text>
          <Text style={{ fontWeight: '700', color: Color.PRIMARY, fontSize: 24 }}>Fy</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default LoadingScreen;