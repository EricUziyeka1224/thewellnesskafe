import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { AppNavigator } from './Navigator'
import { Provider } from 'react-redux'
import { store } from './Src/Store'

import {View, ImageBackground} from 'react-native'

import NetInfo from '@react-native-community/netinfo';

import topImage from './Src/Assets/top-bg.png';

const Navigator = createAppContainer(AppNavigator);


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connection_Status : 'Offline'
    }
  }

  componentDidMount() {
    // NetInfo.fetch().then(state => {
    //    if (state.isConnected) {
    //       this.setState({connection_Status: 'Online'});
    //     } else {
    //       this.setState({connection_Status: 'Offline'});
    //     }
    // });

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
          this.setState({connection_Status: 'Online'});
        } else {
          this.setState({connection_Status: 'Offline'});
      } 
    });
    // The fetch is not needed as the listen will send the current state when you subscribe to it
  }


  render() {

    const response = this.state.connection_Status == 'Online' ? 
                      (
                        <Provider store={store}>
                          <Navigator />
                        </Provider>
                      ) :
                      ( 
                        <View style={{ flex: 1 }}>
      
                          <ImageBackground
                            source={topImage}
                            style={{
                              flex: 1,
                              width: null,
                              height: null,
                              resizeMode: 'cover'
                            }}
                          >

                          </ImageBackground>
                        </View>
                      )
    return response;
  }
}
