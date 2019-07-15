import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    View,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { BottomButton, CommonCalculator } from '../../Components';
import { Icon } from 'react-native-elements'
import { Color } from '../../utils/Colors';
import {
    ExpenceScreenLoad
} from '../../Actions';
import { styles } from '../../Style/addExpanceStyles'
import Ripple from 'react-native-material-ripple';


class AddExpenceScreen extends Component {
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
                            <Icon name="arrow-back" size={22}/>
                        </View>
                </Ripple>
            ),
            title: "Add Expense",
            headerTitleStyle: styles.headerTitleStyle
        }
    }
    componentDidMount() {
        this.props.ExpenceScreenLoad()
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
                    icon="-"
                    income={this.state.first}
                    handleButtonPress={this.handleButtonPress.bind(this)}
                    Income_View_color={Color.RED_COLOR}
                    selected_Icon={this.props.selected_money_icon?this.props.selected_money_icon: "$"}
                />
                {   <View style={{  }}>
                    <BottomButton title="Save" onSubmitData={() => 
                        this.props.navigation.navigate("ExpanceDetail",
                            item ?
                                { item: item, income: this.state.first } :
                                { income: this.state.first })} />
                    </View>
                }

            </SafeAreaView>
        );
    }
}
const mapStateToProps = ({ addExprence }) => {
    const {
        add_expence,
        selected_money_icon
    } = addExprence;
    return {
        add_expence,
        selected_money_icon
    };
}
export default connect(mapStateToProps, {
    ExpenceScreenLoad
})(AddExpenceScreen);