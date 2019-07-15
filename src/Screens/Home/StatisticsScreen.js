
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import { SafeAreaView } from 'react-navigation';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements'
import { Color } from '../../utils/Colors';
import Ripple from 'react-native-material-ripple';
import { convertDateForUI, convertMyDate, convertDate } from '../../utils/DateFormate'
import {
    visibilityStatList,
    getStatiscticsDate,
    getPage,
    getInformation,
    statisticsScreenLoad,
    statisticsGetAccountData,
    onPressStatisticsItem,
    onPressStatisticsSelectedName,
    statisticsDateRangePicker,
    selectStatisticsDateRange,
    selectedItemIndex,
    firststatisticsScreenLoad
} from '../../Actions'
import { styles } from '../../Style/StatisticsStyles';
import PieChart from 'react-native-pie-chart';
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
import CalendarPicker from 'react-native-calendar-picker';

class StatisticsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
        },
            this.onDateChange = this.onDateChange.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        const navigator = navigation.getParam("navigator")
        return {
            headerLeft: (
                <Ripple onPress={() => navigator.pop()}>
                    <View style={styles.backIcon}>
                        <Icon name="arrow-back" size={22} />
                    </View>
                </Ripple>
            ),
            title: "Statistics",
            headerTitleStyle: styles.headerTitleStyle
        }
    }
    componentDidMount() {
        this.props.firststatisticsScreenLoad()
        const { navigation } = this.props;
        this.props.navigation.setParams({ navigator: navigation })
        this.props.getPage("Income")
        this.props.getInformation(0, convertMyDate(today), convertMyDate(today))
        this.props.getStatiscticsDate({ prop: "today" })
        this.props.statisticsScreenLoad()
        this.props.statisticsGetAccountData()
    }
    onPressListDisplay = () => {
        this.props.visibilityStatList(true)
    }
    onPressItem = (prop) => {
        this.props.getStatiscticsDate(prop)
        this.props.visibilityStatList(false)
        if (prop.prop == "today") {
            this.refs.dropdown_2.select(-1);
            this.props.getInformation(this.props.selectedIndex, convertMyDate(today), convertMyDate(today))
            this.props.onPressStatisticsItem(false)
            this.props.selectStatisticsDateRange("")
            this.props.onPressStatisticsSelectedName("", "")
            this.setState({
                selectedStartDate: null,
                selectedEndDate: null,
            })
        } else {
            this.refs.dropdown_2.select(-1);
            this.props.getInformation(this.props.selectedIndex, convertMyDate(yesterday), convertMyDate(yesterday))
            this.props.onPressStatisticsItem(false)
            this.props.selectStatisticsDateRange("")
            this.props.onPressStatisticsSelectedName("", "")
            this.setState({
                selectedStartDate: null,
                selectedEndDate: null,
            })
        }
    }
    datePickerDialog = () => {
        
        this.props.statisticsDateRangePicker(true)
        this.props.visibilityStatList(false)
    }
    onSelect=(index, value)=>{
        this.props.onPressStatisticsItem(true)
        this.props.onPressStatisticsSelectedName(value,index)
        this.props.selectStatisticsDateRange("")
        if (value == "Week") {
          this.props.getInformation(this.props.selectedIndex,convertMyDate(from_week), convertMyDate(to_week))
        }
        else if (value == "Month") {
          this.props.getInformation(this.props.selectedIndex,convertMyDate(from_month), convertMyDate(to_month))
        }
        else if (value == "Year") {
          this.props.getInformation(this.props.selectedIndex,convertMyDate(from_year), convertMyDate(to_year))
        }
      }
    selectionList = () => {
        return (
            <View style={styles.selectionList}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
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
    onViewItem = (page) => {
        this.props.getPage(page)
    }
    renderDataView = () => {
        const chart_wh = 150;
        var series = this.props.account_balance;
        var sliceColor = this.props.icon_color;
        return (
            this.props.account_balance[0] ?
                <View style={{ margin: 20, zIndex: -1 }} >
                    <PieChart
                        chart_wh={chart_wh}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        coverRadius={0.70}
                        coverFill={'#FFF'}
                    />
                </View>
                :
                <View style={{ margin: 20, zIndex: -1 }}>
                    <PieChart
                        chart_wh={chart_wh}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        coverRadius={0.70}
                        coverFill={'#FFF'}
                    />
                    {
                        this.props.selectedIndex == 0 ?
                            <Text style={{ color: Color.PRIMARY, bottom: 25, left: 60, fontSize: 18 }}>$0</Text>
                            :
                            <Text style={{ color: Color.RED_COLOR, bottom: 25, left: 60, fontSize: 18 }}>$0</Text>
                    }
                </View>
        )
    }
    renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: "column", marginTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginLeft: 5, height: 10, width: 10, borderRadius: 10 / 2, backgroundColor: item.color }}></View>
                    <View style={{ marginLeft: 5 }}><Text>{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{item.incometotal}{"-"}{item.accountname}</Text></View>
                </View>
            </View>
        )
    }
    handleIndexChange = (index) => {
        this.props.visibilityStatList(false)
        this.props.selectedItemIndex(index)

        this.props.selectedIndex === 0 ?
            this.props.getInformation(1, convertMyDate(today), convertMyDate(today)) :
            this.props.getInformation(0, convertMyDate(today), convertMyDate(today))
    }
    onDateChange(date, type) {
        this.props.onPressStatisticsSelectedName("", "")
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
        this.props.statisticsDateRangePicker(false)
        this.props.onPressStatisticsItem(false)
        this.props.selectStatisticsDateRange(convertDateForUI(startDate) + " - " + convertDateForUI(endDate))
        this.props.getInformation(this.props.selectedIndex, convertMyDate(startDate), convertMyDate(endDate))
        this.props.onPressStatisticsSelectedName("", "")
    }
    renderDatePickerDialog = () => {
        const { selectedStartDate, selectedEndDate } = this.state;
        const maxDate = convertDate(today);
        const startDate = selectedStartDate ? selectedStartDate.toString() : convertDate(today);
        const endDate = selectedEndDate ? selectedEndDate.toString() : convertDate(today);
        return (
            <Dialog
                visible={this.props.dialogVisible}
                onTouchOutside={() => this.props.statisticsDateRangePicker(true)} >
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
                        <TouchableWithoutFeedback onPress={() => {this.props.statisticsDateRangePicker(false)
                        }
                        }>
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
                <View style={{ flex: 1, backgroundColor: Color.WHITE_COLOR, }} onStartShouldSetResponder={(evt) => this.props.visibilityStatList(false)}>
                    {this.selectionList()}
                    {this.renderDatePickerDialog()}
                    <SegmentedControlTab
                        values={['Income', 'Expance']}
                        selectedIndex={this.props.selectedIndex}
                        onTabPress={this.handleIndexChange.bind(this)}
                        borderRadius={6}
                        activeTabTextStyle={styles.activeTabTextStyle}
                        activeTabStyle={styles.activeTabStyle}
                        tabsContainerStyle={styles.tabsContainerStyle}
                        tabStyle={styles.tabStyle}
                        allowFontScaling={false}
                        tabTextStyle={styles.tabTextStyle}
                    />
                    {this.renderSeparator()}
                    <ScrollView>
                        {this.renderDataView()}
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', marginTop: 10 }}>
                            <View style={{ flexDirection: "column", }}>
                                <Text style={{ alignSelf: 'center' }}>{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}{this.props.incomeTotal}</Text>
                                <Text>
                                    {
                                        this.props.selectedFlatListName == "Week" ? week :
                                            this.props.selectedFlatListName == "Month" ? month :
                                                this.props.selectedFlatListName == "Year" ? year :
                                                    this.props.selectedDate ? this.props.selectedDate :
                                                        this.props.is_yesterday ? convertDateForUI(yesterday) :
                                                            this.props.date
                                    }
                                </Text>
                            </View>
                            <View style={{}}>
                                <ScrollView>
                                    <FlatList
                                        data={this.props.account_name}
                                        renderItem={this.renderItem}
                                        keyExtractor={item => item.color}
                                    />
                                </ScrollView>
                            </View>
                        </View>
                    </ScrollView>
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
const mapStateToProps = ({ statistics }) => {
    const {
        is_flatList_visible,
        is_today,
        is_yesterday,
        is_income,
        is_expence,
        income_list,
        account_balance,
        icon_color,
        incomeTotal,
        selected_money_icon,
        date,
        account_name,
        is_selected,
        data,
        selected_index,
        selectedFlatListName,
        dialogVisible,
        selectedDate,
        selectedIndex
    } = statistics;
    return {
        is_flatList_visible,
        is_today,
        is_yesterday,
        is_income,
        is_expence,
        income_list,
        account_balance,
        icon_color,
        incomeTotal,
        selected_money_icon,
        date,
        account_name,
        is_selected,
        data,
        selected_index,
        selectedFlatListName,
        dialogVisible,
        selectedDate,
        selectedIndex,
    };
}
export default connect(mapStateToProps, {
    visibilityStatList,
    getStatiscticsDate,
    getPage,
    getInformation,
    statisticsScreenLoad,
    statisticsGetAccountData,
    onPressStatisticsItem,
    onPressStatisticsSelectedName,
    statisticsDateRangePicker,
    selectStatisticsDateRange,
    selectedItemIndex,
    firststatisticsScreenLoad
})(StatisticsScreen);