
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MainHeader } from '../../Components';
class TrendScreen extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MainHeader
          onLeftPress={() => this.props.navigation.openDrawer()}
          onRightPress={() => alert('Statistics')}
          right_icon_name={"list"} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          <Text>TrendScreen</Text>
        </View>
        </SafeAreaView>
    ); 
  }
}

export default (TrendScreen);