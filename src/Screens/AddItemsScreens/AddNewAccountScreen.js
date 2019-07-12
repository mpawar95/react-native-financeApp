
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    View,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Icon } from "react-native-elements";
import { styles } from '../../Style/AddNewAccountStyle';
import { AddNewAccount, ColorPickerDialog, BottomButton } from '../../Components';
import {
    onAccountInputChange,
    onBalanceInputChange,
    addNewAccount,
    onPressNewAccountSelectedItem,
    onColorIconPress,
    addNewAccountScreenLoad
} from '../../Actions';
import { SafeAreaView } from 'react-navigation';
class AddNewAccountScreen extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        const navigator = navigation.getParam("navigator")
        const {params = {}} = navigation.state;
        return {
            headerLeft: (

                <Ripple onPress={() => params.onHandleBack()}>
                    <View style={styles.navigationHeaderLeft}>
                        <Icon name="arrow-back" size={22} />
                    </View>
                </Ripple>
            ),
            title: "New Account",
            headerTitleStyle: styles.navigationHeaderTitleStyle
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.props.navigation.setParams({ navigator: navigation ,onHandleBack: this.onHandleBack})
    }
    onHandleBack=()=>{
        this.props.addNewAccountScreenLoad()
        this.props.navigation.pop()
    }
    onAccountInputChange = (text) => {
        this.props.onAccountInputChange(text)
    }
    onBalanceInputChange = (text) => {
        this.props.onBalanceInputChange(text)
    }
    _onColorPress = () => {
        
        Keyboard.dismiss()
        this.props.onColorIconPress(true)
    }
    onItemPress = (item) => {
        this.props.onPressNewAccountSelectedItem(item.item.key, item.item.color)
    }
    render_item = (item) => {

        return (
            <View style={{ justifyContent: "space-evenly", flex: 1, marginTop: 5 }}>

                <TouchableOpacity onPress={() => this.onItemPress(item)} >
                    <View style={[styles.CircleShapeView, {
                        backgroundColor: item.item.color
                    }]}>
                        {
                            item.item.key == this.props.selected_index ?
                                <Icon name="done" /> :
                                <View></View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    _onYesPress = () => {
        this.props.onColorIconPress(false)
    }
    OpenColorDialog = () => {
        return (
            <View>
                <ColorPickerDialog
                    visible={this.props.is_Color_Picker_Visible}
                    title="Choose Color"
                    negativeButtonTitle="Cancle"
                    positiveButtonTitle="Ok"
                    onTouchOutside={() => this.props.onColorIconPress(false)}
                    onYesPress={this._onYesPress}
                    onNoPress={() => this.props.onColorIconPress(false)}
                    data={this.props.data}
                    renderItem={this.render_item}
                    extraData={`${this.props.selected_index}`}
                    keyExtractor={(index) =>index.key.toString()}
                />
            </View>
        )
    }
    _onSubmitData = () => {

        const { accountInput, balanceInput } = this.props
        this.props.addNewAccount(
            accountInput, 
            balanceInput, 
            this.props.selected_color, 
            this.props.selected_index,
            { navigator: this.props.navigation }
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{flex:1}} onStartShouldSetResponder={(evt) => Keyboard.dismiss()}>
                <AddNewAccount
                    accountPlaceHolder="Account name"
                    BalancePlaceHolder="Initial Balance"
                    onImagePress={() => alert('hello')}
                    icon_name="mail"
                    accountInputChange={(event) => this.onAccountInputChange(event.nativeEvent.text)}
                    balanceInputChange={(event) => this.onBalanceInputChange(event.nativeEvent.text)}
                    accountInputValue={this.props.accountInput}
                    balanceInputValue={this.props.balanceInput}
                    onImagePress={this._onColorPress}
                    selected_color={this.props.selected_color}
                    amountTextVisibility={true}
                />
                {this.OpenColorDialog()}
                {
                    this.props.is_account_name && this.props.is_balance  ?
                        <BottomButton
                            title="Save"
                            onSubmitData={this._onSubmitData}
                        />
                        :
                        <View></View>
                }
            </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ addnew }) => {
    const {
        accountInput,
        balanceInput,
        is_account_name,
        is_balance,
        is_balance_valid,
        data,
        selected_color,
        selected_index,
        is_Color_Picker_Visible
    } = addnew;
    return {
        accountInput,
        balanceInput,
        is_account_name,
        is_balance,
        is_balance_valid,
        data,
        selected_color,
        selected_index,
        is_Color_Picker_Visible
    };
}
export default connect(mapStateToProps, {
    onAccountInputChange,
    onBalanceInputChange,
    addNewAccount,
    onPressNewAccountSelectedItem,
    onColorIconPress,
    addNewAccountScreenLoad
})(AddNewAccountScreen);