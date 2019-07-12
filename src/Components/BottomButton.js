import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import { Color } from '../utils/Colors';
import Ripple from 'react-native-material-ripple';
import { StyleSheet } from "react-native";
export class BottomButton extends Component {
    render() {
        const { onSubmitData, title } = this.props;
        return (
            <View style={styles.ButtonView}>
                <Ripple style={styles.innerStyle} onPress={onSubmitData}>
                    <Text style={{ fontWeight: "700", color: Color.BACKGROUND_COLOR,fontSize:20 }}>{title}</Text>
                </Ripple>
            </View>
        )
    }
}
BottomButton.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmitData: PropTypes.func
}
BottomButton.defaultProps = {
    title: "",
}
const styles = StyleSheet.create({
    ButtonView:{
        position:'absolute',bottom:0,alignSelf:'center',height:50,width:"100%"
    },
    innerStyle:{
        justifyContent:'center',alignItems:'center',backgroundColor:Color.PRIMARY,height:50,width:"100%"
    }
});