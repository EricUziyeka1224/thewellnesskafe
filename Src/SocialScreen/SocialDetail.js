import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, AsyncStorage, NativeModules} from 'react-native';
import { WebView } from "react-native-webview";
import CommentItem from "./Components/CommentItem";
import NewCommentForm from "./Components/NewCommentForm";
import Icons from '../Components/Icons';
import Config from '../Config';
import Moment from 'moment';
import CardView from 'react-native-cardview';
import StatusBar from '../Components/Statusbar';

import NetInfo from '@react-native-community/netinfo';


const ic_back = require("../Assets/back.png");
const ic_unlike = require("../Assets/ic_unlike.png");

class SocialDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLiked: 0,
      likeIndex: -1
    };
  }

  componentDidMount() {

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
          NativeModules.DevSettings.reload();
      } 
    });

    const { selectedItem, socials } = this.props.socialReducer
    if(selectedItem == -1) return(<View/>)

    const social = socials[selectedItem]    

    
    social.likes.forEach((user, likeIndex) => {
      if(user.userId == this.props.socialReducer.userId) {
        const isLiked = 1
        this.setState({isLiked, likeIndex})
        return;
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { isLiked } = nextProps.socialReducer
    this.setState({isLiked})
  }

  onComment = (text) => {
    if(text == "") {
      return
    }

    const { selectedItem, socials } = this.props.socialReducer
    const social = socials[selectedItem]    

    const userId = this.props.socialReducer.userId
    this.props.socialActions.commentNew({userId, socialId: social._id, text})
  }

  render() {
    
    const { selectedItem, socials } = this.props.socialReducer
    if(selectedItem == -1) return(<View/>)

    const social = socials[selectedItem]  

    let mediaTag;
    if ( social.video == "" ) {
      if(social.image == `${Config.file_path}`) {
        mediaTag = <View/>
      } else {
        mediaTag = <CardView style={{margin: 10, paddingBottom: 10}}
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}>
          <Text style={{
              color: 'black',
              fontSize: 15,
              alignSelf: "center",
              width: '95%',
              marginTop: 10,
              backgroundColor: 'transparent',
            }}>
            {social.text}
          </Text>
        </CardView>;
      }
    
    } else {
      mediaTag = <CardView style={{margin: 10, paddingBottom: 10}}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}>
                      <WebView
                        useWebKit={true}
                        style={{ width: "100%", height: 200 }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: social.video }} />
                    </CardView>;
    }
    
    

    let likeBtn
    if(this.state.isLiked == 0) {
      likeBtn = <TouchableOpacity 
        onPress={() => {
          const socialId = social._id
          const userId = this.props.socialReducer.userId
          const likeIndex = this.state.likeIndex
          this.props.socialActions.doLike({likeIndex, userId, socialId})
        }}
        style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          position: "absolute",
          justifyContent: 'center',
          alignItems: 'center',
          top: 10,
          right: 13,
          }}>
          <Image source={Icons.ic_like} style={{
            width: 30,
            height: 30,
            resizeMode: 'cover',
            marginTop: 3
          }} />
        </TouchableOpacity>
    } else {
      likeBtn = <TouchableOpacity 
        onPress={() => {
          const socialId = social._id
          const userId = this.props.socialReducer.userId
          const likeIndex = this.state.likeIndex
          this.props.socialActions.doDisLike({likeIndex, userId, socialId})
        }}
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          position: "absolute",
          justifyContent: 'center',
          alignItems: 'center',
          top: 10,
          right: 13
        }}>
        <Image source={ic_unlike} style={{
          width: 30,
          height: 30,
          resizeMode: 'cover',
          marginTop: 3
        }} />
      </TouchableOpacity>
    }

    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#FFF" barStyle="light-content" />
        <ScrollView contentContainerStyle={{paddingBottom: 10}}>
        <View style={{
            alignItems: 'center'
          }}>
            <CardView
            style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 10, shadowColor: "#000", marginTop: 30, marginBottom: 15 }} 
            cardElevation={10}
            cardMaxElevation={10}
            cornerRadius={10}>
              <Image source={{ uri: `${Config.file_path}${social.user.image}` }} style={{ width: "100%", height: "100%" }}/>
            </CardView>
          
          <Text style={{
            fontWeight: 'bold',
            marginLeft: 10,
            fontSize: 20,
          }}>
            {social.user.name}
          </Text>
        </View>
        
        {mediaTag}
  
        {likeBtn}
        
        

        <View style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
        }}>
          <Text style={{
            width: "50%",
            color: '#2e2e2e',
            fontSize: 12,
          }}>
            Likes: {social.likes.length}  Comments: {social.comments.length}
          </Text>
          <Text style={{
            width: "50%",
            color: '#2e2e2e',
            fontSize: 12,
            textAlign: "right"
          }}>
            {Moment(social.createdAt).format( 'MMM DD YYYY hh:mm A')}
          </Text>
        </View>
        
  
        <NewCommentForm  onComment={this.onComment}/>
  
        <View contentContainerStyle={{paddingBottom: 10}}>
          {social.comments.map((comment, key) => (
            <CommentItem key={key} 
              avatar = {`${Config.file_path}${comment.userImage}`}
              name = {comment.userName}
              text = {comment.text}/>
          ))}
        </View>
  
        <View style={{ height: 70 }}></View>

        <TouchableOpacity
            onPress={() => this.props.navigation.pop(1)}
            style={{
              position: "absolute",
              top: 10, left: 10,
              justifyContent: 'center',
            }}
            >
          <Image source={ic_back}
              style={{   width: 32, height: 32, resizeMode: 'cover', }} />
        </TouchableOpacity>
        
        </ScrollView>
        
      </View>
    )
  }
}

export default SocialDetail;
