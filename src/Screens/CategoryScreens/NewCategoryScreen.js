
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    ScrollView,
    Platform,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from "react-native-elements";
import Ripple from 'react-native-material-ripple';
import { styles } from '../../Style/NewCategoryStyle';
import { Dialog } from 'react-native-simple-dialogs';
import {
    categoryNameChanged,
    newCategoryFlatListVisibility,
    newCategoryModalVisible,
    addNewCategory,
    onPressCategorySelectedItem,
    onPressCategorySelectedItemName,
    onPressCatSelectedItemName,
    newCategoryScreenLoad
} from '../../Actions'
import { BottomButton } from '../../Components'
import { Color } from '../../utils/Colors';
class NewCategoryScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return {
            headerLeft: (
                <Ripple onPress={() => params.onHandleBack()}>
                    <View style={{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' }}>
                        <View style={{}}>
                            <Icon name="arrow-back" size={22} />
                        </View>
                    </View>
                </Ripple>
            ),
            title: "New Category",
            headerTitleStyle: {
                fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
            }
        }
    }
    onHandleBack=()=>{
        this.props.newCategoryScreenLoad()
        this.props.navigation.pop()
    }
    componentDidMount() {
        this.props.navigation.setParams({ onHandleBack: this.onHandleBack })
    }
    onCategoryNameChanged = (text) => {
        this.handleEventsClose()
        this.props.categoryNameChanged(text)
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
    onPressSelectedItem = (item) => {
        this.props.newCategoryFlatListVisibility(false)
        this.props.onPressCategorySelectedItem(true)
        this.props.onPressCategorySelectedItemName(item.item.select,item.item.key)
    }
    _render_Item = (item) => {
        return (
            <View key={item.item.key}>
                <TouchableOpacity onPress={() => this.onPressSelectedItem(item)}>
                    <View style={{ padding: 14, backgroundColor: this.props.is_selected && item.item.key == this.props.selected_index ? Color.PRIMARY : Color.WHITE_COLOR, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 5, color: this.props.is_selected && item.item.key == this.props.selected_index ? Color.WHITE_COLOR : "black" }}>{item.item.select}</Text>
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
        this.props.newCategoryModalVisible(false)
        this.props.newCategoryFlatListVisibility(true)
    }
    onPressCatSelectedItem = (item) => {
        this.props.newCategoryModalVisible(false)
        this.props.newCategoryFlatListVisibility(false)
        this.props.onPressCatSelectedItemName(item.item.icon, item.item.key)
    }
    cat_render_Item = (item) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={item.item.key}>
                <TouchableOpacity onPress={() => this.onPressCatSelectedItem(item)}>
                    <View style={{ padding: 14, flexDirection: 'row', }}>
                        <Icon name={item.item.icon} size={24} color={item.item.key == this.props.selected_cat_index ? Color.PRIMARY : "black"} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    categoryIcon = () => {
        return (
            <Dialog
                visible={this.props.dialogVisible}
                title="Select the icon"
                onTouchOutside={() => this.props.newCategoryModalVisible(false)} >
                <FlatList
                    extraData={this.props.selected_cat_index}
                    data={this.props.category_Icon}
                    renderItem={this.cat_render_Item}
                    keyExtractor={item => item.key.toString()}
                    numColumns={3}
                />
            </Dialog>
        )
    }
    onCategoryPress = () => {
        this.props.newCategoryFlatListVisibility(false)
        this.props.newCategoryModalVisible(true)
    }
    _onSubmitData = () => {
        this.props.addNewCategory(
            this.props.categoryName,
            this.props.selected_cat_icon_name,
            this.props.selected_name,
            { navigator: this.props.navigation }
        )
    }
    handleEventsClose=()=>{
        this.props.newCategoryFlatListVisibility(false)
        this.props.newCategoryModalVisible(false)
    }
    handleInputFocus = () => {
        this.props.newCategoryFlatListVisibility(false)
        this.props.newCategoryModalVisible(false)
    }
    setFocus (hasFocus) {
        this.setState({hasFocus},
            this.handleEventsClose()
            );
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }} onStartShouldSetResponder={(evt) => this.props.newCategoryFlatListVisibility(false)}>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 20 }} onStartShouldSetResponder={(evt) => this.props.newCategoryFlatListVisibility(false)}>
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Icon name={this.props.selected_cat_icon_name ? this.props.selected_cat_icon_name : "airplay"} size={40} onPress={() => this.onCategoryPress()} />
                            <Text style={{ alignItems: 'center', fontSize: 10, color: Color.LIGHT_FONT_COLOR }}>
                                Choose Icon
                            </Text>
                        </View>
                        <View style={Platform.OS === "ios" ? styles.inputContainerIos : styles.inputContainerAndroid} onStartShouldSetResponder={(evt) => this.props.newCategoryFlatListVisibility(false)}>
                            <View style={{ width: "100%" }}>
                                <TextInput
                                    placeholder={"Category name"}
                                    onChange={(event) => this.onCategoryNameChanged(event.nativeEvent.text)}
                                    value={this.props.categoryName}
                                    onFocus={this.setFocus.bind(this, true)}
                                    onFocus={this.handleInputFocus}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10 }} onStartShouldSetResponder={(evt) => this.props.newCategoryFlatListVisibility(false)}>
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <TouchableOpacity onPress={() => this.onPressListDisplay()}>
                                <View style={[styles.dropDownlist, { borderColor: this.props.is_selected ? Color.PRIMARY : Color.LIGHT_FONT_COLOR }]}>
                                    <Text style={{ color: this.props.is_selected ? "black" : Color.LIGHT_FONT_COLOR, marginLeft: 10 }}>{this.props.is_selected ? this.props.selected_name : "Choose transaction type"}</Text>
                                    <Icon name="chevron-right" color={Color.PRIMARY} />
                                </View>
                            </TouchableOpacity>
                            {this._renderDisplayList()}
                            {this.categoryIcon()}
                        </View>
                    </View>
                    </View>
                    {
                        this.props.categoryName && this.props.selected_name ?
                            <BottomButton
                                title="Save"
                                onSubmitData={this._onSubmitData}
                            />
                            : <View></View>
                    }
            </SafeAreaView>
        );
    }
}
const mapStateToProps = ({ newCat }) => {
    const {
        categoryName,
        is_category_avail,
        is_displaylist,
        dialogVisible,
        category_Icon,
        is_selected,
        selected_index,
        selected_name,
        data,
        selected_cat_icon_name,
        selected_cat_index
    } = newCat;
    return {
        categoryName,
        is_category_avail,
        is_displaylist,
        dialogVisible,
        category_Icon,
        is_selected,
        selected_index,
        selected_name,
        data,
        selected_cat_icon_name,
        selected_cat_index
    };
}
export default connect(mapStateToProps, {
    categoryNameChanged,
    newCategoryFlatListVisibility,
    newCategoryModalVisible,
    addNewCategory,
    onPressCategorySelectedItem,
    onPressCategorySelectedItemName,
    onPressCatSelectedItemName,
    newCategoryScreenLoad
})(NewCategoryScreen);