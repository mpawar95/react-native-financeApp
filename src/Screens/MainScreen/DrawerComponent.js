
import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import { styles } from '../../Style/DrawerComponetStyles'
import { ScrollView, Text, View, FlatList, Platform } from 'react-native';
import { Icon } from "react-native-elements";
import { Color } from '../../utils/Colors';
import Ripple from 'react-native-material-ripple';
import {
    onPressDrawerItem,
    updateProps,
    drawerComponentLoad,
} from '../../Actions'

class DrawerComponent extends Component {

    navigateToScreen = (route) => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.closeDrawer();
    }
    onItemPress = (item) => {
        this.props.onPressDrawerItem(item.key, item.name)
        this.navigateToScreen(this.props.selected_name)
        this.setState({
        }, () => {
            this.props.updateProps(item.name, item.key)
        })
    }
    componentDidMount(){
    }
    componentWillReceiveProps(newProps){
        
    }
    render_item = ({ item, index }) => {
        return (
            <View>
                {this.renderSeparator()}
                <Ripple onPress={() => this.onItemPress(item)} >
                    <View key={index}
                        style={item.key == this.props.selected_index ?
                            styles.itemSelected
                            :
                            styles.itemNotSelected
                        }>
                        <View
                            style={
                                item.key == this.props.selected_index ?
                                    styles.viewHeight
                                    :
                                    styles.withoutHeight
                            }>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Icon
                                color={
                                    item.key == this.props.selected_index ?
                                        Color.PRIMARY
                                        :
                                        Color.DEFAULT_COLOR
                                }
                                name={item.icon}
                                size={30}
                            />
                        </View>
                        <Text style={{ marginLeft: 10 }} >{item.name}</Text>
                    </View>
                </Ripple>
            </View>
        )
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };
    render() {
        return (
            <View style={{ marginBottom: 5, flex: 1 }}>
                <View style={Platform.OS == "ios" ? styles.ifIOS : styles.isANDROID}>
                    <Text style={styles.titleFirst}>Peri</Text><Text style={styles.titleSub}>Fy</Text>
                </View>
                <ScrollView>
                    <FlatList
                        extraData={this.props.selected_index}
                        data={this.props.data}
                        renderItem={this.render_item}
                        keyExtractor={(item) => item.key.toString()}
                    />
                    {this.renderSeparator()}
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = ({ drawer }) => {
    const {
        data,
        selected_index,
        selected_name,
        seatedPropsKey,
        seatedPropsName
    } = drawer;
    return {
        data,
        selected_index,
        selected_name,
        seatedPropsKey,
        seatedPropsName
    };
}
export default connect(mapStateToProps, {
    onPressDrawerItem,
    updateProps,
    drawerComponentLoad,
})(DrawerComponent);