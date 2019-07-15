
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { BottomButton, CommonCalculator } from '../../Components';
import { Icon } from 'react-native-elements'
import { Color } from '../../utils/Colors';
import { styles } from '../../Style/AddIncomeStyles';
import { changeText, IncomeScreenLoad } from '../../Actions';
import Ripple from 'react-native-material-ripple';

class AddIncomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            first: '0',
            second: '',
            operator: '',
            result: 0,
            isResult: false,
        };
    }
    static navigationOptions = ({ navigation }) => {
        const navigator = navigation.getParam("navigator")
        return {
            headerLeft: (
                <Ripple onPress={() => navigator.pop()}>
                    <View style={styles.backIcon}>
                        <Icon name="arrow-back" size={22} />
                    </View>
                </Ripple>
            ),
            title: "Add Income",
            headerTitleStyle: styles.headerTitleStyle
        }
    }
    componentDidMount() {
        this.props.IncomeScreenLoad()
        const { navigation } = this.props;
        this.props.navigation.setParams({ navigator: navigation })
        const item = this.props.navigation.getParam('item');
        item === undefined ?
            this.setState({
                first: "0"
            })
            :
            this.setState({
                first: item.newIncome
            })
    }
    componentDidUpdate() {
    }
    handleButtonPress = (button) => {

        const { isResult } = this.state;

        let { first, second, operator } = this.state;

        switch (button) {
            case '0':
            if(first.length < 6){
                if (!isResult) {
                    if (!operator) {
                        if (first[0] !== '0' || first.length !== 1) {
                            first += '0';
                        }
                    } else if (second[0] !== '0' || second.length !== 1) {
                        second += '0';
                    } else {
                        second = '0';
                    }

                    this.setState({ first, second, operator });
                } else {
                    this.setState({
                        first: '0',
                        second: '',
                        operator: '',
                        result: 0,
                        isResult: false,
                    });
                }
            }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '00':
            if(first.length < 6){
                if (!isResult) {
                    if (!operator) {
                        if (first[0] === '0' && first.length === 1) {
                            first = button;
                        } else {
                            first += button;
                        }
                    } else if (second[0] === '0' && second.length === 1) {
                        second = button;
                    } else {
                        second += button;
                    }
                    this.setState({ first, second, operator });
                } else {
                    this.setState({
                        first: button,
                        second: '',
                        operator: '',
                        result: 0,
                        isResult: false,
                    });
                }
            }
                break;
            case '.':
            if(first.length < 6){
                if (!operator) {
                    if (!first.includes('.')) {
                        first += button;
                    }
                } else if (!second.includes('.')) {
                    second += button;
                }
                this.setState({ first, second, operator });
            }
                break;
            case 'C':
                this.setState({
                    first: "0"
                })
                break;
            case 'CE':
                this.setState({
                    first: this.state.first.slice(0, -1)
                })
                break;
            case '':
                break;
            default:
                break;
        }
    }

    render() {
        const item = this.props.navigation.getParam('item');
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <CommonCalculator
                    icon="+"
                    income={this.state.first}
                    selected_Icon={this.props.selected_money_icon ? this.props.selected_money_icon : "$"}
                    handleButtonPress={this.handleButtonPress.bind(this)}
                />
                {
                    <View style={{  }}>
                        <BottomButton title="Save" onSubmitData={() =>
                            this.props.navigation.navigate("IncomeDetail", item ? { item: item, income: this.state.first } : { income: this.state.first })} />
                    </View>
                }
            </SafeAreaView>
        );
    }
}
const mapStateToProps = ({ addIncome }) => {
    const {
        add_income,
        selected_money_icon
    } = addIncome;
    return {
        add_income,
        selected_money_icon
    };
}
export default connect(mapStateToProps, {
    changeText,
    IncomeScreenLoad
})(AddIncomeScreen);