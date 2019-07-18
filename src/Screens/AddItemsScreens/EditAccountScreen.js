
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    Keyboard
} from 'react-native';
import { AddNewAccount, ColorPickerDialog,BottomButton } from '../../Components';
import { Icon } from "react-native-elements";
import { 
    editAccountInputChange,
    getAccount ,
    updateAccount,
    deleteAccount,
    onPressColorPickerVisible,
    onPressEditAccountSelectedItem
} from '../../Actions'
import { styles} from '../../Style/editaccountStyle'
import Ripple from 'react-native-material-ripple';
import { Color } from '../../utils/Colors';
class EditAccountScreen extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        const navigator = navigation.getParam("navigator")
        const {params = {}} = navigation.state;
        return {
            headerLeft: (
                <Ripple onPress={() => navigator.pop()}>
                        <View style={styles.backIcon}>
                            <Icon name="arrow-back" size={22}/>
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
            title: "Edit account",
            headerTitleStyle: styles.headerTextStyle
        }
    }
    componentDidMount(){
        const { navigation } = this.props;
        const item=this.props.navigation.getParam("item")
        this.props.navigation.setParams({ navigator: navigation,item : item,onDeletePress: this.handleDelete })
        this.props.getAccount(item.id)
    }
    handleDelete=()=>{
        const { navigation } = this.props;
        const item=this.props.navigation.getParam("item") 
        const totalAmount=this.props.navigation.getParam("totalAmount")
        this.props.deleteAccount(item,navigation,totalAmount)
    }
    onAccountInputChange = (text) => {
        this.props.editAccountInputChange(text)
    }
    _onYesPress = () => {
        
        this.state.selected_color ? this.props.onPressColorPickerVisible(false) : ""
    }
    _onColorPress = () => {
        Keyboard.dismiss()
        this.props.onPressColorPickerVisible(true)
    }
    onItemPress = (item) => {
        this.props.onPressEditAccountSelectedItem(item.key,item.color)
    }
    render_item = ({item}) => {
        return (
            <View style={{ justifyContent: "space-evenly", flex: 1, marginTop: 5 }}>

                <TouchableOpacity onPress={() => this.onItemPress(item)} >
                    <View style={{
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2,
                        backgroundColor: item.color
                    }}>
                        {
                            item.key == this.props.selected_index ?
                                <Icon name="done" /> :
                                <View></View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    OpenColorDialog = () => {
        return (
            <View>
                <ColorPickerDialog
                    visible={this.props.is_Color_Picker_Visible}
                    title="Choose Color"
                    negativeButtonTitle="Cancle"
                    positiveButtonTitle="Ok"
                    onTouchOutside={() =>this.props.onPressColorPickerVisible(false)}
                    onYesPress={this._onYesPress}
                    onNoPress={() => this.props.onPressColorPickerVisible(false)}
                    data={this.props.data}
                    renderItem={this.render_item}
                    extraData={`${this.props.selected_index}`}
                    keyExtractor={(index) => index.key.toString()}
                />
            </View>
        )
    }
    _onSubmitData=()=>{
        const item=this.props.navigation.getParam("item")
        const { navigation } = this.props;    
        this.props.updateAccount(item.id,this.props.pick_color,this.props.accountInput,navigation)
    }
    render() {
        return (
            <View style={{ flex: 1 }} onStartShouldSetResponder={(evt) => Keyboard.dismiss()}>
                <AddNewAccount
                    accountPlaceHolder="Account name"
                    BalancePlaceHolder="Initial Balance"
                    onImagePress={() => alert('hello')}
                    icon_name="mail"
                    accountInputChange={(event) => this.onAccountInputChange(event.nativeEvent.text)}
                    accountInputValue={this.props.accountInput}
                    onImagePress={this._onColorPress}
                    selected_color={this.props.pick_color}
                    amountTextVisibility={false}
                />
                {this.OpenColorDialog()}
                <BottomButton
                    title="Save"
                    onSubmitData={this._onSubmitData}
                />
            </View>
        );
    }
}
const mapStateToProps = ({ edit }) => {
    const {
        accountInput,
        error,
        data,
        pick_color,
        selected_index,
        is_Color_Picker_Visible
    } = edit;
    return {
        accountInput,
        error,
        data,
        pick_color,
        selected_index,
        is_Color_Picker_Visible
    };
}
export default connect(mapStateToProps, {
    editAccountInputChange,
    getAccount,
    updateAccount,
    deleteAccount,
    onPressColorPickerVisible,
    onPressEditAccountSelectedItem
})(EditAccountScreen);