
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Input,DatePicker,BottomButton } from '../../Components';
import Ripple from 'react-native-material-ripple';
import {
    transferAccountListFetch,
    transferVisibilityList,
    amountInputChange,
    transferDateChange,
    transferNoteInputChange,
    transferVisibilityList2,
    onTransferPressItem1,
    onTransferPressItem2,
    onSubmitTransferAmount,
    onPressMoneyTransferSelectedItem1,
    onPressMoneyTransferSelectedItem2,
    moneyTransferScreenLoad
} from '../../Actions'
import { Color } from '../../utils/Colors';
import { styles } from '../../Style/MoneyTransferStyle';
class MoneyTransferScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasFocus: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return {
            headerLeft: (
                <Ripple onPress={() => params.onHandleBack()}>
                        <View style={{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' }}>
                            <Icon name="arrow-back" size={22} />
                        </View>
                </Ripple>
            ),
            title: "Transfer",
            headerTitleStyle: {
                fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
            }
        }
    }
    onHandleBack=()=>{
        this.props.moneyTransferScreenLoad()
        this.props.navigation.pop()
    }
    componentDidMount() {
        this.props.navigation.setParams({ onHandleBack: this.onHandleBack })
        this.props.transferAccountListFetch()
    }
   
    componentDidUpdate(){
    }
    onPressSelectedItem = (item) => {
        this.props.transferVisibilityList(false)
        this.props.onTransferPressItem1(true)
        this.props.onPressMoneyTransferSelectedItem1(item.item.account_name,"home",item.item.selected_color_icon,item.item.key,item.item.id,item.index)
    }
    onPressSelectedItem2 = (item) => {
        this.props.transferVisibilityList2(false)
        this.props.onTransferPressItem2(true)
        this.props.onPressMoneyTransferSelectedItem2(item.item.account_name,"home",item.item.selected_color_icon,item.item.key,item.item.id)
    }
    _render_Item = (item) => {
        return (
            <View style={{}}>
                <Ripple onPress={() => this.onPressSelectedItem(item)}>
                    <View style={{ flex: 1, padding: 14, backgroundColor: "white", flexDirection: 'row' }}>
                        <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: item.item.selected_color_icon, alignSelf: 'center' }}></View>
                        <Text style={{ marginLeft: 5 }}>{item.item.account_name}</Text>
                    </View>
                </Ripple>
            </View>
        )
    }
    _render_Item2 = (item) => {        
        return (
            item.index === this.props.item_index ? <View></View> :
            <View style={{}}>
                <Ripple onPress={() => this.onPressSelectedItem2(item)}>
                    <View style={{ flex: 1, padding: 14, backgroundColor: "white", flexDirection: 'row' }}>
                        <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: item.item.selected_color_icon, alignSelf: 'center' }}></View>
                        <Text style={{ marginLeft: 5 }}>{item.item.account_name}</Text>
                    </View>
                </Ripple>
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
    account_list1 = () => {
        return (
            <View>
                {
                    this.props.is_visible_flatlist ?
                        <View style={{ height: 152, width:"101%", borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, zIndex: 1, position: "absolute", backgroundColor: 'white' }}>
                            <ScrollView>
                                <FlatList
                                    extraData={this.props.selected_index}
                                    data={this.props.account_Data}
                                    renderItem={this._render_Item}
                                    keyExtractor={item => item.id}
                                    ItemSeparatorComponent={this.renderSeparator}
                                /></ScrollView>
                        </View>
                        :
                        <View>
                        </View>
                }
            </View>
        )
    }
    account_list2 = () => {
        return (
            <View>
                {
                    this.props.is_visible_flatlist2 ?
                        <View style={{ height: 152, width:"101%", borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, zIndex: 1, position: "absolute", backgroundColor: 'white' }}>
                            <ScrollView>
                                <FlatList
                                    extraData={this.props.selected_index2}
                                    data={this.props.account_Data}
                                    renderItem={this._render_Item2}
                                    keyExtractor={item => item.id}
                                    ItemSeparatorComponent={this.renderSeparator}
                                /></ScrollView>
                        </View>
                        :
                        <View>
                        </View>
                }
            </View>
        )
    }
    onDropDownPress = () => {
        this.props.transferVisibilityList(true)
        this.props.transferVisibilityList2(false)
    }
    onDropDownPress2 = () => {
        this.props.transferVisibilityList(false)
        this.props.transferVisibilityList2(true)
    }
    amountChange = (text) => {
        this.handleEventsClose()
        this.props.amountInputChange(text)
    }
    onDateChange = (text) => {
        this.props.transferDateChange(text)
    }
    noteChange = (text) => {
        this.handleEventsClose()
        this.props.transferNoteInputChange(text)
    }
    handleEventsClose=()=>{
        this.props.transferVisibilityList(false)
        this.props.transferVisibilityList2(false)
    }
    _onSubmitData=()=>{
        const { navigation } = this.props;
        this.props.onSubmitTransferAmount(
            this.props.selected_key,
            this.props.selected_key2,
            "From "+`${this.props.selected_name}`+" >>> to "+ `${this.props.selected_name2}`,
            "Transfer money from "+`${this.props.selected_name}`+" to "+ `${this.props.selected_name2}`,
            this.props.todayDate,
            this.props.amount,
            Color.PRIMARY,
            this.props.notesValue,
            navigation
        )
    }
    setFocus (hasFocus) {
        this.setState({hasFocus},
            this.handleEventsClose()
            );
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} >
            <View  style={{ flex: 1  }} onStartShouldSetResponder={(evt) => this.handleEventsClose()}>
                <View style={{ margin: 10, borderWidth: Platform.OS === "ios" ? 0.4 : 0.4,backgroundColor: this.props.is_selected1 ? this.props.selected_icon_color : Color.WHITE_COLOR,borderRadius:6,flexDirection:"column" }} onStartShouldSetResponder={(evt) => this.props.transferVisibilityList(false)}>
                    <View style={{ margin:10}}>
                        <TouchableOpacity onPress={() => this.onDropDownPress()}>
                            <View style={[styles.viewStyle, { borderColor: this.props.is_selected ? Color.PRIMARY : "black", zIndex: 0 }]}>
                                <View style={{ flexDirection: 'row', padding: 14 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>

                                        {
                                            this.props.is_selected1 ? <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: this.props.selected_icon_color }}></View>
                                                : <Text></Text>
                                        }
                                        <Text style={{ color: "black", marginLeft: 5 }}>{this.props.selected_name ? this.props.selected_name : "Account"}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', }}>
                                        <Icon name="home" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.account_list1()}
                    </View>
                    <View style={{ margin:10,zIndex:-1 }}>
                        <Input
                            placeholder="Value"
                            inputStyle={{ color: "#000", padding: Platform.OS === "ios" ? 0 : 14 }}
                            onInputChange={(event) => this.amountChange(event.nativeEvent.text)}
                            inputValue={this.props.amount}
                            keyboardType="numeric"
                            maxLength={6}
                            onFocus={this.setFocus.bind(this, true)}
                        />
                    </View>
                </View>
                <View style={{margin:10,justifyContent:'center',alignItems:'center', zIndex:-1}}>
                    <Icon name="transform" color={this.props.is_selected1 && this.props.is_selected2 && this.props.amount_valid ? Color.PRIMARY:Color.LIGHT_FONT_COLOR} size={40}/>
                </View>
                <View style={{ margin: 12,zIndex:-1, borderWidth: Platform.OS === "ios" ? 0.2 : 0.4,borderColor:Color.LIGHT_FONT_COLOR,borderRadius:6,flexDirection:"column",backgroundColor: this.props.is_selected2 ? this.props.selected_icon_color2 : Color.WHITE_COLOR  }}>
                    <View style={{ margin:10, }}>
                        <TouchableOpacity onPress={() => this.onDropDownPress2()}>
                            <View style={[styles.viewStyle, { borderColor: this.props.is_selected ? Color.PRIMARY : "black", zIndex: 0 }]}>
                                <View style={{ flexDirection: 'row', padding: 14 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>

                                        {
                                            this.props.is_selected2 ? <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: this.props.selected_icon_color2 }}></View>
                                                : <Text></Text>
                                        }
                                        <Text style={{ color: "black", marginLeft: 5 }}>{this.props.selected_name2 ? this.props.selected_name2 : "Account"}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', }}>
                                        <Icon name="home" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.account_list2()}
                    </View>
                    <View style={{ margin:10,zIndex:-1}}>
                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.props.todayDate}
                            mode="date"
                            format="MMMM DD, YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={true}
                            iconSource={require('../../../assets/images/Header/calendarIcon.png')}
                            onDateChange={this.onDateChange.bind(this)}
                        />
                    </View>
                    <View style={{ margin: 10,zIndex:-1 }}>
                        <Input
                            placeholder="Notes"
                            inputStyle={{ color: "#000", padding: Platform.OS === "ios" ? 0 : 14 }}
                            onInputChange={(event) => this.noteChange(event.nativeEvent.text)}
                            inputValue={this.props.notesValue}
                            onFocus={this.setFocus.bind(this, true)}
                        />
                    </View>
                </View>
              
                </View> 
                { this.props.is_selected1 && this.props.is_selected2 && this.props.amount_valid ?
                 <BottomButton 
                    title="Ok"
                    onSubmitData={this._onSubmitData}

                />:<View></View>
                }
            </SafeAreaView>
        );
    }
}
const mapStateToProps = ({ transfer }) => {
    const {
        amount,
        account_Data,
        is_visible_flatlist,
        is_visible_flatlist2,
        todayDate,
        notesValue,
        is_selected1,
        is_selected2,
        amount_valid,
        selected_name,
        selected_icon_name,
        selected_icon_color,
        selected_index,
        selected_key,
        item_index,
        selected_index2,
        selected_name2,
        selected_icon_name2,
        selected_icon_color2,
        selected_key2
    } = transfer;
    return {
        amount,
        account_Data,
        is_visible_flatlist,
        is_visible_flatlist2,
        todayDate,
        notesValue,
        is_selected1,
        is_selected2,
        amount_valid,
        selected_name,
        selected_icon_name,
        selected_icon_color,
        selected_index,
        selected_key,
        item_index,
        selected_index2,
        selected_name2,
        selected_icon_name2,
        selected_icon_color2,
        selected_key2
    };
}
export default connect(mapStateToProps, {
    transferAccountListFetch,
    transferVisibilityList,
    amountInputChange,
    transferDateChange,
    transferNoteInputChange,
    transferVisibilityList2,
    onTransferPressItem1,
    onTransferPressItem2,
    onSubmitTransferAmount,
    onPressMoneyTransferSelectedItem1,
    onPressMoneyTransferSelectedItem2,
    moneyTransferScreenLoad
})(MoneyTransferScreen);