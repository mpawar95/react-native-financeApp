import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export class ColorPickerDialog extends Component {


    render() {
        const { visible, title, onTouchOutside, animationType, onYesPress, onNoPress, renderItem, data, keyExtractor, extraData, positiveButtonTitle, negativeButtonTitle } = this.props;
        return (
            <View style={{ flexDirection: "row", marginLeft: 5, marginRight: 5 }}>
                <ConfirmDialog
                    visible={visible}
                    title={title}
                    onTouchOutside={onTouchOutside}
                    animationType={animationType}
                    positiveButton={{
                        title: positiveButtonTitle,
                        onPress: onYesPress
                    }}
                    negativeButton={{
                        title: negativeButtonTitle,
                        onPress: onNoPress
                    }} >
                    <View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            numColumns={4}
                            extraData={`${extraData}`}
                        />
                    </View>
                </ConfirmDialog>
            </View>
        )
    }
}
ColorPickerDialog.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onTouchOutside: PropTypes.func,
    animationType: PropTypes.string,
    onYesPress: PropTypes.func,
    onNoPress: PropTypes.func,
    renderItem: PropTypes.func,
    keyExtractor: PropTypes.func,
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.shape({}),
    ]),
    extraData: PropTypes.string,
    positiveButtonTitle: PropTypes.string,
    negativeButtonTitle: PropTypes.string

}
ColorPickerDialog.defaultProps = {
    visible: false,
    title: "",
}
