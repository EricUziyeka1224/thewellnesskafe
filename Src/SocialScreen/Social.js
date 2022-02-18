import React from 'react';
import {ImageBackground, View, ScrollView, TouchableOpacity, AsyncStorage, Alert, NativeModules} from 'react-native';
import SocialItem from './Components/SocialItem';
import NewSocialForm from'./Components/NewSocialForm';
import Config from '../Config';
import Moment from 'moment';
import CardView from 'react-native-cardview'
import StatusBar from '../Components/Statusbar';

import back from '../Assets/11.jpg';
import NetInfo from '@react-native-community/netinfo';

class Social extends React.Component {

  componentDidMount() {

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
          NativeModules.DevSettings.reload();
      } 
    });

    AsyncStorage.getItem('accountInfo').then((accountInfo) => {
      const userId = JSON.parse(accountInfo).data.user._id
      this.props.socialActions.setUserId(userId)
      this.props.socialActions.loadSocialList()
    });     
  }

  showAlert = (title, content) => {
    Alert.alert(
      title,
      content,
      [
        {text: 'Dismiss', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
    );
  }

  onPost = ({avatarSource, text, video}) => {
    if(avatarSource == null && text == "" && video == "") {
      return
    }
    const userId = this.props.socialReducer.userId
    this.props.socialActions.postNew({userId, avatarSource, text, video})
  }

  render() {     

    const { isLoading , socials } = this.props.socialReducer
    return(
      <View style={{ flex: 1 }}>  
        <ImageBackground
            source={back}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover'
            }}
          >    
          <StatusBar backgroundColor="#FFF0" barStyle="light-content" />
          <ScrollView contentContainerStyle={{paddingBottom: 10}}>
            <NewSocialForm onPost={this.onPost}/>
            {socials.map((social, key) => (
              <CardView
              style={{marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
              }}
              cardElevation={10}
              cardMaxElevation={10}
              cornerRadius={10}>
              <TouchableOpacity key={key} onPress={() => {
                  this.props.socialActions.selectSocialItem(key)
                  this.props.navigation.navigate('SocialDetailScreen')
                }
              }>
                <SocialItem  avatar = {`${Config.file_path}${social.user.image}`}
                  name = {social.user.name}
                  postDate = {Moment(social.createdAt).format( 'MMM DD YYYY hh:mm A')}
                  imageurl = {`${Config.file_path}${social.image}`}
                  videourl = {social.video}
                  text = {social.text}
                  commentCnt = {social.comments.length}
                  likeCnt = {social.likes.length} />
              </TouchableOpacity>
              </CardView>
            ))}          
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default Social;