
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { MainHeader } from '../../Components';
class TrendScreen extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <MainHeader
        onLeftPress={()=>this.props.navigation.openDrawer()}
        onRightPress={()=> alert('Statistics')}
        right_icon_name={"list"}/>
          <Text >TrendScreen</Text>
        </SafeAreaView>
    ); 
  }
}
const mapStateToProps = ({ home }) => {
  const {

  } = home;
  return {
    
  };
}
export default connect(mapStateToProps, {

})(TrendScreen);