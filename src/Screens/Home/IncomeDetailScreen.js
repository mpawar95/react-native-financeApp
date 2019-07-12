
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity, Platform,
    FlatList,
    KeyboardAvoidingView,
} from 'react-native';
import { DatePicker, Input, BottomButton } from '../../Components';
import { Icon } from 'react-native-elements'
import { Color } from '../../utils/Colors';
import Ripple from 'react-native-material-ripple';
import {
    flatList_visibility,
    noteInputChange,
    onPressItem,
    categoryModalVisible,
    onPressCatItem,
    dateChange,
    addIncomeDetail,
    getAccountList,
    updateIncomeDetail,
    incomeDetailIconScreenLoad,
    incomeDetailScreenLoad,
    onPressIncomeItemSelected,
    onPressIncomeCatSelected,
    setItems
} from '../../Actions'
import { Dialog } from 'react-native-simple-dialogs';
import { styles } from '../../Style/IncomeDetailStyle';

class IncomeDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerLeft: (
                <Ripple onPress={() => params.onHandleBack()}>
                    <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                        <Icon name="arrow-back" size={22} />
                    </View>
                </Ripple>
            ),
            title: "Income Detail",
            headerTitleStyle: {
                fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
            }
        }
    }
    onHandleBack=()=>{
        this.props.incomeDetailScreenLoad()
        this.props.navigation.pop()
    }
    componentDidMount() {
        this.props.incomeDetailIconScreenLoad()
        this.props.getAccountList()
        const { navigation } = this.props;
        this.props.navigation.setParams({onHandleBack: this.onHandleBack })
        const item = this.props.navigation.getParam('item')
        item === undefined ?
            this.props.incomeDetailScreenLoad()
            :
            this.props.setItems(item.accountName,"home",item.icon_color,item.categoryName)
    }
    componentDidUpdate() {
           
    }
    onPressSelectedItem = (item) => {
        this.props.flatList_visibility(false)
        this.props.onPressItem(true)
        this.props.onPressIncomeItemSelected(item.item.account_name,"home",item.item.selected_color_icon,item.item.id,item.item.id)
    }
    _render_Item = (item) => {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this.onPressSelectedItem(item)}>
                    <View style={{ flex: 1, padding: 14, backgroundColor: "white", flexDirection: 'row' }}>
                        <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: item.item.selected_color_icon, alignSelf: 'center' }}></View>
                        <Text style={{ marginLeft: 5 }}>{item.item.account_name}</Text>
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
    account_list = () => {
        return (
            <View>
                {
                    this.props.is_visible_flatlist ?
                        <View style={{ height: 150, width: "100%", borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, zIndex: 1, position: "absolute", backgroundColor: 'white' }}>
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
    onDropDownPress = () => {
        this.props.flatList_visibility(true)
    }
    noteChange = (text) => {
        this.props.noteInputChange(text)
    }
    _onSubmitData = () => {
        const { navigation } = this.props;

        const income = navigation.getParam('income');
        const item = this.props.navigation.getParam('item')
        console.log("updated",item)
        item === undefined ?
            this.props.addIncomeDetail(
                income,
                this.props.selected_name,
                this.props.selected_cat_name,
                this.props.todayDate,
                this.props.selected_icon_color,
                this.props.notesValue,
                navigation,
                this.props.selected_key
            )
            :
            this.props.updateIncomeDetail(
                item.id,
                income,
                this.props.selected_name,
                this.props.selected_cat_name,
                this.props.todayDate,
                this.props.selected_icon_color,
                this.props.notesValue,
                navigation,
                this.props.selected_key
            )
    }
    onPressCatSelectedItem = (item) => {
        this.props.categoryModalVisible(false)
        this.props.onPressCatItem(true)
        this.props.onPressIncomeCatSelected(item.item.cat_name,item.item.icon,item.item.key)
    }
    onCategoryPress = () => {
        this.props.categoryModalVisible(true)
    }
    cat_render_Item = (item) => {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this.onPressCatSelectedItem(item)}>
                    <View style={{ flex: 1, padding: 14, flexDirection: 'row' }}>
                        <Icon name={item.item.icon} size={15} />
                        <Text style={{ marginLeft: 5 }}>{item.item.cat_name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    categoryModal = () => {
        return (
            <Dialog
                visible={this.props.dialogVisible}
                title="Choose category"
                onTouchOutside={() => this.props.categoryModalVisible(false)} >
                {this.renderSeparator()}
                <FlatList
                    extraData={this.props.selected_cat_index}
                    data={this.props.category_Data}
                    renderItem={this.cat_render_Item}
                    keyExtractor={item => item.key.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </Dialog>
        )
    }
    onDateChange = (text) => {
        this.props.dateChange(text)
    }
    render() {
        const items = this.props.navigation.getParam('item')

        const { navigation } = this.props;
        const income = navigation.getParam('income');
        return (
            <KeyboardAvoidingView  style={{flex:1}}>
                <View style={styles.subHeader}
                    onStartShouldSetResponder={(evt) => this.props.flatList_visibility(false)}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={styles.plusIcon}>+</Text>
                        <Text style={styles.viewMoney}>{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}</Text>
                        <Text style={styles.viewMoney}>{income}</Text>
                    </View>
                </View>
                <View style={{ flex: 8, backgroundColor: Color.BACKGROUND_COLOR, marginLeft: 10, marginRight: 10, }}
                    onStartShouldSetResponder={(evt) => this.props.flatList_visibility(false)}>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.onDropDownPress()}>
                            <View style={[styles.viewStyle, { borderColor: this.props.is_selected ? Color.PRIMARY : "black", zIndex: 0 }]}>
                                <View style={{ flexDirection: 'row', padding: 14 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                                        {
                                            this.props.is_selected ? <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: this.props.selected_icon_color }}></View>
                                                :
                                                items === undefined ?
                                                    <View></View> :
                                                    <View
                                                        style={{
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 15 / 2,
                                                            backgroundColor: this.props.selected_icon_color
                                                        }}>
                                                    </View>
                                        }
                                        <Text style={{ color: "#000000", marginLeft: 5 }}>{this.props.selected_name ? this.props.selected_name : "Account"}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Icon name="home" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.account_list()}
                    </View>
                    <View style={{ marginTop: 10, zIndex: -1 }}>
                        <TouchableOpacity onPress={() => this.onCategoryPress()}>
                            <View style={[styles.viewStyle, { borderColor: this.props.is_category_selected ? Color.PRIMARY : "#000000", zIndex: 0 }]}>
                                <View style={{ flexDirection: 'row', padding: 14 }}>
                                    <View style={styles.categoryItem}>
                                        <View style={styles.categoryItem}>
                                            {
                                                this.props.is_category_selected ?
                                                    <Icon
                                                        name={this.props.selected_cat_icon_name} color={this.props.selected_icon_color} />
                                                    :
                                                    <Icon name={items === undefined ? "" : "home"} color={this.props.selected_icon_color} />
                                            }
                                            <Text style={{ color: "#000000" }}>{this.props.selected_cat_name ? this.props.selected_cat_name : "Category"}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', }}>
                                            <Icon name="home" />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.categoryModal()}
                    </View>
                    <View style={{ marginTop: 15, zIndex: -1 }}>
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
                    <View style={{ marginTop: 10, zIndex: -1 }}>
                        <Input
                            placeholder="Notes"
                            inputStyle={{ color: "#000000", padding: Platform.OS === "ios" ? 0 : 14 }}
                            onInputChange={(event) => this.noteChange(event.nativeEvent.text)}
                            inputValue={this.props.notesValue}
                        />
                    </View>

                </View>
                {
                    this.props.is_selected && this.props.is_category_selected ?
                        <BottomButton
                            title="Save"
                            onSubmitData={this._onSubmitData}
                        />
                        :<View></View>
                        
                }
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = ({ incomedetail }) => {
    const {
        is_visible_flatlist,
        is_selected,
        selected_index,
        selected_name,
        selected_icon_name,
        selected_icon_color,
        account_Data,
        notesValue,
        todayDate,
        is_category_selected,
        dialogVisible,
        category_Data,
        selected_money_icon,
        selected_key,
        selected_cat_name,
        selected_cat_icon_name,
        selected_cat_index
    } = incomedetail;
    return {
        is_visible_flatlist,
        is_selected,
        selected_index,
        selected_name,
        selected_icon_name,
        selected_icon_color,
        account_Data,
        notesValue,
        todayDate,
        is_category_selected,
        dialogVisible,
        category_Data,
        selected_money_icon,
        selected_key,
        selected_cat_name,
        selected_cat_icon_name,
        selected_cat_index
    };
}
export default connect(mapStateToProps, {
    flatList_visibility,
    noteInputChange,
    onPressItem,
    categoryModalVisible,
    onPressCatItem,
    dateChange,
    addIncomeDetail,
    getAccountList,
    updateIncomeDetail,
    incomeDetailIconScreenLoad,
    incomeDetailScreenLoad,
    onPressIncomeItemSelected,
    onPressIncomeCatSelected,
    setItems
})(IncomeDetailScreen);