import React from 'react';
import { ImageBackground, View, Text, AsyncStorage, Image, Alert, NativeModules } from 'react-native';
import Config from '../Config';
import { Right } from 'native-base';
import CardView from 'react-native-cardview'
import Moment from 'moment';

import NetInfo from '@react-native-community/netinfo';

import back from '../Assets/11.jpg';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId: -1
    }    
  } 

  componentWillMount() {
    AsyncStorage.getItem('accountInfo').then((accountInfo) => {
      const userId = JSON.parse(accountInfo).data.user._id
      this.setState({userId})
      this.props.notificationActions.loadNotifications(userId)   
      this.props.appActions.setReadAllNotification()   
    });
  }

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
          NativeModules.DevSettings.reload();
      } 
    });
  }

  render() { 
    return(
        <View style={{flex: 1, backgroundColor: "#FFF"}}> 
          <View style={{height: 50}} />
          {this.props.notificationReducer.notifications.map((notification, key) => (
            <View style={{borderBottomWidth:1, borderBottomColor: "#e3e2e2"}}>
              <View style={{flexDirection: "row", width: "90%", margin: 10}}>
                  <Text 
                    style={{color: '#FF0000',
                            position:'absolute',
                            top:1,
                            left:1,
                            margin: -1,
                            minWidth:13,
                            height:13,
                            borderRadius:7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FF0000', 
                            textAlign: "center",  
                            fontSize: 9 }}>0</Text>
                  <Text style={{marginLeft: 20, marginBottom: 10}}>
                    {notification.content}
                  </Text>              
              </View>
              <Text style={{textAlign: "right", marginBottom: 10, color: "#2e2e2e", fontSize: 12, marginRight: 20}}>
                {Moment(notification.createdAt).format( 'MMM DD YYYY hh:mm A')}
              </Text>
            </View>          
          ))}
        </View>
    )
  }
}

export default Notification;
