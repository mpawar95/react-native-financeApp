
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import { Icon } from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown';
import {
  accountDetailScreenLoad,
  accountDetailListFetch,
  accountDetailFlatListVisibility,
  accountDetailGetDate,
  accountDetailGetIncome,
  deleteAccountDetial,
  setOnAccountDetailUnFavorite,
  setOnAccountDetailFavorite,
  accountScreenDatePickerDialogVisible,
  onPressSelectedItem,
  onPressSelectedName,
  selectAccountDetailDateRange,
  setNextAccountName,
  setPreviousAccountName
} from '../../Actions';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import { styles } from '../../Style/AccountDetailStyle'
import { SwipeRow } from 'native-base';
import { Color } from '../../utils/Colors';
import { convertDateForUI, convertTimeForUI, convertDate, convertMyDate } from '../../utils/DateFormate'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import CalendarPicker from 'react-native-calendar-picker';
import {
  today,
  yesterday,
  from_month,
  to_month,
  from_week,
  to_week,
  from_year,
  to_year
} from '../../utils/DateFormate';
class AccountDetailScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    }
    this.selectedRow = undefined;
    this.component = {};
    this.onDateChange = this.onDateChange.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    const navigator = navigation.getParam("navigator")
    return {
      headerLeft: (
        <Ripple onPress={() => navigator.pop()}>
          <View style={{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{}}>
              <Icon name="arrow-back" size={22} />
            </View>
          </View>
        </Ripple>
      ),
      title: "Account Detail",
      headerTitleStyle: {
        fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
      },
    }
  }
  componentDidUpdate() {

  }
  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    this.props.navigation.setParams({ navigator: navigation })
    this.props.accountDetailListFetch()
    this.props.accountDetailScreenLoad()
    this.props.accountDetailGetIncome(item.item.account_name, convertMyDate(today), convertMyDate(today))
    this.props.accountDetailGetDate({ prop: "today" })
  }
  onPressListDisplay = () => {
    this.props.accountDetailFlatListVisibility(true)
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
  handleList = (selected_name) => {
    if (selected_name == "Week") {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(from_week), convertMyDate(to_week))
    }
    else if (selected_name == "Month") {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(from_month), convertMyDate(to_month))
    }
    else if (selected_name == "Year") {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(from_year), convertMyDate(to_year))
    }
  }
  onPressSelectedItem = (item) => {
    this.props.accountDetailFlatListVisibility(false)
    this.props.onPressSelectedItem(true)
    this.props.onPressSelectedName(item.item.select, item.item.key)
    this.props.selectAccountDetailDateRange("")
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null,
    }, () => {
      this.handleList(this.props.selectedFlatListName)
    })
  }
  _render_Item = (item) => {
    return (
      <View key={item.item.key}>
        <TouchableOpacity onPress={() => this.onPressSelectedItem(item)}>
          <View style={{ padding: 14, backgroundColor: this.props.is_selected ? item.item.key == this.props.selectedFlatListIndex ? Color.PRIMARY : Color.WHITE_COLOR : Color.WHITE_COLOR }}>
            <Text style={{ marginLeft: 5, color: this.props.is_selected ? item.item.key == this.props.selectedFlatListIndex ? Color.WHITE_COLOR : "black" : "black" }}>{item.item.select}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  _renderDisplayList = () => {

    return (
      <View>
        {
          this.props.is_displaylist ?
            <View style={{ width: "100%", borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, zIndex: 1, position: "relative", backgroundColor: 'white' }}>
              <ScrollView>
                <FlatList
                  extraData={this.props.selectedFlatListIndex}
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

  onPressItem = (prop) => {
    this.props.accountDetailFlatListVisibility(false)
    this.props.accountDetailGetDate(prop)
    if (prop.prop == "today") {
      this.refs.dropdown_2.select(-1);
      this.props.onPressSelectedItem(false)
      this.props.onPressSelectedName("", "")
      this.props.selectAccountDetailDateRange("")
      this.setState({
        selectedStartDate: null,
        selectedEndDate: null,
      }, () => {
        this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(today), convertMyDate(today))
      })
    } else {
      this.refs.dropdown_2.select(-1);
      this.props.onPressSelectedItem(false)
      this.props.onPressSelectedName("", "")
      this.props.selectAccountDetailDateRange("")
      this.setState({
        selectedStartDate: null,
        selectedEndDate: null,
      }, () => {
        this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(yesterday), convertMyDate(yesterday))
      })
    }
  }
  datePickerDialog = () => {
    this.props.accountScreenDatePickerDialogVisible(true)
    this.props.accountDetailFlatListVisibility(false)
  }

  onSelect = (index, value) => {
    this.props.onPressSelectedItem(true)
    this.props.onPressSelectedName(value, index)
    this.props.selectAccountDetailDateRange("")
    if (value == "Week") {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(from_week), convertMyDate(to_week))
    }
    else if (value == "Month") {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(from_month), convertMyDate(to_month))
    }
    else if (value == "Year") {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(from_year), convertMyDate(to_year))
    }
  }
  selectionList = () => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {/* <TouchableOpacity onPress={() => this.onPressListDisplay()}>
            <View style={[styles.dropDownlist1, { borderColor: this.props.is_selected ? Color.PRIMARY : Color.LIGHT_FONT_COLOR }]}>
              <Text style={{ color: this.props.is_selected ? "black" : Color.LIGHT_FONT_COLOR, marginLeft: 10 }}>{this.props.is_selected ? this.props.selectedFlatListName : "Select"}</Text>
              <Icon name="chevron-right" color={Color.LIGHT_FONT_COLOR} />
            </View>
          </TouchableOpacity>
          {this._renderDisplayList()} */}
          <ModalDropdown
            ref="dropdown_2"
            defaultValue="Select"
            defaultIndex={-1}
            options={this.props.data}
            textStyle={[styles.dropDownlist, {
              color: this.props.is_selected ? "#000000" : Color.LIGHT_FONT_COLOR,
              borderColor: this.props.is_selected ? Color.PRIMARY : Color.LIGHT_FONT_COLOR
            }]}
            dropdownStyle={{ width: 93, height: 133, }}
            dropdownTextStyle={{ color: Color.LIGHT_FONT_COLOR, fontSize: 15, height: 44 }}
            dropdownTextHighlightStyle={{ backgroundColor: Color.PRIMARY, color: this.props.is_selected ? Color.WHITE_COLOR : Color.LIGHT_FONT_COLOR }}
            onSelect={(index, value) => this.onSelect(index, value)}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', marginLeft: 20 }}>
          <Ripple onPress={() => this.onPressItem({ prop: "today" })}>
            <View style={{ flexDirection: "row", width: "100%", height: 44, backgroundColor: this.props.selectedDate ? "white" : this.props.is_selected ? "white" : this.props.is_today ? Color.PRIMARY : 'white', borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, borderRadius: 3, justifyContent: 'center', alignItems: 'center', borderColor: this.props.selectedDate ? Color.LIGHT_FONT_COLOR : this.props.is_selected ? Color.LIGHT_FONT_COLOR : this.props.is_today ? Color.PRIMARY : Color.LIGHT_FONT_COLOR }}>
              <Text style={{ color: this.props.selectedDate ? Color.LIGHT_FONT_COLOR : this.props.is_selected ? Color.LIGHT_FONT_COLOR : this.props.is_today ? Color.WHITE_COLOR : Color.LIGHT_FONT_COLOR }}>Today</Text>
            </View>
          </Ripple>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', marginLeft: 20 }}>
          <Ripple onPress={() => this.onPressItem({ prop: "yesterday" })}>
            <View style={{ flexDirection: "row", width: "100%", height: 44, backgroundColor: this.props.selectedDate ? "white" : this.props.is_selected ? "white" : this.props.is_yesterday ? Color.PRIMARY : 'white', borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, borderRadius: 3, justifyContent: 'center', alignItems: 'center', borderColor: this.props.selectedDate ? Color.LIGHT_FONT_COLOR : this.props.is_selected ? Color.LIGHT_FONT_COLOR : this.props.is_yesterday ? Color.PRIMARY : Color.LIGHT_FONT_COLOR }}>
              <Text style={{ color: this.props.selectedDate ? Color.LIGHT_FONT_COLOR : this.props.is_selected ? Color.LIGHT_FONT_COLOR : this.props.is_yesterday ? Color.WHITE_COLOR : Color.LIGHT_FONT_COLOR }}>Yesterday</Text>
            </View>
          </Ripple>
        </View>
        <View style={{ backgroundColor: 'white', marginLeft: 10 }}>
          <TouchableOpacity >
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Icon name="perm-contact-calendar" color={this.props.selectedDate ? Color.PRIMARY : Color.LIGHT_FONT_COLOR} size={26}
                onPress={this.datePickerDialog} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  onUnFavoritePress = (item) => {
    this.props.setOnAccountDetailUnFavorite(item)
  }
  onFavoritePress = (item) => {
    this.props.setOnAccountDetailFavorite(item)
  }
  onDeleteItem = (item) => {
    this.props.deleteAccountDetial(item.item.id)
  }
  _renderDataList = (item) => {
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          item.item.is_favourite ?
            <View style={{ backgroundColor: "#c6a51d", height: "100%", justifyContent: 'center', alignContent: 'center' }}>
              <TouchableWithoutFeedback onPress={() => this.onUnFavoritePress(item)}>
                <Icon name="star" color="white" />
              </TouchableWithoutFeedback>
            </View>
            :
            <View style={{ backgroundColor: Color.LIGHT_FONT_COLOR, height: "100%", justifyContent: 'center', alignContent: 'center' }}>
              <TouchableWithoutFeedback onPress={() => this.onFavoritePress(item)}>
                <Icon name="star" color="white" />
              </TouchableWithoutFeedback>
            </View>
        }
        right={
          <View style={{ backgroundColor: Color.RED_COLOR, height: "100%", justifyContent: 'center', alignContent: 'center' }}>
            <TouchableWithoutFeedback onPress={() => this.onDeleteItem(item)}>
              <Icon name="delete" color="white" />
            </TouchableWithoutFeedback>
          </View>
        }
        body={
          <Ripple
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.navigate("EditIncomeDetail", { item: item.item })}
          >
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }} key={item.item.id}>
              <View style={{ flexDirection: "row", marginTop: -5, marginBottom: -5 }}>
                <View style={{ margin: 5, height: 35, width: 35, borderRadius: 35 / 2, backgroundColor: item.item.icon_color }}></View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ color: "black", }}>{item.item.categoryName}</Text>
                  <Text style={{ color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop: 3, }}>{item.item.accountName}</Text>
                  <Text style={{ color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop: 3, fontWeight: "500", fontSize: 12 }}>{convertTimeForUI(item.item.time)} {"|"} {convertDateForUI(item.item.createdOnDate)}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ color: item.item.is_expance ? Color.RED_COLOR : item.item.is_income ? Color.PRIMARY : item.item.is_transfer ? Color.LIGHT_FONT_COLOR : Color.PRIMARY, fontSize: 18, fontWeight: "700" }}>{
                  item.item.is_expance ? "- "
                    :
                    item.item.is_income ? "+ "
                      :
                      ""
                }{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{item.item.newIncome}</Text>
              </View>
            </View>
          </Ripple>
        }
      />
    )
  }
  pageChanged = (index) => {
    console.log("page chagned", index)
  }
  previousPage = (index, item) => {
    // console.log("Previous", index)
    // console.log("Previous", item.account_name)
    this.props.setPreviousAccountName(item.account_name)
    this.setState({
    }, () => {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(today), convertMyDate(today))
      this.viewPager.setPage(index - 1)
    })

  }
  nextPage = (index, item) => {
    // console.log("next", index)
    // console.log("next", item.account_name)
    this.props.setNextAccountName(item.account_name)
    this.setState({
    }, () => {
      this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(today), convertMyDate(today))
      this.viewPager.setPage(index + 1)
    })

  }
  onDateChange(date, type) {
    this.props.onPressSelectedName("", "")
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }
  selectRange = (startDate, endDate) => {
    this.props.accountScreenDatePickerDialogVisible(false)
    this.props.onPressSelectedItem(false)
    this.props.onPressSelectedName("", "")
    this.props.selectAccountDetailDateRange(convertDateForUI(startDate) + " - " + convertDateForUI(endDate))
    this.props.accountDetailGetIncome(this.props.selectedItem, convertMyDate(startDate), convertMyDate(endDate))
  }
  renderDatePickerDialog = () => {
    const { selectedStartDate, selectedEndDate } = this.state;
    const maxDate = convertDate(today);
    const startDate = selectedStartDate ? selectedStartDate.toString() : convertDate(today);
    const endDate = selectedEndDate ? selectedEndDate.toString() : convertDate(today);
    return (
      <Dialog
        visible={this.props.dialogVisible}
        onTouchOutside={() => this.props.accountScreenDatePickerDialogVisible(false)} >
        <CalendarPicker
          width={350}
          startFromMonday={true}
          allowRangeSelection={true}
          maxDate={maxDate}
          todayBackgroundColor={Color.LIGHT_FONT_COLOR}
          selectedDayColor={Color.PRIMARY}
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TouchableWithoutFeedback onPress={() => this.props.accountScreenDatePickerDialogVisible(false)}>
              <Text style={{ color: Color.RED_COLOR, margin: 5 }}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
              this.selectRange(startDate, endDate)
              this.refs.dropdown_2.select(-1);
            }}>
              <Text style={{ color: Color.PRIMARY, margin: 5 }}>Done</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Dialog>
    )
  }
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const week = convertDateForUI(from_week) + " - " + convertDateForUI(to_week);
    const month = convertDateForUI(from_month) + " - " + convertDateForUI(to_month);
    const year = convertDateForUI(from_year) + " - " + convertDateForUI(to_year);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ margin: 10, height: 150, }}>
          <IndicatorViewPager
            ref={viewPager => { this.viewPager = viewPager; }}
            keyboardDismissMode="none"
            horizontalScroll={true}
            initialPage={item.index}
            onPageSelected={(index, items) => this.pageChanged(index, items)}
            pageMargin={20}
            style={{ flex: 1 }}>
            {
              this.props.accont_list.map((items, index) => {
                return (
                  <View style={[styles.slide1, { backgroundColor: items.selected_color_icon, flexDirection: 'row', justifyContent: 'space-between', }]} key={items.id}>
                    <Text style={styles.nextButton} onPress={() => this.previousPage(index, items)}>‹</Text>
                    <View style={[styles.slide1, { backgroundColor: items.selected_color_icon, flexDirection: 'column' }]} key={items.id}>
                      <View style={{ top: 10 }}>
                        <Text style={styles.swiperAmountText}>{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{items.initial_balance}</Text>
                      </View>
                      <View style={{ top: 40 }}>
                        <Text style={styles.swiperAccountNameText}>{items.account_name}</Text></View>
                    </View>
                    <Text style={styles.prevButton} onPress={() => this.nextPage(index, items)}>›</Text>
                  </View>
                )
              })
            }
          </IndicatorViewPager>
        </View>
        {this.renderSeparator()}
        <View style={{ zIndex: -1 }} onStartShouldSetResponder={(evt) => this.props.accountDetailFlatListVisibility(false)}>
          {this.selectionList()}
          <View style={styles.thirdHeaderTransaction}>
            <Text>Transaction</Text>
            <Text>{
              this.props.selectedFlatListName == "Week" ? week :
                this.props.selectedFlatListName == "Month" ? month :
                  this.props.selectedFlatListName == "Year" ? year :
                    this.props.selectedDate ? this.props.selectedDate :
                      this.props.is_yesterday ? convertDateForUI(this.props.date) :
                        this.props.date
            }
            </Text>
          </View>
          {this.renderSeparator()}
        </View>
        {this.renderDatePickerDialog()}
        <View style={{ flex: 1 }} onStartShouldSetResponder={(evt) => this.props.accountDetailFlatListVisibility(false)}>

          <FlatList
            data={this.props.income_list}
            renderItem={this._renderDataList}
            extraData={this.props}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              (
                this.props.income_list == null ?
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <Image source={require('../../../assets/images/cart-512.png')} style={{ width: 200, height: 200 }} />
                  </View>
                  : <View></View>
              )
            }
          />
        </View>

      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({ accountDetail }) => {
  const {
    selected_money_icon,
    accont_list,
    is_displaylist,
    date,
    is_today,
    is_yesterday,
    income_list,
    dialogVisible,
    is_selected,
    selectedFlatListName,
    selectedFlatListIndex,
    data,
    selectedDate,
    selectedItem
  } = accountDetail;
  return {
    selected_money_icon,
    accont_list,
    is_displaylist,
    date,
    is_today,
    is_yesterday,
    income_list,
    dialogVisible,
    is_selected,
    selectedFlatListName,
    selectedFlatListIndex,
    data,
    selectedDate,
    selectedItem
  };
}

export default connect(mapStateToProps, {
  accountDetailScreenLoad,
  accountDetailListFetch,
  accountDetailFlatListVisibility,
  accountDetailGetDate,
  accountDetailGetIncome,
  deleteAccountDetial,
  setOnAccountDetailUnFavorite,
  setOnAccountDetailFavorite,
  accountScreenDatePickerDialogVisible,
  onPressSelectedItem,
  onPressSelectedName,
  selectAccountDetailDateRange,
  setNextAccountName,
  setPreviousAccountName
})(AccountDetailScreen);

