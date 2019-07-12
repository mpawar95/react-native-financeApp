
import React from 'react';
import Application from './Navigations/AppNavigator';
import { Provider } from 'react-redux';
import store from './Store';
export default class App extends React.Component{
  render() {
    return (
      <Provider store={store}> 
        <Application/>   
      </Provider>
    );
  }
}
