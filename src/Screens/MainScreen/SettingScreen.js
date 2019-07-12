
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { MainHeader } from '../../Components';
import { styles } from '../../Style/SettingStyles'
import { Icon } from "react-native-elements";
import { Color } from '../../utils/Colors'
import {
  settingVisibilityList,
  modalvisibility,
  selected_Money_App_Icon,
  resetModalvisibility,
  onPressItemSelected,
  onPressSelectedItems,
  receiveSettingProps
} from '../../Actions/HomeActions/SettingAction'
class SettingScreen extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.seatedPropsName == "Settings") {
      this.props.receiveSettingProps()
    }
  }
  componentDidMount() {
  }
  onPressSelectedItem = (item) => {
    this.props.settingVisibilityList(false)
    this.props.onPressItemSelected(true)
    this.props.onPressSelectedItems(item.item.select, item.item.key, item.item.icon)
  }
  _render_Item = (item) => {
    return (
      <View key={item.item.key}>
        <TouchableOpacity
          onPress={() => this.onPressSelectedItem(item)}>
          <View
            style={{
              padding: 14,
              backgroundColor: this.props.is_selected ?
                item.item.key == this.props.selected_index ?
                  Color.PRIMARY :
                  Color.WHITE_COLOR :
                Color.WHITE_COLOR,
              flexDirection: 'row'
            }}>
            <Text
              style={{
                marginLeft: 5,
                color: this.props.is_selected &&
                    item.item.key == this.props.selected_index ?
                      Color.WHITE_COLOR : "#000000"
                  
              }}>
              {item.item.icon}{" "}{"-"}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: this.props.is_selected && item.item.key == this.props.selected_index ? Color.WHITE_COLOR : "#000000"
              }}>
              {item.item.select}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
  _renderDisplayList = () => {
    return (
      <View>
        {
          this.props.is_displaylist ?
            <View style={{ width: "100%", height: 135, borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, zIndex: 1, position: "absolute", backgroundColor: 'white' }}>
              <ScrollView>
                <FlatList
                  extraData={this.props.selected_index}
                  data={this.props.data}
                  renderItem={this._render_Item}
                  keyExtractor={item => item.key.toString()}
                  ItemSeparatorComponent={this.renderSeparator}
                /></ScrollView>
            </View>
            :
            <View></View>
        }
      </View>
    )
  }
  onPressListDisplay = () => {
    this.props.settingVisibilityList(true)
  }
  modalVisible = () => {
    this.props.modalvisibility(true)
  }
  generateData = () => {
    this.props.modalvisibility(false)
    const { navigation } = this.props;
    this.props.selected_Money_App_Icon(this.props.selected_icon, navigation)
  }
  generateDataDialogOpen = () => {
    return (
      <ConfirmDialog
        visible={this.props.is_dialog_visible}
        title="Generate data"
        message="Do you want to generate data?"
        positiveButton={{
          title: "OK",
          onPress: () => this.generateData()
        }}
        negativeButton={{
          title: "CANCLE",
          onPress: () => this.props.modalvisibility(false)
        }}
        onTouchOutside={() => this.props.modalvisibility(false)}
      />
    )
  }
  resetData = () => {
    this.props.resetModalvisibility(false)
    const { navigation } = this.props;
    this.props.selected_Money_App_Icon("$", navigation)
    this.props.navigation.navigate("Home")
  }
  resetDataDialogOpen = () => {
    return (
      <ConfirmDialog
        visible={this.props.is_reset_dialog_visible}
        title="Reset data"
        message="Do you want to return to the original state and delete all data?"
        positiveButton={{
          title: "OK",
          onPress: () => this.resetData()
        }}
        negativeButton={{
          title: "CANCLE",
          onPress: () => this.props.resetModalvisibility(false)
        }}
        onTouchOutside={() => this.props.resetModalvisibility(false)}
      />
    )
  }
  resetModalVisible = () => {
    this.props.resetModalvisibility(true)
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}  >
        <MainHeader onLeftPress={() => this.props.navigation.openDrawer()} />
        <View style={{ flex: 1, marginTop: 10, marginLeft: 10, marginRight: 10, }} onStartShouldSetResponder={(evt) => this.props.settingVisibilityList(false)}>
          <View>
            <Text>Choose a currency</Text>
          </View>
          <View style={{ marginTop: 10 }} onStartShouldSetResponder={(evt) => this.props.settingVisibilityList(false)}>
            <TouchableOpacity onPress={() => this.onPressListDisplay()}>
              <View style={[styles.dropDownlist, { borderColor: this.props.is_selected ? Color.PRIMARY : Color.LIGHT_FONT_COLOR }]}>
                <Text style={{ color: "black", marginLeft: 10 }}>{this.props.selected_icon}{" -"}{" "}{this.props.selected_name}</Text>
                <Icon name="chevron-right" color={Color.LIGHT_FONT_COLOR} />
              </View>
            </TouchableOpacity>
            {this._renderDisplayList()}
          </View>
          <View style={{ flexDirection: "row", zIndex: -1, marginTop: 10, height: 35, justifyContent: 'space-around' }} onStartShouldSetResponder={(evt) => this.props.settingVisibilityList(false)}>
            <TouchableWithoutFeedback onPress={() => this.modalVisible()}>
              <View style={{ flex: 1, backgroundColor: Color.PRIMARY, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Text style={{ fontWeight: "700", color: "white" }}>Generate data</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.resetModalVisible()}>
              <View style={{ flex: 1, backgroundColor: Color.RED_COLOR, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                <Text style={{ fontWeight: "700", color: "white" }}>Reset data</Text>
              </View>
            </TouchableWithoutFeedback>
            {this.generateDataDialogOpen()}
            {this.resetDataDialogOpen()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({ settings }) => {
  const {
    is_displaylist,
    is_dialog_visible,
    is_reset_dialog_visible,
    data,
    is_selected,
    selected_index,
    selected_name,
    selected_icon,
    seatedPropsName,
    seatedPropsKey
  } = settings;
  return {
    is_displaylist,
    is_dialog_visible,
    is_reset_dialog_visible,
    data,
    is_selected,
    selected_index,
    selected_name,
    selected_icon,
    seatedPropsName,
    seatedPropsKey
  };
}
export default connect(mapStateToProps, {
  settingVisibilityList,
  modalvisibility,
  selected_Money_App_Icon,
  resetModalvisibility,
  onPressItemSelected,
  onPressSelectedItems,
  receiveSettingProps
})(SettingScreen);