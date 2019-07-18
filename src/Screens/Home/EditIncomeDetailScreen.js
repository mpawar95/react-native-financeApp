
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from "react-native-elements";
import { MainHeader } from '../../Components';
import { Color } from '../../utils/Colors';
import { convertDateForUI, convertTimeForUI } from '../../utils/DateFormate'
import { EditIncomeScreenLoad } from '../../Actions'
import Ripple from 'react-native-material-ripple';
import {styles} from '../../Style/IncomeDetailStyle'
class EditIncomeDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const navigator = navigation.getParam("navigator")
    const item = navigation.getParam("item")
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <Ripple onPress={() => navigator.pop()}>
          <View style={styles.backIcon}>
            <Icon name="arrow-back" size={22} />
          </View>
        </Ripple>
      ),
      headerRight: (
        <TouchableWithoutFeedback onPress={() => params.onEditPress()}>
          <View style={{ marginRight: 5, }}>
            <Text style={{ color: Color.PRIMARY }}>{item.is_income ? "Edit" : item.is_expance ? "Edit" : null}</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      title: "Income Detail",
      headerTitleStyle: styles.headerTextStyle
    }
  }
  componentDidMount() {
    this.props.EditIncomeScreenLoad()
    const { navigation } = this.props;
    const item = this.props.navigation.getParam("item")
    this.props.navigation.setParams({ navigator: navigation, item: item, onEditPress: this.handleEdit })
  }
  handleEdit = () => {
    const item = this.props.navigation.getParam("item")
    if (item.is_income) {
      this.props.navigation.navigate("AddIncome", { item: item })
    } else {
      this.props.navigation.navigate("AddExpence", { item: item })
    }
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginTop: 10,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
  render() {
    const item = this.props.navigation.getParam("item")
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 150, backgroundColor: item.icon_color, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="home" color="white" size={40} />
        </View>
        <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "black", fontWeight: "500", marginTop: 10 }}>{item.categoryName}</Text>
            <Text style={{ color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop: 3 }}>{item.is_transfer ? item.newDescription : item.accountName }</Text>
            <Text style={{ color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop: 3, fontWeight: "500", fontSize: 12 }}>{convertTimeForUI(item.time)} {"|"} {convertDateForUI(item.createdOnDate)}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{
              color: item.is_expance ? Color.RED_COLOR :
                item.is_income ? Color.PRIMARY :
                  item.is_transfer ? Color.LIGHT_FONT_COLOR :
                    Color.PRIMARY,
              fontSize: 18,
              fontWeight: "700"
            }}
            >
              {item.is_expance ? "- " : item.is_income ? "+ " : ""}{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{item.newIncome}
            </Text>
          </View>
        </View>
        {this.renderSeparator()}
        <View style={{ flex: 1, marginTop: 10, marginLeft: 10, marginRight: 10, flexDirection: 'column' }}>
          <Text style={{ fontWeight: "500", color: "black" }}>{item.Notes === "" ? null : "Notes"}</Text>
          <Text style={{ marginTop: 10, color: Color.LIGHT_FONT_COLOR }}>{item.Notes}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({ editIncome }) => {
  const {
    selected_money_icon
  } = editIncome;
  return {
    selected_money_icon
  };
}
export default connect(mapStateToProps, {
  EditIncomeScreenLoad
})(EditIncomeDetailScreen);