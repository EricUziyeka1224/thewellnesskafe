import React, { Component } from 'react';
import {
  NativeModules,
  ScrollView,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar ,
  View,
  Alert,
Linking,
  AsyncStorage
} from 'react-native';
import topImage from '../Assets/top-bg.png';
import logoImage from '../Assets/logo.png';
import Button from '../Components/Button';
import PlaceHolder from '../Components/PlaceHolder';
import Input from '../Components/TextInput';
import BoldText from '../Components/BoldText';

import NetInfo from '@react-native-community/netinfo';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "" 
    }

  } 

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
          NativeModules.DevSettings.reload();
      } 
    });

  }
  componentWillReceiveProps(nextProps) {
    const  { isLoading,    isAuthenticated,    accountInfo,    isFailed } = nextProps.loginReducer
    if(isAuthenticated == true) {
      //Success
      this.addToAsyncStorage(accountInfo);
    } else if( isFailed == true ) {
      this.showAlert("Error", "Email and Password are not matched!")
    }
  } 

  render() {
    const { imageBackground, heading, placeHolderStyle, bottomText, logo, logoAppText } = Styles;

    return (
      <View style={{ flex: 1 }}>
      
        <ImageBackground
          source={topImage}
          style={imageBackground}
        >
        <ScrollView>
          <View style={{flexDirection: "row", justifyContent: "center", width: "100%", marginTop: 100}}>
            <ImageBackground
              source={logoImage}
              resizeMode={'cover'}
              style={logo}
            />
          </View>
          <PlaceHolder placeHolder={'Email Address'} style={{ marginTop: 40, color:"#FFFFFF" }} />
          <Input 
            style = {{color: "#FFFFFF"}}
            onChangeText={email => this.setState( {
              ...this.state, email
            } )} />
          <PlaceHolder placeHolder={'Password'} style={{ marginTop: '2.85%', color:"#FFFFFF" }} />
          <Input 
            style = {{color: "#FFFFFF"}}
            onChangeText={password => this.setState( {
              ...this.state, password
            } )} 
            secureTextEntry={true} />
          <View style={{ marginTop: '6%' }}>
            <Button onPress={this.doLogin} />
            <BoldText
              text={'Dont have an account?'}
              boldText={' Sign up.'}
              containerStyle={{ marginTop: 40 }}
              onPress={this.navigateToSignUp}
            />
          </View>
          <BoldText
            text={'Privacy Policy'}
            boldText={''}
            containerStyle={bottomText}
            onPress={this.privacyOpen}
          />
          </ScrollView>
        </ImageBackground>

        
      
      </View>
    )
  }

  doLogin = () => {
    const email = this.state.email;
    const password = this.state.password;
    //this.props.navigation.push("Tabs");
    if( this.validateInfo(email, password) )
       this.props.authActions.tryLogin(email, password)
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

  validateInfo = (email, password) => {
    if (email == "" || password == "") {
      this.showAlert("Alert", "Please input email and password.")
      return false;
    } else if (!this.validateEmail(email)) {
      this.showAlert("Alert", "Invalid email.")
      return false;
    } else if (password.length < 8) {
      this.showAlert("Alert", "Password must be at least 8 charactors.")
      return false;
    }
    return true
  }

  validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }

  navigateToSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  privacyOpen = () => {
    Linking.openURL("https://thewellnesskafe.com/privacy-policy")
  }

  addToAsyncStorage = async (accountInfo) => {
    try {      
     await AsyncStorage.setItem("accountInfo", JSON.stringify(accountInfo))
     this.props.navigation.navigate("Tabs");
    } catch (error) {
      console.log(error)
    }
  }
}

const Styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
  },
  heading: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  placeHolderStyle: {
    marginTop: 15,
    alignSelf: 'center',
    marginLeft: 0,
    color: "#FFFFFF"
  },
  bottomText: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  logoAppText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: "center",
    backgroundColor: 'transparent',
  },
  logo: {
    width: 300,
    height: 192
  }
});
export default Login;
