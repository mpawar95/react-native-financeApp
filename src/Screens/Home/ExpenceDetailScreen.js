
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Keyboard
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { DatePicker, Input, BottomButton } from '../../Components';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import { Icon } from 'react-native-elements'
import { Color } from '../../utils/Colors';
import { styles } from '../../Style/ExpanceDetailStyles';
import Ripple from 'react-native-material-ripple';
import {
    expence_FlatList_visibility,
    onExpncePressItem,
    expenceGetAccountList,
    expenceCategoryModalVisible,
    expenceonPressCatItem,
    expenceDateChange,
    expenceNoteInputChange,
    expenceIncomeDetail,
    updateExpanceDetail,
    ExpenceDetailScreenLoad,
    expenceDetailScreenLoad,
    onPressExpenceItems,
    expenceCatItems,
    expenceSetItem
} from '../../Actions';
class ExpenceDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerLeft: (
                <Ripple onPress={() => params.onHandleBack()}>
                    <View style={styles.backIcon}>
                        <Icon name="arrow-back" size={22} />
                    </View>
                </Ripple>
            ),
            title: "Expence Detail",
            headerTitleStyle: styles.headerTitleStyle
        }
    }
    onHandleBack = () => {
        Keyboard.dismiss()
        this.props.expenceDetailScreenLoad()
        this.props.navigation.pop()
    }
    componentDidMount() {
        this.props.navigation.setParams({ onHandleBack: this.onHandleBack })
        this.props.expenceGetAccountList()
        this.props.ExpenceDetailScreenLoad()
        const item = this.props.navigation.getParam('item')
        item === undefined ?
            this.props.expenceDetailScreenLoad()
            :
            this.props.expenceSetItem(item.accountName, "home", item.icon_color, item.categoryName)
    }
    onDropDownPress = () => {
        Keyboard.dismiss()
        this.props.expence_FlatList_visibility(true)
    }
    onPressSelectedItem = (item) => {
        this.props.expence_FlatList_visibility(false)
        this.props.onExpncePressItem(true)
        this.props.onPressExpenceItems(item.item.account_name, "home", item.item.selected_color_icon, item.item.key, item.item.id)
    }
    _render_Item = (item) => {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this.onPressSelectedItem(item)}>
                    <View style={{ flex: 1, padding: 14, backgroundColor: Color.BACKGROUND_COLOR, flexDirection: 'row' }}>
                        <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: item.item.selected_color_icon, alignSelf: 'center' }}></View>
                        <Text style={{ marginLeft: 5 }}>{item.item.account_name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
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
    onCategoryPress = () => {
        Keyboard.dismiss()
        this.props.expenceCategoryModalVisible(true)
    }
    onPressCatSelectedItem = (item) => {
        this.props.expenceCategoryModalVisible(false)
        this.props.expenceonPressCatItem(true)
        this.props.expenceCatItems(item.item.cat_name, item.item.icon, item.item.key)
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
    categoryModal = () => {
        return (
            <Dialog
                visible={this.props.dialogVisible}
                title="Choose category"
                onTouchOutside={() => this.props.expenceCategoryModalVisible(false)} >
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
        this.props.expenceDateChange(text)
    }
    noteChange = (text) => {
        this.props.expenceNoteInputChange(text)
    }
    _onSubmitData = () => {
        const { navigation } = this.props;
        const income = navigation.getParam('income');
        const item = this.props.navigation.getParam('item')
        item === undefined ?
            this.props.expenceIncomeDetail(
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
            this.props.updateExpanceDetail(
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
    render() {
        const { navigation } = this.props;
        const income = navigation.getParam('income');
        const items = this.props.navigation.getParam('item')
        return (

            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <View style={styles.subHeader} onStartShouldSetResponder={(evt) => {
                    this.props.expence_FlatList_visibility(false)
                    Keyboard.dismiss()
                }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: "700", fontSize: 24, color: Color.RED_COLOR }}>-</Text>
                        <Text style={{ fontWeight: "700", fontSize: 20, color: Color.RED_COLOR, marginLeft: 5 }}>{this.props.selected_money_icon ? this.props.selected_money_icon : "$"}</Text>
                        <Text style={{ fontWeight: "700", fontSize: 20, color: Color.RED_COLOR }}>{income}</Text>
                    </View>
                </View>
                <View style={{ flex: 8, backgroundColor: Color.BACKGROUND_COLOR, marginLeft: 10, marginRight: 10, }} onStartShouldSetResponder={(evt) => this.props.expence_FlatList_visibility(false)}
                >
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.onDropDownPress()}>
                            <View style={[styles.viewStyle, { borderColor: this.props.is_selected ? Color.PRIMARY : "black", zIndex: 0 }]}>
                                <View style={{ flexDirection: 'row', padding: 14 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                                        {
                                            this.props.is_selected ? <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: this.props.selected_icon_color }}></View>
                                                : items === undefined ? <View></View> : <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: this.props.selected_icon_color }}></View>
                                        }
                                        <Text style={{ color: "black", marginLeft: 5 }}>{this.props.selected_name ? this.props.selected_name : "Account"}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', }}>
                                        <Icon name="home" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.account_list()}
                    </View>
                    <View style={{ marginTop: 10, zIndex: -1 }}>
                        <TouchableOpacity onPress={() => this.onCategoryPress()}>
                            <View style={[styles.viewStyle, { borderColor: this.props.is_category_selected ? Color.PRIMARY : "black", zIndex: 0 }]}>
                                <View style={{ flexDirection: 'row', padding: 14 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                                            {
                                                this.props.is_category_selected ? <Icon name={this.props.selected_cat_icon_name} color={this.props.selected_icon_color} />
                                                    : <Icon name={items === undefined ? null : "home"} color={this.props.selected_icon_color} />
                                            }
                                            <Text style={{ color: "black" }}>{this.props.selected_cat_name ? this.props.selected_cat_name : "Category"}</Text>
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
                            inputStyle={{ color: "#000", padding: Platform.OS === "ios" ? 0 : 14 }}
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
                        : <View></View>
                }
            </KeyboardAvoidingView>

        );
    }
}
const mapStateToProps = ({ expencedetail }) => {
    const {
        is_visible_flatlist,
        is_selected,
        account_Data,
        is_category_selected,
        category_Data,
        dialogVisible,
        todayDate,
        notesValue,
        selected_money_icon,
        selected_name,
        selected_icon_name,
        selected_icon_color,
        selected_index,
        selected_key,
        selected_cat_name,
        selected_cat_icon_name,
        selected_cat_index
    } = expencedetail;
    return {
        is_visible_flatlist,
        is_selected,
        account_Data,
        is_category_selected,
        category_Data,
        dialogVisible,
        todayDate,
        notesValue,
        selected_money_icon,
        selected_name,
        selected_icon_name,
        selected_icon_color,
        selected_index,
        selected_key,
        selected_cat_name,
        selected_cat_icon_name,
        selected_cat_index
    };
}
export default connect(mapStateToProps, {
    expence_FlatList_visibility,
    onExpncePressItem,
    expenceGetAccountList,
    expenceCategoryModalVisible,
    expenceonPressCatItem,
    expenceDateChange,
    expenceNoteInputChange,
    expenceIncomeDetail,
    updateExpanceDetail,
    ExpenceDetailScreenLoad,
    expenceDetailScreenLoad,
    onPressExpenceItems,
    expenceCatItems,
    expenceSetItem
})(ExpenceDetailScreen);