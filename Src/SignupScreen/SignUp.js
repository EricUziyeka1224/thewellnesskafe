import React from 'react';
import { View, ImageBackground, Alert, StyleSheet, Text, StatusBar, ScrollView, NativeModules } from 'react-native';
import TopImage from '../Assets/top-bg.png';
import Button from '../Components/Button';
import PlaceHolder from '../Components/PlaceHolder';
import H from '../Components/Heading';
import BoldText from '../Components/BoldText';
import EmptySpace from '../Components/EmptySpace';
import InputForm from './Components/InputForm';
import TextInput from '../Components/TextInput';
import NetInfo from '@react-native-community/netinfo';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
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
    const  { isLoading,    isRegisterd,  isFailed } = nextProps.signUpReducer
    if(isRegisterd == true) {
     this.props.navigation.pop()
    } 
    if( isFailed == true ) {
      this.showAlert("Error", "Email and Password are not matched!")
    }
  } 

  goBack = () => {
    this.props.navigation.pop();
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

  validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }

  validateInfo = () => {
    if(this.state.name == "" || this.state.phone == "" || this.state.email == "" || this.state.password == "" ) {
      this.showAlert("Alert", "You have to input all info.")
      return false
    }
    if (!this.validateEmail(this.state.email)) {
      this.showAlert("Alert", "Invalid email.")
      return false;
    }
    if(this.state.password.length < 8) {
      this.showAlert("Alert", "Password must be at least 8 charactors.")
      return false
    }

    return true
  }
  render() {
    const { imageBackground, heading, placeHolderStyle, trailPlaceHolder } = Styles


    return (
      <View style={{ flex: 1}}>
        <ImageBackground
          source={TopImage}
          style={imageBackground}
        >
        <ScrollView>
        <Text style={heading}></Text>
        <PlaceHolder
          placeHolder={""}
          style={placeHolderStyle}
        />

        <PlaceHolder placeHolder={'Name'} style={{marginTop: 40, color: "#FFFFFF"}} />
        <TextInput style={{marginTop: '1.5%'}} onChangeText={(name) => this.setState({name})} />

        <PlaceHolder placeHolder={'Email address'} style={{color: "#FFFFFF"}} />
        <TextInput style={{marginTop: '1.5%'}} onChangeText={(email) => this.setState({email})} />

        <PlaceHolder placeHolder={'Phone number'} style={{color: "#FFFFFF"}} />
        <TextInput style={{marginTop: '1.5%'}} onChangeText={(phone) => this.setState({phone})} />

        <PlaceHolder placeHolder={'Password'} style={{marginTop: '2.5%', color: "#FFFFFF"}} />
        <TextInput style={{marginTop: '1.5%'}} onChangeText={(password) => this.setState({password})} secureTextEntry={true}  />


        <View style={{ marginTop: '6%' }}>
          <Button 
          text="Sign Up"
          onPress={() => {
            if(this.validateInfo())
              this.props.signUpActions.doRegister(this.state.name, this.state.email, this.state.phone, this.state.password)
          }} />
        </View>
       
        <BoldText
          onPress={this.goBack}
          text={'Already have an account?'}
          boldText={' Log in.'}
          containerStyle={{
            alignSelf: 'center',
            marginTop: 20,
            color: "#FFF",
          }}
        />
        </ScrollView>
        </ImageBackground>
    </View>
    )
  }
}

const Styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
  },
  heading: {
    marginTop: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#FFF",
    fontSize: 20
  },
  placeHolderStyle: {
    marginTop: 15,
    alignSelf: 'center',
    marginLeft: 0,
    color: "#FFFFFF"
  },
  trailPlaceHolder: {
    marginTop: '2.05%',
    color: '#9AAABB',
    fontSize: 13,
    marginLeft: 0,
    alignSelf: 'center',
    textAlign: 'center'
  }
});
export default SignUp;
