import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../Action'

import OneSignal from 'react-native-onesignal';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
        };
    constructor() {
        super();
    }


    componentWillMount() {
        this.props.appActions.getPrivacyInfo();
        OneSignal.init("57b7d137-a2e0-4677-92e6-4f3889d4052b");

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillReceiveProps(nextProps) {
        const  { data } = nextProps.appReducer
        if(data != null) {
            console.log("009------------------------------------------------------------")
            const dataObj = JSON.parse(data)

            console.log(dataObj.flag)
            if(dataObj.flag != "1") this._privacySuccess()
            else this._privacyFailed()
        }
    } 


    componentWillUnmount() {
 
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived = (notification) => {
        console.log("Notification received: ", notification);
    }

    onOpened = (openResult) => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds = (device) => {
        console.log('Device info: ', device);
        this.props.appActions.registerOneSignalId("0", device.userId)
    }

    // Fetch the token from storage then navigate to our appropriate place
    _privacySuccess = async () => {
        const accountInfo = await AsyncStorage.getItem('accountInfo');

        console.log(accountInfo);
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(accountInfo ? 'Tabs' : 'Login');
    };

    _privacyFailed = async () => {
//const accountInfo = await AsyncStorage.getItem('accountInfo');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate('About');
//this.props.navigation.navigate(accountInfo ? 'Tabs' : 'Login');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    appReducer: state.appReducer
})

const mapDispatchToProps = dispatch => ({
    appActions: bindActionCreators(AppActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthLoadingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});