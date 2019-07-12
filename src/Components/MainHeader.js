import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import PropTypes from 'prop-types';
import { Icon } from "react-native-elements";
import {Color} from '../utils/Colors';

export class MainHeader extends Component {

    iconVisible = () => {
        const { onRightPress, is_right_icon_visible, right_icon_name } = this.props;
        if (is_right_icon_visible) {
            return (
                <View style={{ flex: 1, alignItems: 'flex-end' }}>

                    <Icon name={right_icon_name}
                        size={30}
                        color={Color.PRIMARY}
                        onPress={onRightPress} />
                </View>
            )
        } else {

        }
    }
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              marginTop:8,
              width: "100%",
              backgroundColor: "#CED0CE",
            }}
          />
        );
      };
    render() {
        const { onLeftPress } = this.props;
        return (
            <View>
            <View style={{ flexDirection: "row", marginLeft: 5, marginRight: 5,marginTop:5 }}>
                <View style={{}}>
                    <Icon name="menu"
                        size={30}
                        color="#bcb3b3"
                        onPress={onLeftPress} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                    <Text style={{ fontWeight: '700', color: "#000000", fontSize: 24 }}>Peri</Text><Text style={{ fontWeight: '700', color: "#6c9961", fontSize: 24 }}>Fy</Text>
                </View>
                {this.iconVisible()}
                
            </View>
            {/* {this.renderSeparator()} */}
            </View>
            
        )
    }
}
MainHeader.propTypes = {
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
    is_right_icon_visible: PropTypes.bool,
    right_icon_name: PropTypes.string.isRequired,
}
MainHeader.defaultProps = {
    is_right_icon_visible: false,
    right_icon_name:""
}
