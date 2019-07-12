
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import moment from 'moment'
import { SwipeRow } from 'native-base';
import { Icon } from "react-native-elements";
import { Color } from '../../utils/Colors';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { MainHeader } from '../../Components';
import {
  getFavIncome,
  getFavouriteDate,
  visibilityFavList,
  deleteFavouriteItem,
  FavouriteScreenLoad,
  favouriteDateRangePicker,
  onPressFavouriteFlatListItem,
  onPressFavouriteSeletedItem,
  selectedFavouriteRange,
  receivePropsFavouriteLoad
} from '../../Actions'
import { convertDateForUI, convertTimeForUI, convertMyDate, convertDate } from '../../utils/DateFormate'
import { Dialog } from 'react-native-simple-dialogs';
import { styles } from '../../Style/favouriteDetailStyle'
import Ripple from 'react-native-material-ripple';
import CalendarPicker from 'react-native-calendar-picker';
import ModalDropdown from 'react-native-modal-dropdown';
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

class FavouriteScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    }
    this.onDateChange = this.onDateChange.bind(this);
  }
  componentWillReceiveProps(newProps){
    if(newProps.seatedPropsName == "Favorites"){
      this.props.receivePropsFavouriteLoad()
      const today = moment();
      this.props.FavouriteScreenLoad()
      this.props.getFavouriteDate({ prop: "today" })
      this.props.getFavIncome(convertMyDate(today), convertMyDate(today))
    }
  }
  componentDidMount() {
    const today = moment();
    this.props.FavouriteScreenLoad()
    this.props.getFavouriteDate({ prop: "today" })
    this.props.getFavIncome(convertMyDate(today), convertMyDate(today))
  }
  handleList = (selected_name) => {
    if (selected_name == "Week") {
      this.props.getFavIncome(convertMyDate(from_week), convertMyDate(to_week))
    }
    else if (selected_name == "Month") {
      this.props.getFavIncome(convertMyDate(from_month), convertMyDate(to_month))
    }
    else if (selected_name == "Year") {
      this.props.getFavIncome(convertMyDate(from_year), convertMyDate(to_year))
    }
  }
  onPressSelectedItem = (item) => {
    this.props.visibilityFavList(false)
    this.props.selectedFavouriteRange("")
    this.props.onPressFavouriteFlatListItem(true)
    this.props.onPressFavouriteSeletedItem(item.item.select,item.item.key)
    this.setState({
    },
      () => {
        this.handleList(this.props.selectedFlatListName)
      })
  }
  _render_Item = (item) => {
    return (
      <View key={item.item.key}>
        <TouchableOpacity onPress={() => this.onPressSelectedItem(item)}>
          <View style={{ padding: 14, backgroundColor: this.props.is_selected ? item.item.key == this.props.selectedFlatListIndex ? Color.PRIMARY : Color.WHITE_COLOR : "", flexDirection: 'row' }}>
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
  onPressListDisplay = () => {
    this.props.visibilityFavList(true)
  }
  onPressItem = (prop) => {
    this.props.visibilityFavList(false)
    this.props.getFavouriteDate(prop)
    if (prop.prop == "today") {
      this.refs.dropdown_2.select(-1);
      this.props.getFavIncome(convertMyDate(today), convertMyDate(today))
      this.props.onPressFavouriteFlatListItem(false)
      this.props.selectedFavouriteRange("")
      this.props.onPressFavouriteSeletedItem("","")
      this.setState({
        selectedStartDate: null,
        selectedEndDate: null,
      })
    } else {
      this.refs.dropdown_2.select(-1);
      this.props.getFavIncome(convertMyDate(yesterday), convertMyDate(yesterday))
      this.props.onPressFavouriteFlatListItem(false)
      this.props.selectedFavouriteRange("")
      this.props.onPressFavouriteSeletedItem("","")
      this.setState({
        selectedStartDate: null,
        selectedEndDate: null,
      })
    }
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
          width={Platform.OS === "ios" ? 320 : 260}
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
            <TouchableWithoutFeedback onPress={() => this.props.datePickerDialogVisible(false)}>
              <Text style={{ color: Color.RED_COLOR, margin: 5 }}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.selectRange(startDate, endDate)}>
              <Text style={{ color: Color.PRIMARY, margin: 5 }}>Done</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Dialog>
    )
  }
  datePickerDialog = () => {
    
    this.props.favouriteDateRangePicker(true)
  }
  onSelect=(index, value)=>{
    this.props.selectedFavouriteRange("")
    this.props.onPressFavouriteFlatListItem(true)
    this.props.onPressFavouriteSeletedItem(value,index)
    if (value == "Week") {
      this.props.getFavIncome(convertMyDate(from_week), convertMyDate(to_week))
    }
    else if (value == "Month") {
      this.props.getFavIncome(convertMyDate(from_month), convertMyDate(to_month))
    }
    else if (value == "Year") {
      this.props.getFavIncome(convertMyDate(from_year), convertMyDate(to_year))
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
            textStyle={[styles.dropDownlist,{
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
              <Icon name="perm-contact-calendar" color={ this.props.selectedDate ? Color.PRIMARY : Color.LIGHT_FONT_COLOR} size={26}
                onPress={this.datePickerDialog}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  onFavoriteDelete = (item) => {
    this.props.deleteFavouriteItem(item.item.id)
  }
  _renderDataList = (item) => {
      return (
        <View>
          <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            stopLeftSwipe
            right={
              <View style={{ backgroundColor: Color.RED_COLOR, height: "100%", justifyContent: 'center', alignContent: 'center' }}>
                <TouchableWithoutFeedback onPress={() => this.onFavoriteDelete(item)}>
                  <Icon name="delete" color="white" />
                </TouchableWithoutFeedback>
              </View>
            }
            body={
              <View style={{ width: "100%", flexDirection: 'row', justifyContent: "space-between" }} onStartShouldSetResponder={(evt) => this.props.visibilityFavList(false)} >
                <View style={{ flexDirection: "row" ,marginTop:-5,marginBottom:-5}}>
                  <View style={{ margin: 10,  height: 35, width: 35, borderRadius: 35 / 2, backgroundColor: item.item.icon_color }}></View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ color: "black", }}>{item.item.categoryName}</Text>
                    <Text style={{ color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop:3 ,}}>{item.item.accountName}</Text>
                    <Text style={{ color: Color.LIGHT_FONT_COLOR, fontSize: 10, marginTop: 3 , fontWeight:"500",fontSize:12  }}>{convertTimeForUI(item.item.time)} {"|"} {convertDateForUI(item.item.createdOnDate)}</Text>
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
            }
          />
        </View>
      )
  }
  onRefresh = () => {
    const today = moment();
    this.props.getFavouriteDate({ prop: "today" })
    this.props.getFavIncome(convertMyDate(today), convertMyDate(today))
    this.props.onPressFavouriteFlatListItem(false)
    this.setState({
      
    })
  }
  onDateChange(date, type) {
    this.props.onPressFavouriteSeletedItem("","")
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
    this.props.favouriteDateRangePicker(false)
    this.props.onPressFavouriteFlatListItem(false)
    this.props.selectedFavouriteRange(convertDateForUI(startDate) + " - " + convertDateForUI(endDate))
    this.props.getFavIncome(convertMyDate(startDate), convertMyDate(endDate))
    this.props.onPressFavouriteSeletedItem("","")
  }
  renderDatePickerDialog = () => {
    const { selectedStartDate, selectedEndDate } = this.state;
    const maxDate = convertDate(today);
    const startDate = selectedStartDate ? selectedStartDate.toString() : convertDate(today);
    const endDate = selectedEndDate ? selectedEndDate.toString() : convertDate(today);
    return (
      <Dialog
        visible={this.props.dialogVisible}
        onTouchOutside={() => this.props.favouriteDateRangePicker(false)} >
        <CalendarPicker
          width={Platform.OS === "ios" ? 320 : 260}
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
            <TouchableWithoutFeedback onPress={() => this.props.favouriteDateRangePicker(false)}>
              <Text style={{ color: Color.RED_COLOR, margin: 5 }}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {this.selectRange(startDate, endDate)
            this.refs.dropdown_2.select(-1);}}>
              <Text style={{ color: Color.PRIMARY, margin: 5 }}>Done</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Dialog>
    )
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MainHeader
          onLeftPress={() => this.props.navigation.openDrawer()}
          onRightPress={() => alert('Statistics')}
          right_icon_name={"list"} />

        <View style={{ backgroundColor: 'white', }} onStartShouldSetResponder={(evt) => this.props.visibilityFavList(false)} >
          {this.selectionList()}
          <View style={{ zIndex: -1, flexDirection: 'row', justifyContent: "space-between", marginTop: 20, marginLeft: 10, marginRight: 10, bottom: 10 }} onStartShouldSetResponder={(evt) => this.props.visibilityFavList(false)}>
            <View>
              <Text>Favourites</Text>
            </View>
          </View>
          {this.renderSeparator()}
        </View>
        {this.renderDatePickerDialog()}
        <View style={{ flex: 1, zIndex: -1 }}>
          <ScrollView>
            <FlatList
              data={this.props.fav_income_list}
              renderItem={this._renderDataList}
              extraData={this.props}
              refreshing={this.props.refreshing}
              onRefresh={this.onRefresh}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={
                (
                  this.props.fav_income_list == null ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                      <Image source={require('../../../assets/images/cart-512.png')} style={{ width: 200, height: 200 }} />
                    </View>
                    : <View></View>
                )
              }
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({ favorite }) => {
  const {
    is_yesterday,
    is_today,
    is_displaylist,
    fav_income_list,
    error,
    selected_money_icon,
    date,
    refreshing,
    dialogVisible,
    is_selected,
    data,
    selectedFlatListName,
    selectedFlatListIndex,
    selectedDate,
    seatedPropsKey,
    seatedPropsName
  } = favorite;
  return {
    is_yesterday,
    is_today,
    is_displaylist,
    fav_income_list,
    error,
    selected_money_icon,
    date,
    refreshing,
    dialogVisible,
    is_selected,
    data,
    selectedFlatListName,
    selectedFlatListIndex,
    selectedDate,
    seatedPropsKey,
    seatedPropsName
  };
}
export default connect(mapStateToProps, {
  getFavIncome,
  visibilityFavList,
  getFavouriteDate,
  deleteFavouriteItem,
  FavouriteScreenLoad,
  favouriteDateRangePicker,
  onPressFavouriteFlatListItem,
  onPressFavouriteSeletedItem,
  selectedFavouriteRange,
  receivePropsFavouriteLoad
})(FavouriteScreen);