
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
  TextInput
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { MainHeader } from '../../Components';
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
    onPressEditCategoryItems
} from '../../Actions'
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
class EditCategoryScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_index: "",
            selected_name: "",
            is_selected: false,
            data: [
                { select: "Expence", key: 0 },
                { select: "Income", key: 1 },
            ],
            selected_cat_icon_name:"",
            selected_cat_index:"",
            category_Icon: [
                {  key: 0, icon: "airplay" },
                {  key: 1, icon: "assistant" },
                {  key: 2, icon: "beenhere" },
                {  key: 3, icon: "build" },
                {  key: 4, icon: "cached" },
                {  key: 5, icon: "cake" },
                {  key: 6, icon: "call" },
                {  key: 7, icon: "casino" },
                {  key: 8, icon: "cast" },
                {  key: 9, icon: "close" },
                {  key: 10, icon: "done" },
                {  key: 11, icon: "face" },
            ],
        }
    }
    static navigationOptions = ({ navigation }) => {
        const navigator = navigation.getParam("navigator")
        const {params = {}} = navigation.state;
        return {
            headerLeft: (
                <Ripple onPress={() => navigator.pop()}>
                        <View style={{ height: 40, width: 40, alignContent: 'center', justifyContent: 'center' }}>
                            <Icon name="arrow-back" size={22}/>
                        </View>
                </Ripple>
            ),
            headerRight: (
                <TouchableWithoutFeedback onPress={() => params.onDeletePress()}>
                  <View style={{ flexDirection: 'row', marginRight: 5, }}>
                    <Text style={{ color:  Color.RED_COLOR }}>{"Delete"}</Text>
                  </View>
                </TouchableWithoutFeedback>
            ),
            title: "Edit category",
            headerTitleStyle: {
                fontSize: 17, color: "#636863", alignContent: 'center', justifyContent: 'center', marginLeft: Platform.OS === "ios" ? 0 : -20
            }
        }
    }
    componentDidMount(){
        const { navigation } = this.props;
        const item=this.props.navigation.getParam("item")
        this.props.editCategoryLoad(item.item.id)
        this.setState({
            selected_cat_icon_name:item.item.selected_Icon
        })
        this.props.navigation.setParams({ navigator: navigation,item : item,onDeletePress: this.handleDelete })
    }
    handleDelete=()=>{
        const { navigation } = this.props;
        const item=this.props.navigation.getParam("item") 
        this.props.deleteCategory(item.item.id,navigation)
    }
    onCategoryPress = () => {
        this.props.editCategoryModalVisible(true)
    }
    onPressCatSelectedItem = (item) => {
        this.props.editCategoryModalVisible(false)
        this.props.onPressEditCategoryItems(item.item.icon,item.item.key)
        // this.setState({
        //     selected_cat_icon_name: item.item.icon,
        //     selected_cat_index: item.item.key,
        // })
    }
    cat_render_Item = (item) => {
        const items=this.props.navigation.getParam("item")
        return (
            <View style={{flex:1,justifyContent:'center' ,alignItems:'center' }} key={item.item.id}>
                <TouchableOpacity onPress={() => this.onPressCatSelectedItem(item)}>
                    <View style={{ padding: 14, flexDirection: 'row', }}>
                        <Icon name={item.item.icon} size={24} color={item.item.icon == this.state.selected_cat_icon_name ? Color.PRIMARY : "black"} />
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
                    extraData={this.state.selected_cat_index}
                    data={this.state.category_Icon}
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
    _onSubmitData=()=>{
        const item=this.props.navigation.getParam("item")
        this.props.updateCategory(
            item.item.id,
            this.props.categoryName,
            this.state.selected_cat_icon_name,
            { navigator: this.props.navigation }
        )
    }
  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 20 }}>
                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                    <Icon name={this.state.selected_cat_icon_name ? this.state.selected_cat_icon_name : "home"} size={40} onPress={() => this.onCategoryPress()} />
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
                this.props.categoryName && this.state.selected_cat_icon_name ?
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
const mapStateToProps = ({ editCategory }) => {
  const {
    dialogVisible,
    categoryName,
    category_icon
  } = editCategory;
  return {
    dialogVisible,
    categoryName,
    category_icon
  };
}
export default connect(mapStateToProps, {
    editCategoryLoad,
    editCategoryModalVisible,
    editCategoryNameChanged,
    deleteCategory,
    updateCategory,
    onPressEditCategoryItems
})(EditCategoryScreen);