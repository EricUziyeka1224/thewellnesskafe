import React, { Component } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
import {TextField} from 'react-native-material-textfield';
import CardView from 'react-native-cardview';

const ic_newimage = require("../Assets/ic_newimage.png");
const ic_video = require("../Assets/ic_video.png");
const ic_publish = require("../Assets/ic_publish.png");
const ic_close = require("../Assets/Group293.png");

class NewSocialForm extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {      
      addvideo: null,
      avatarSource: null,
      imageuri: null,
      text: "",
      video: ""
    };
  }

  submit = () => {
    const { avatarSource, text, video } = this.state
    this.props.onPost({avatarSource, text, video});
    this.setState({avatarSource: null, video: "", addvideo: null, text: "", imageuri: null})
  }

  getimagesource = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
          imageuri: response.uri
        });
      }
    });
  }
  render() {   
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
          <TouchableOpacity
            onPress={() => this.getimagesource()}
            style={{
              marginLeft: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={ic_newimage} 
            style={{
              marginLeft: 10,
              width: 20,
              height: 20,
              resizeMode: "stretch",
            }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({
              addvideo: 'set'
            })}
            style={{
              marginRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={ic_video} style={{
              width: 20,
              height: 20,
              resizeMode: 'stretch',
            }} />
          </TouchableOpacity>
          <TextInput
            multiline    
            maxLength = {500}
            placeholder="Input Description"
            onChangeText = {(text) => this.setState({text})}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 5,
              borderWidth: 0.5,
              width: '70%',
              alignSelf: 'center',
              borderRadius: 10,
              borderColor: "#000000"
            }}
          >
            {this.state.text}
          </TextInput>
          
          <TouchableOpacity
            style={{
              marginRight: 5,
              justifyContent: 'center',
            }}
            onPress={this.submit}
          >
            <Image source={ic_publish} style={{
              width: 20,
              height: 20,
              marginRight: 10,
              resizeMode: 'stretch',
            }} />
          </TouchableOpacity>
        </View>
        <View style={{ display: this.state.avatarSource == null ? 'none' : 'flex' }}>
          <CardView
          style={{margin: 20}}
          cardElevation={10}
          cardMaxElevation={10}
          cornerRadius={10}>
          <Image source={this.state.avatarSource} style={{
            width: '100%',
            height: 250,
          }} />
          <TouchableOpacity
            onPress={() => this.setState({
              avatarSource: null
            })}
            style={{
              marginRight: 25,
              justifyContent: 'center',
              position: 'absolute',
              right: -8,
              top: 15,
            }}
           >
            <Image source={ic_close} style={{width:18, height:18, resizeMode: 'stretch'}} />
          </TouchableOpacity>
          </CardView>
        </View>
        <View style={{ display: this.state.addvideo == null ? 'none' : 'flex', paddingLeft: 20, paddingRight: 20 }}>          
          <TextField
            label="Input Video Link"
            onChangeText={(video) => this.setState({video})}
           >
          </TextField>
          <TouchableOpacity
            onPress={() => this.setState({
              addvideo: null
            })}
            style={{
              marginRight: 25,
              justifyContent: 'center',
              position: 'absolute',
              right: -8,
              top: 15,
            }}
           >
            <Image source={ic_close} style={{width:18, height:18, resizeMode: 'stretch'}} />
          </TouchableOpacity>
        </View>  
    </View>
    );
  }
}
const styles = StyleSheet.create({
  iconitem: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    resizeMode: 'cover',
  },
  iconitem1: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    resizeMode: 'cover',
  },
  imageitem: {
    width: 98,
    height: 98,
    borderRadius: 98 / 2,
    resizeMode: 'cover',
  },
  imagebutton: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  iconbutton: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    elevation: 5,
  },
  buttoncontainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10
  },
  graybar: {      
    height: 1,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 20
  },
  titletext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    padding: 20,
  },
  topbar: {
    height: 60,
    width: '100%'
  },
  footer: {
    height: 60,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  }
})
export default NewSocialForm