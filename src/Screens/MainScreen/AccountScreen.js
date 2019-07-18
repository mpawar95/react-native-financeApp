
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MainHeader } from '../../Components';
import { Color } from '../../utils/Colors';
import { styles } from '../../Style/AccountStyle';
import {
  accountListFetch,
  accountScreenLoad,
  receivePropsAccountLoad
} from '../../Actions';

class AccountScreen extends Component {
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(newProps) {
    if (newProps.seatedPropsName == "Acconts") {
      this.props.receivePropsAccountLoad()
      this.props.accountScreenLoad()
      this.props.accountListFetch()
    }
  }
  componentDidMount() {
    this.props.accountScreenLoad()
    this.props.accountListFetch()
  }
  _renderItem = ({ item }) => {
    if(item.account_name == "plusIcon"){
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("AddNewAccount", { totalAmount: this.props.totalAmount })}>
            <View
              style={{
                width: 100,
                height: 100,
                margin: 5,
                borderRadius: 6,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#d4d6d4",
                borderStyle: "dashed"
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 60, color: "#d4d6d4" }}>+</Text></View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: "#d4d6d4" }}>Add an Account</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    } 
    else{
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("EditAccount", { item: item, totalAmount: this.props.totalAmount })}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 6,
                alignSelf: "center",
                margin: 5,
                justifyContent: 'space-evenly',
                backgroundColor: item.selected_color_icon
              }}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}</Text>
                <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>{item.initial_balance}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: "white", fontWeight: "700" }}>{item.account_name}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          
        </View>
      )
    }
}
_onRefresh=()=>{
  this.props.accountScreenLoad()
  this.props.accountListFetch()
}
renderFlatList = () => {
  return (
    this.props.account_list ?
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList
          extraData={this.props}
          data={this.props.account_list}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          refreshing={this.props.refreshing}
          onRefresh={this._onRefresh}
        />
      </View>
      : <View></View>
  )
}
render() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader
        onLeftPress={() => this.props.navigation.openDrawer()}
        onRightPress={() => this.props.navigation.navigate("Transfer")}
        is_right_icon_visible={true}
        right_icon_name={"transform"}
      />
      <View style={styles.secondHeader}>
        <Text style={{ justifyContent: 'flex-start' }}>Accounts</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ justifyContent: 'flex-end' }}>Total:</Text>
          <Text style={{ color: Color.PRIMARY, fontWeight: "500" }}>{" "}+ {"  "}{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{this.props.totalAmount}</Text>
        </View>
      </View>
      
        <View style={{ flex:1,backgroundColor: Color.BACKGROUND_COLOR }}>
          {this.renderFlatList()}
        </View>
      
    </SafeAreaView>
  );
}
}
const mapStateToProps = ({ account }) => {
  const {
    account_list,
    error,
    totalAmount,
    selected_money_icon,
    account_list_count,
    seatedPropsName,
    seatedPropsKey,
    refreshing
  } = account;
  return {
    account_list,
    error,
    totalAmount,
    selected_money_icon,
    account_list_count,
    seatedPropsName,
    seatedPropsKey,
    refreshing
  };
}
export default connect(mapStateToProps, {
  accountListFetch,
  accountScreenLoad,
  receivePropsAccountLoad
})(AccountScreen);