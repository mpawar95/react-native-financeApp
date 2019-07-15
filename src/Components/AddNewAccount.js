import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Platform, TextInput } from "react-native";
import PropTypes from 'prop-types';
import { Icon } from "react-native-elements";
import { Color } from "../utils/Colors";


export class AddNewAccount extends Component {
    state = { isFocused: false }
    handleInputFocus = () => this.setState({ isFocused: true })
    handleInputFocus1 = () => this.setState({ isFocused: false })
    render() {
        const { isFocused } = this.state
        const { accountPlaceHolder, BalancePlaceHolder, is_icon, accountInputChange, amountTextVisibility, balanceInputChange, onImagePress, icon_name, balanceInputValue, accountInputValue, selected_color } = this.props;
        return (
            <View style={{}}>
                <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity onPress={onImagePress}>
                                <View style={{
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50 / 2,
                                    backgroundColor: selected_color ? `${selected_color}` : "#a9a9a9"
                                }}></View>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 10, marginTop: 5 }}>Choose Color</Text>
                        </View>
                        <View style={Platform.OS === "ios" ? styles.inputContainerIos : styles.inputContainerAndroid}>
                            <View style={{ width: "100%" }}>
                                <TextInput
                                    onFocus={this.handleInputFocus1}
                                    ref={ref => (this.input = ref)}
                                    placeholder={accountPlaceHolder}
                                    onChange={accountInputChange}
                                    value={accountInputValue}
                                />
                            </View>
                        </View>
                    </View>
                    <View>{amountTextVisibility ?
                        <View style={[Platform.OS === "ios" ? styles.inputContainerNewIos : styles.inputContainerNewAndroid, { marginTop: 20 }]}>
                            <View style={{ width: "100%" }}>
                                <TextInput
                                    onFocus={this.handleInputFocus}
                                    ref={ref => (this.input = ref)}
                                    placeholder={BalancePlaceHolder}
                                    onChange={balanceInputChange}
                                    value={balanceInputValue}
                                    style={{ marginLeft: 10 }}
                                    keyboardType="numeric"
                                    maxLength={6}
                                />
                            </View>
                            {is_icon ?
                                <View style={Platform.OS === "ios" ? "" : { marginTop: 8, marginRight: 10 }}>
                                    <Icon name={icon_name} size={24} color={isFocused ? Color.PRIMARY : Color.LIGHT_FONT_COLOR} />
                                </View>
                                : <View >

                                </View>
                            }
                        </View>
                        : <View></View>
                    }
                    </View>
                </View>
            </View>
        )
    }
}

AddNewAccount.propTypes = {
    accountPlaceHolder: PropTypes.string.isRequired,
    BalancePlaceHolder: PropTypes.string.isRequired,
    is_icon: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    accountInputChange: PropTypes.func,
    balanceInputChange: PropTypes.func,
    accountInputValue: PropTypes.string,
    balanceInputValue: PropTypes.string,
    CircleShapeView: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.shape({}),
    ]),
    onImagePress: PropTypes.func,
    icon_name: PropTypes.string,
    selected_color: PropTypes.string,
    amountTextVisibility: PropTypes.bool
}
AddNewAccount.defaultProps = {
    is_icon: true,
}
const styles = {
    CircleShapeView: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#00BCD4'
    },
    inputContainerIos: {
        marginLeft: 18,
        height: 44,
        width: "75%",
        borderWidth: 0.5,
        borderRadius: 4,
        paddingLeft: 12,
        paddingTop: 14,
        color: "#636863",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputContainerAndroid: {
        marginLeft: 18,
        width: "70%",
        height: 44,
        borderWidth: 0.5,
        borderRadius: 4,
        color: "#636863",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputContainerNewIos: {
        height: 44,
        width: "100%",
        borderWidth: 0.5,
        borderRadius: 4,
        padding: 12,
        color: "#636863",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputContainerNewAndroid: {
        width: "100%",
        height: 44,
        borderWidth: 0.5,
        borderRadius: 4,
        color: "#636863",
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};