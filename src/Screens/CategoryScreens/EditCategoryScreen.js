
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Platform,
    FlatList,
    TouchableOpacity,
    TextInput,
    Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Ripple from 'react-native-material-ripple';
import { Icon } from "react-native-elements";
import { Color } from '../../utils/Colors';
import { BottomButton } from '../../Components'
import { styles } from '../../Style/NewCategoryStyle';
import {
    editCategoryModalVisible,
    editCategoryNameChanged,
    editCategoryLoad,
    deleteCategory,
    updateCategory,
    onPressEditCategoryItems,
    setItemEditCategory,
    handleBackPress
} from '../../Actions'
import { Dialog } from 'react-native-simple-dialogs';
class EditCategoryScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const navigator = navigation.getParam("navigator")
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
                <TouchableWithoutFeedback onPress={() => params.onDeletePress()}>
                    <View style={{ marginRight: 5, }}>
                        <Text style={{ color: Color.RED_COLOR }}>{"Delete"}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ),
            title: "Edit category",
            headerTitleStyle: styles.headerTitleStyle
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const item = this.props.navigation.getParam("item")
        this.props.editCategoryLoad(item.item.id)
        this.props.setItemEditCategory(item.item.selected_Icon)
        this.props.navigation.setParams({ navigator: navigation, item: item, onDeletePress: this.handleDelete, onBackPress: this.handleBackPress })
    }
    handleDelete = () => {
        const { navigation } = this.props;
        const item = this.props.navigation.getParam("item")
        this.props.deleteCategory(item.item.id, navigation)
    }
    handleBackPress = () => {
        this.props.handleBackPress()
    }
    onCategoryPress = () => {
        Keyboard.dismiss()
        this.props.editCategoryModalVisible(true)
    }
    onPressCatSelectedItem = (item) => {
        this.props.editCategoryModalVisible(false)
        this.props.onPressEditCategoryItems(item.item.icon, item.item.key)
    }

    cat_render_Item = (item) => {
        const items = this.props.navigation.getParam("item")
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={item.item.id}>
                <TouchableOpacity onPress={() => this.onPressCatSelectedItem(item)}>
                    <View style={{ padding: 14, flexDirection: 'row', }}>
                        <Icon name={item.item.icon} size={24} color={item.item.icon == this.props.selected_cat_icon_name ? Color.PRIMARY : "black"} />
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
                onTouchOutside={() => this.props.editCategoryModalVisible(false)} >
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
    onCategoryNameChanged = (text) => {
        this.props.editCategoryNameChanged(text)
    }
    _onSubmitData = () => {
        const item = this.props.navigation.getParam("item")
        this.props.updateCategory(
            item.item.id,
            this.props.categoryName,
            this.props.selected_cat_icon_name,
            { navigator: this.props.navigation }
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }} onStartShouldSetResponder={(evt) => Keyboard.dismiss()}>
                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Icon name={this.props.selected_cat_icon_name ? this.props.selected_cat_icon_name : "home"} size={40} onPress={() => this.onCategoryPress()} />
                        <Text style={{ alignItems: 'center', fontSize: 10, color: Color.LIGHT_FONT_COLOR }}>
                            Choose Icon
                    </Text>
                    </View>
                    <View style={Platform.OS === "ios" ? styles.inputContainerIos : styles.inputContainerAndroid}>
                        <View style={{ width: "100%" }}>
                            <TextInput
                                placeholder={"Category name"}
                                onChange={(event) => this.onCategoryNameChanged(event.nativeEvent.text)}
                                value={this.props.categoryName}
                            />
                        </View>
                    </View>
                </View>
                {this.categoryIcon()}
                {
                    this.props.categoryName && this.props.selected_cat_icon_name ?
                        <BottomButton
                            title="Save"
                            onSubmitData={this._onSubmitData}
                        />
                        : <View></View>
                }
                </View>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = ({ editCategory }) => {
    const {
        dialogVisible,
        categoryName,
        category_Icon,
        selected_cat_icon_name,
        selected_cat_index
    } = editCategory;
    return {
        dialogVisible,
        categoryName,
        selected_cat_icon_name,
        selected_cat_index,
        category_Icon
    };
}
export default connect(mapStateToProps, {
    editCategoryLoad,
    editCategoryModalVisible,
    editCategoryNameChanged,
    deleteCategory,
    updateCategory,
    onPressEditCategoryItems,
    setItemEditCategory,
    handleBackPress
})(EditCategoryScreen);