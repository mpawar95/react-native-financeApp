
import React from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import moment from "moment";
import { SwipeRow } from 'native-base';
import { Icon } from "react-native-elements";
import { SafeAreaView , DrawerActions} from 'react-navigation';
import { MainHeader } from '../../Components';
import { Color } from '../../utils/Colors';
import { styles } from '../../Style/homeStyle';
import ActionButton from 'react-native-action-button';
import { convertDateForUI, convertTimeForUI, convertMyDate, convertDate } from '../../utils/DateFormate'
import Ripple from 'react-native-material-ripple';
import { Dialog } from 'react-native-simple-dialogs';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  homeAccountListFetch,
  getDate,
  getIncome,
  setOnFavorite,
  deleteIncomeDetial,
  setOnUnFavorite,
  homeScreenLoad,
  datePickerDialogVisible,
  onPressFlatListItem,
  selectDateRange,
  onPressSelectedFlatListName,
  receivePropsHomeLoad
} from '../../Actions';
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
import CalendarPicker from 'react-native-calendar-picker';
class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    },
    this.component = [];
    this.selectedRow;
    this.onDateChange = this.onDateChange.bind(this);
  }
  componentWillReceiveProps(newProps){
      if(newProps.seatedPropsName == "Home"){
        this.props.receivePropsHomeLoad()
        this.props.homeAccountListFetch()
        this.props.getDate({ prop: "today" })
        this.props.getIncome(convertMyDate(today), convertMyDate(today))
        this.props.homeScreenLoad()
      }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  goBack=()=>{

  }
  handleBackPress = () => {
    BackHandler.exitApp()
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.props.homeAccountListFetch()
    this.props.getDate({ prop: "today" })
    this.props.getIncome(convertMyDate(today), convertMyDate(today))
    this.props.homeScreenLoad()
  }
  _renderItem = (item) => {

    return (
      <View key={item.item.id}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("AccountDetail", { item: item })}>
          <View
            style={{
              // flex:1,
              width: 100,
              height: 100,
              borderRadius: 6,
              alignSelf: "center",
              marginLeft: 8,
              marginRight: 10,
              marginTop: 10,
              justifyContent: 'space-around',
              backgroundColor: item.item.selected_color_icon
            }}
          >
            <View style={styles.firstFlatListViewStyle}>
              <Text style={styles.commonFlatListDollar}>{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{item.item.initial_balance}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.commonFlatListDollar}>{item.item.account_name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  renderFlatList = () => {
    return (
      this.props.account_list ?
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          extraData={this.props}
          data={this.props.account_list}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
        />
        : <View></View>
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          zIndex: -1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
  

  onPressItem = (prop) => {
    
    this.props.getDate(prop)
    if (prop.prop == "today") {
      this.component = {};
      this.selectedRow = undefined;
      this.refs.dropdown_2.select(-1);
      this.props.getIncome(convertMyDate(today), convertMyDate(today))
      this.props.onPressFlatListItem(false)
      this.props.selectDateRange("")
      this.props.onPressSelectedFlatListName("", "")
      this.setState({
        selectedStartDate: null,
        selectedEndDate: null,
      })
    } else {
      this.component = {};
      this.selectedRow = undefined;
      this.refs.dropdown_2.select(-1);
      this.props.getIncome(convertMyDate(yesterday), convertMyDate(yesterday))
      this.props.onPressFlatListItem(false)
      this.props.selectDateRange("")
      this.props.onPressSelectedFlatListName("", "")
      this.setState({
        selectedStartDate: null,
        selectedEndDate: null,
      })
    }
  }
  datePickerDialog = () => {
    this.props.datePickerDialogVisible(true)
  }
  onSelect=(index, value)=>{
    this.component = {};
    this.selectedRow = undefined;
    this.props.onPressFlatListItem(true)
    this.props.onPressSelectedFlatListName(value, index)
    this.props.selectDateRange("")
    if (value == "Week") {
      this.props.getIncome(convertMyDate(from_week), convertMyDate(to_week))
    }
    else if (value == "Month") {
      this.props.getIncome(convertMyDate(from_month), convertMyDate(to_month))
    }
    else if (value == "Year") {
      this.props.getIncome(convertMyDate(from_year), convertMyDate(to_year))
    }
  }
  selectionList = () => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ModalDropdown
            ref="dropdown_2"
            defaultValue="Select"
            defaultIndex={-1}
            options={this.props.data}
            textStyle={[styles.dropDownlist,{
              color: this.props.is_selected ? "#000000" : Color.LIGHT_FONT_COLOR,
              borderColor: this.props.is_selected ? Color.PRIMARY : Color.LIGHT_FONT_COLOR
            }]}
            dropdownStyle={{ width:Platform.OS === "ios" ? 93 : 77, height: 133, }}
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
    this.selectedRow._root.closeRow()
    this.component = {};
    this.selectedRow = undefined;
    this.props.setOnUnFavorite(item)
  }
  onFavoritePress = (item) => {
    this.selectedRow._root.closeRow()
    this.component = {};
    this.selectedRow = undefined;
    this.props.setOnFavorite(item)
  }
  onDeleteItem = (item) => {
    this.selectedRow._root.closeRow()
    this.component = {};
    this.selectedRow = undefined;
    this.props.deleteIncomeDetial(item)
    
  }
  _renderDataList = (item) => {
    return (
      <SwipeRow
        ref={(c) => { this.component[item.item.id] = c }}
        leftOpenValue={75}
        rightOpenValue={-75}
        onRowOpen={() => {
          if ( this.selectedRow && this.selectedRow !== this.component[item.item.id]) 
          { 
            this.selectedRow._root.closeRow(); 
          }
          this.selectedRow = this.component[item.item.id]
        }}
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
            style={{ flex: 1,marginTop:-10,marginBottom:-10 }}
            onPress={() => this.props.navigation.navigate("EditIncomeDetail", { item: item.item })}
          >
            <View style={{ flexDirection: 'row', justifyContent: "space-between",marginTop:5,marginBottom:5}} >
              <View style={{ flexDirection: "row" }}>
                <View style={{ margin: 10, height: 35, width: 35, borderRadius: 35 / 2, backgroundColor: item.item.icon_color }}></View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ color: "black",fontWeight:"500" }}>{item.item.categoryName}</Text>
                  <Text style={{color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop:3 ,}}>{item.item.accountName}</Text>
                  <Text style={{color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop: 3 , fontWeight:"500",fontSize:12}}>{convertTimeForUI(item.item.time)} {"|"} {convertDateForUI(item.item.createdOnDate)}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <Text 
                  style={{ 
                    color: 
                    item.item.is_expance ? Color.RED_COLOR 
                    : 
                    item.item.is_income ? Color.PRIMARY 
                    : 
                    item.item.is_transfer ? Color.LIGHT_FONT_COLOR 
                    : Color.PRIMARY
                    , 
                    fontSize: 18, 
                    fontWeight: "700" 
                  }}>
                  {
                    item.item.is_expance ? "- " 
                    : 
                    item.item.is_income ? "+ " 
                    : 
                     ""
                  }
                  {
                    this.props.selected_money_icon ? this.props.selected_money_icon 
                    : "$"
                  }
                  {
                    item.item.newIncome
                  }
                </Text>
              </View>
            </View>
          </Ripple>
        }
      />
    )
  }
  _onRefresh = () => {
    this.props.homeAccountListFetch()
    this.props.getIncome(convertMyDate(moment().toString()), convertMyDate(moment().toString()))
    this.props.homeScreenLoad()
    this.props.getDate({ prop: "today" })
    this.props.onPressFlatListItem(false)
  }
  onDateChange(date, type) {
    this.component = {};
    this.selectedRow = undefined;
    this.props.onPressSelectedFlatListName("","")
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      })
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      })
    }
  }
  selectRange = (startDate, endDate) => {
    this.props.datePickerDialogVisible(false)
    this.props.onPressFlatListItem(false)
    this.props.selectDateRange(convertDateForUI(startDate) + " - " + convertDateForUI(endDate))
    this.props.getIncome(convertMyDate(startDate), convertMyDate(endDate))
    this.props.onPressSelectedFlatListName("","")
  }
  renderDatePickerDialog = () => {
    const { selectedStartDate, selectedEndDate } = this.state;
    const maxDate = convertDate(today);
    const startDate = selectedStartDate ? selectedStartDate.toString() : convertDate(today);
    const endDate = selectedEndDate ? selectedEndDate.toString() : convertDate(today);
    return (
      <Dialog
        visible={this.props.dialogVisible}
        onTouchOutside={() => this.props.datePickerDialogVisible(false)} >
        <CalendarPicker
          width={350}
          startFromMonday={true}
          allowRangeSelection={true}
          maxDate={maxDate}
          todayBackgroundColor={Color.LIGHT_FONT_COLOR}
          selectedDayColor={Color.PRIMARY}
          selectedDayTextColor={Color.WHITE_COLOR}
          onDateChange={this.onDateChange}
        />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TouchableWithoutFeedback onPress={() => this.props.datePickerDialogVisible(false)}>
              <Text style={{ color: Color.RED_COLOR, margin: 5 }}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {this.selectRange(startDate, endDate)
            this.refs.dropdown_2.select(-1)}}>
              <Text style={{ color: Color.PRIMARY, margin: 5 }}>Done</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Dialog>
    )
  }
 
  render() {
    const week = convertDateForUI(from_week) + " - " + convertDateForUI(to_week);
    const month = convertDateForUI(from_month) + " - " + convertDateForUI(to_month);
    const year = convertDateForUI(from_year) + " - " + convertDateForUI(to_year);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MainHeader
          onLeftPress={() => this.props.navigation.openDrawer()}
          onRightPress={() => this.props.navigation.navigate("Statistics")}
          is_right_icon_visible={true}
          right_icon_name={"pie-chart"}
        />
        <View style={[styles.secondHeader]}>
          <Text style={{ justifyContent: 'flex-start' }}>Accounts</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ justifyContent: 'flex-end' }}>Total:</Text>
            <Text style={{ color: Color.PRIMARY, fontWeight: "500" }}>{" "}+ {"  "}{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{this.props.totalAmount}</Text>
          </View>
        </View>
        <View style={styles.renderFlatList}>
          {this.renderFlatList()}
        </View>
        {this.renderSeparator()}
        <View style={{ zIndex: -1 }} >
          {this.selectionList()}
          <View style={styles.thirdHeaderTransaction}>
            <Text>Transaction</Text>
            <Text>{
              this.props.selectedFlatListName == "Week" ? week :
                this.props.selectedFlatListName == "Month" ? month :
                  this.props.selectedFlatListName == "Year" ? year :
                      this.props.selectedDate ? this.props.selectedDate : this.props.is_yesterday ? convertDateForUI(this.props.date) : this.props.date
            }
            </Text>
          </View>
          {this.renderSeparator()}
        </View>
        {this.renderDatePickerDialog()}
        <View style={{ flex: 1, }}>
          
            <FlatList
              data={this.props.income_list}
              renderItem={this._renderDataList}
              extraData={this.props}
              keyExtractor={item => item.id}
              refreshing={this.props.refreshing}
              onRefresh={this._onRefresh}
              ListEmptyComponent={
                (
                  this.props.income_list == null ?
                    <View style={styles.emptyCartImage}>
                      <Image source={require('../../../assets/images/cart-512.png')} style={{ width: 200, height: 200 }} />
                    </View>
                    : <View></View>
                )
              }
            />
          
        </View>

        <ActionButton buttonColor={Color.PRIMARY} buttonText="+/-">
          <ActionButton.Item buttonColor={Color.RED_COLOR} title="Add Expence" onPress={() => this.props.navigation.navigate("AddExpence")}>
            <Text style={styles.Floatminus}>-</Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor={Color.PRIMARY} title="Add Income" onPress={() => this.props.navigation.navigate("AddIncome")}>
            <View style={{ flex: 1, alignSelf: 'center', }}><Text style={styles.Floatplus}>+</Text></View>
          </ActionButton.Item>
        </ActionButton>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({ home }) => {
  const {
    account_list,
    account_list_count,
    error,
    totalAmount,
    is_displaylist,
    date,
    is_today,
    is_yesterday,
    income_list,
    is_favorite,
    selected_money_icon,
    refreshing,
    dialogVisible,
    is_selected,
    selectedDate,
    data,
    selectedFlatListName,
    selectedFlatListIndex,
    seatedPropsName,
    seatedPropsKey
  } = home;
  return {
    account_list,
    account_list_count,
    error,
    totalAmount,
    is_displaylist,
    date,
    is_today,
    is_yesterday,
    income_list,
    is_favorite,
    selected_money_icon,
    refreshing,
    dialogVisible,
    is_selected,
    selectedDate,
    data,
    selectedFlatListName,
    selectedFlatListIndex,
    seatedPropsName,
    seatedPropsKey
  };
}
export default connect(mapStateToProps, {
  homeAccountListFetch,
  getDate,
  getIncome,
  setOnFavorite,
  deleteIncomeDetial,
  setOnUnFavorite,
  homeScreenLoad,
  datePickerDialogVisible,
  onPressFlatListItem,
  selectDateRange,
  onPressSelectedFlatListName,
  receivePropsHomeLoad
})(HomeScreen);