
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import { BottomButton } from '../../Components'
import { Color } from '../../utils/Colors';
const slides = [
  {
    key: '0',
    title: 'Hold the keys of your spendings',
    image: require('../../../assets/images/dollar.jpg')
  },
  {
    key: '1',
    title: 'Focus on your dreams, not cost-cutting',
    image: require('../../../assets/images/euro.png')
  },
  {
    key: '2',
    title: 'Give your finacnce a prosperous life',
    image: require('../../../assets/images/pound.png')
  },
];

class IntroAppScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_visited: false
    }
  }
  _renderItem = (item) => {
    return (
      <View style={{ flex: 1, margin: 10, justifyContent: "center", alignItems: "center" }}>
        <Image source={item.image} style={{ height: 250, width: 250 }} />
        <Text >{item.title}</Text>
      </View>
    )
  }
  onSubmitData = () => {
    this.setState({
      is_visited: true
    }, () => {
      AsyncStorage.setItem("is_visited", JSON.stringify(this.state.is_visited)) 
      this.props.navigation.navigate("Main")
    })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
          <AppIntroSlider
            slides={slides}
            renderItem={this._renderItem}
            activeDotStyle={{ backgroundColor: Color.PRIMARY }}
            dotStyle={{ backgroundColor: Color.LIGHT_FONT_COLOR }}
            showNextButton={false}
            showDoneButton={false}
          />
        </View>
        <BottomButton
          title="Get Started"
          onSubmitData={this.onSubmitData} />
      </SafeAreaView>
    );
  }
}
export default IntroAppScreen;