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

const ic_publish = require("../Assets/ic_publish.png");

class NewCommentForm extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {      
      text: ""
    };
  }
  
  submit = () => {
    this.props.onComment(this.state.text)
  }

  render() {   
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
          marginHorizontal: 10
          }}>
          <TextInput
            multiline    
            maxLength = {500}
            placeholder="Input Comment"
            onChangeText = {(text) => this.setState({text})}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 5,
              borderBottomWidth: 0.5,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              borderColor: "#000"
            }}
          >
          </TextInput>
          <TouchableOpacity
            onPress = {this.submit}
            style={{
              marginLeft:10, 
              marginRight: 15,
              justifyContent: 'center',
            }}
          >
            <Image source={ic_publish} style={{width:20, height: 20, resizeMode: 'stretch'}} />
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
export default NewCommentForm