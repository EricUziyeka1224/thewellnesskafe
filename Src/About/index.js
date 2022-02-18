import React from 'react';
import { WebView } from "react-native-webview";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../Action'

import { NativeModules } from 'react-native'
import NetInfo from '@react-native-community/netinfo';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

const ic_back = require("../Assets/back.png");

class AboutScreen extends React.Component {
    static navigationOptions = {
        header: null,
        };
    constructor() {
        super();
        this.state = { 
          url: "http://loofapp.online/privacy-policy"
        }  
    }

    componentDidMount() {

      const unsubscribe = NetInfo.addEventListener(state => {
        if (!state.isConnected) {
            NativeModules.DevSettings.reload();
        } 
      });

    }

   componentWillMount()  {
      const { data } = this.props.appReducer
      console.log(data);
      const dataObj = JSON.parse(data);
      console.log("dataObj_----------------------------------------------------")
      console.log(dataObj.flag)
      if(dataObj.flag == "1") this.setState({url : dataObj.url});
    }

    render() {
        return (
            <View
               style={{flex:1}}
            >
              <WebView
                source={{uri: this.state.url}}
                style={{flex:1, marginTop: this.state.url == "http://loofapp.online/privacy-policy" ? 50 : 0, marginBottom: this.state.url == "http://loofapp.online/privacy-policy" ? 50 : 0}}
              />
              <TouchableOpacity
                  onPress={() => this.props.navigation.pop(1)}
                  style={{
                    position: "absolute",
                    top: 10, left: 10,
                    justifyContent: 'center',
                  }}
                  >
                <Image source={ic_back}
                    style={{   width: 35, height: 35, marginTop: 30, marginLeft: -5, resizeMode: 'cover', display:  this.state.url == "http://loofapp.online/privacy-policy" ? "flex" : "none" }} />
              </TouchableOpacity>         
            </View>
        );
    }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = state => ({
    appReducer: state.appReducer
})

const mapDispatchToProps = dispatch => ({
    appActions: bindActionCreators(AppActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutScreen);