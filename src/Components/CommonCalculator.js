import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import { Color } from '../utils/Colors';
import { styles } from '../Style/AddIncomeStyles';
import {CalculatorButton} from './CalculatorButton';
export class CommonCalculator extends Component {

    render() {
        const { handleButtonPress, income,Income_View_color,selected_Icon,icon } = this.props;
        return (
            <View style={{flex:1}}>
                <View style={{ flex: 1, backgroundColor: Income_View_color === Color.PRIMARY ?  Color.PRIMARY : Color.RED_COLOR}}>
                    <View style={styles.centerTextView}>
                        <Text style={styles.plusIcon}>{icon}</Text>
                        <Text style={styles.dollarIcon}>{selected_Icon}</Text>
                        <Text style={styles.textView}>{income}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: Color.KEYBOARD_COLOR,marginBottom:50 }}>

                    <View style={styles.row}>
                        <CalculatorButton operator={'1'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'2'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'3'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'C'} handleButtonPress={handleButtonPress} />
                    </View>

                    <View style={styles.row}>
                        <CalculatorButton operator={'4'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'5'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'6'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'CE'} handleButtonPress={handleButtonPress} />
                    </View>

                    <View style={styles.row}>
                        <CalculatorButton operator={'7'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'8'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'9'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={''} handleButtonPress={handleButtonPress} />
                    </View>

                    <View style={styles.row}>
                        <CalculatorButton operator={'0'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'00'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={'.'} handleButtonPress={handleButtonPress} />
                        <CalculatorButton operator={''} handleButtonPress={handleButtonPress} />
                    </View>

                </View>
            </View>
        )
    }
}
CommonCalculator.propTypes = {
    income:PropTypes.string.isRequired,
    handleButtonPress:PropTypes.func,
    Income_View_color:PropTypes.string,
    selected_Icon:PropTypes.string,
    icon:PropTypes.string
}
CommonCalculator.defaultProps = {
    income:"0",
    Income_View_color:Color.PRIMARY
}
