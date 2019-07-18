import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import { Icon, Header } from "react-native-elements";
import {Color} from '../utils/Colors';

export class MainHeader extends Component {

    iconVisible = () => {
        const { onRightPress, is_right_icon_visible, right_icon_name } = this.props;
        if (is_right_icon_visible) {
            return (
                <Icon name={right_icon_name}
                    size={30}
                    color={Color.PRIMARY}
                    onPress={onRightPress} 
                />
            )
        } 
    }
    rightComponent = () => {
        return (this.iconVisible())
    }
      leftComponent=()=>{
        const { onLeftPress } = this.props;
          return (
              <View style={{ flexDirection: "row" }}>
                  <Icon name="menu"
                      size={30}
                      color="#bcb3b3"
                      onPress={onLeftPress} />
                  <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                      <Text style={{ fontWeight: '700', color: "#000000", fontSize: 24, width: 45 }}>Peri</Text>
                      <Text style={{ fontWeight: '700', color: "#6c9961", fontSize: 24 }}>Fy</Text>
                  </View>
              </View>
          )
      }
    render() {
        return (
            <Header
                containerStyle={{ backgroundColor: Color.WHITE_COLOR ,
                height:44,
                paddingTop:0
             }}
                leftComponent={this.leftComponent}
                rightComponent={this.rightComponent}
            />
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
