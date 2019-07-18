
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {MainHeader} from '../../Components';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { Color } from '../../utils/Colors';
import {styles} from '../../Style/CategoryStyle';
import { Icon } from "react-native-elements";
import ActionButton from 'react-native-action-button';
import {
  getCategories,
  receivePropsCategoryLoad
} from '../../Actions'
class CategorieScreen extends Component {
  constructor(){
    super()
    this.state = {
      selectedIndex: 0,
    };
  }
  componentWillReceiveProps(newProps){
    if(newProps.seatedPropsName == "Categories"){
      this.props.receivePropsCategoryLoad()
      this.props.getCategories("Income")
    }
  }
  componentDidMount(){
    this.props.getCategories("Income")
  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    } ,()=> this.state.selectedIndex == 0 ?
     this.props.getCategories("Income") : this.props.getCategories("Expence")  
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          zIndex: -1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
  renderPage=(item)=>{
      return (
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("EditCategory", { item: item })}>
          <View style={{ flex: 1, flexDirection: "row", marginLeft: 10 }}>
            <View style={{ margin: 5 }}><Icon name={item.item.selected_Icon} size={32} color={Color.LIGHT_FONT_COLOR}/></View>
            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 5 }}>
              <Text style={{color:Color.LIGHT_FONT_COLOR}}>{item.item.category_name} </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
  }
  onRefresh=()=>{
    this.props.getCategories("Income")
  }
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <MainHeader onLeftPress={()=> this.props.navigation.openDrawer()}/>
          <View style={{flex:1}}>
            <Text style={{marginLeft:10,marginTop:20}}>Categories</Text>
            <SegmentedControlTab
                    values={['Income', 'Expance']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    borderRadius={6}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.tabStyle}
                    allowFontScaling={false}
                    tabTextStyle={styles.tabTextStyle}
                    />
              <View style={{marginTop:10}}>
                {this.renderSeparator()}
              </View>
              <FlatList
                data={this.props.category_list}
                renderItem={this.renderPage}
                keyExtractor={item=>item.id}
                ItemSeparatorComponent={this.renderSeparator}
                // refreshing={this.props.refreshing}
                // onRefresh={this.onRefresh()} 
                />
                
            <ActionButton buttonColor={Color.PRIMARY} onPress={() => this.props.navigation.navigate("NewCategory")} />
          </View>
      </SafeAreaView>
    ); 
  }
}
const mapStateToProps = ({ categories }) => {
  const {
    category_list,
    refreshing,
    seatedPropsKey,
    seatedPropsName,
  } = categories;
  return {
    category_list,
    refreshing,
    seatedPropsKey,
    seatedPropsName,
  };
}
export default connect(mapStateToProps, {
  getCategories,
  receivePropsCategoryLoad
})(CategorieScreen);