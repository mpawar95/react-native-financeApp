import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Platform,TextInput } from "react-native";
import PropTypes from 'prop-types';
import { Color } from '../utils/Colors';
export class Input extends Component {
    render() {
        const { placeholder,onInputChange,inputValue,inputStyle,keyboardType,multiline,maxLength,onFocus } = this.props;
        return (
            <View style={{height:44,width:"100%",borderWidth: Platform.OS === "ios" ? 0.2 : 0.4, borderRadius: 3,padding: Platform.OS==="ios"? 14 : 0, backgroundColor:"#fff"}}>
                <TextInput
                    placeholder={placeholder}
                    onChange={onInputChange}
                    value={inputValue}
                    style={[inputStyle]}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    onFocus={onFocus}
                />
            </View>
        )
    }
}
Input.propTypes = {
    placeholder:PropTypes.string.isRequired,
    onInputChange:PropTypes.func,
    inputValue:PropTypes.string,
    inputStyle:PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.shape({}),
    ]),
    keyboardType:PropTypes.string,
    maxLength:PropTypes.number,
    onFocus:PropTypes.func

}
Input.defaultProps = {
    placeholder:""

}
