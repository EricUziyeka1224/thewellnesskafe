import React, { Component,   Fragment } from 'react';
import { Container, Content, Footer } from 'native-base';
import StatusBar from '../Components/Statusbar';

import { NativeModules } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {
  SafeAreaView,
  Picker,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Button,
  AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icons from '../Components/Icons';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Config from '../Config';
import CardView from 'react-native-cardview';
import countyCityState from "countrycitystatejson";

import AppHeader from "../Components/AppHeader";

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


class Profile extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      accountInfo: null,
      avatarSource: null,
      profileImage: null,
      dataarr: [],
      email: "",
      name: "",
      phone: "",
      password: "",
      state: "",
      city: ""
    };
  }

  getimagesource = () => {
    ImagePicker.showImagePicker(options, (response) => {
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
        });
      }
    });
  }

  showlistview = () => {
    let {
      dataarr
    } = this.state;
    if (dataarr.length == 0) {
      return
    }
    return (
         
      <View>
        {
          dataarr.map((item, key) => (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between'
              }}
            >
              <Text style={{
                width: '60%',
                fontSize: 15,
              }}>
                {item.campaignName}
              </Text>
              <Text style={{
                width: '25%',
                fontWeight: 'bold',
                fontSize: 15,
                color: '#2e2e2e'
              }}>
                {'$' + item.amount}
              </Text>
            </View>
          ))
        }
      </View>
    )
  }

  componentDidMount() {

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
          NativeModules.DevSettings.reload();
      } 
    });

    AsyncStorage.getItem('accountInfo').then((accountInfo) => {
        if(accountInfo){
            let myAccount = JSON.parse(accountInfo)
            this.setState({
              accountInfo: myAccount,
              profileImage: `${Config.file_path}${myAccount.data.user.image}`,
              dataarr: myAccount.data.donates,
              email: myAccount.data.user.email,
              name: myAccount.data.user.name,
              phone: myAccount.data.user.phone,
              state: myAccount.data.user.state,
              city: myAccount.data.user.city});
        }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {isSuccess, isFailed, accountInfo} = nextProps.profileReducer
    
    if(isSuccess) {
      this.showAlert("Success", "You successfully updated your profile.")

      AsyncStorage.setItem( 'accountInfo', JSON.stringify( accountInfo ) );
    } else if(isFailed) {
      this.showAlert("Error", "Updating profile failed.")
    }
  }

  signOut = () => {
    AsyncStorage.removeItem('accountInfo').then(() => {
        this.props.navigation.navigate("Login")
    });
  }

  doUpdate = () => {
    if(this.validateProfileInfo()) 
      AsyncStorage.getItem('accountInfo').then((accountInfo) => {
        const userId = JSON.parse(accountInfo).data.user._id
        this.props.profileActions.updateProfile(userId, this.state.avatarSource, this.state.name, this.state.email, this.state.phone, this.state.password, this.state.state, this.state.city)
      }); 
  }

  validateProfileInfo = () => {
    if(this.state.name == "" || this.state.email == "" || this.state.phone == "") {
      this.showAlert("Alert", "You cannot submit data with empty value except for password.")
      return false
    }
    if(!this.validateEmail(this.state.email)) {
      this.showAlert("Alert", "Invalid email.")
      return false
    }
    if(this.state.password != "" && this.state.password.length < 8) {
      this.showAlert("Alert", "You are going to update your password. But password has to be at least 8 charactors.")
      return false
    } 
    return true
  }

  validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
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

  handleSelectItem(item, index) {
    const {onDropdownClose} = this.props;
    onDropdownClose();
    console.log(item);
  }

  render() { 
    
    let {
      accountInfo,
      avatarSource,
      profileImage,
      dataarr
    } = this.state;    
    
    let sumDonate = 0;
    for(var i = 0 ; i < dataarr.length ; i++) {
      sumDonate += dataarr[i].amount
    }

    return (
      <Fragment>
      <SafeAreaView style={{flex: 1, backgroundColor: "#84C01155"}} forceInset={{ bottom:'always' }}>
         <View style={{height: 50}} />
         <ScrollView>
          <View style={styles.topcontainer}>
            <TouchableOpacity
              style={[styles.iconbutton, { opacity: 0 }]}
            >
              <View style={[styles.iconitem, { opacity: 0 }]} ></View>
            </TouchableOpacity>
            <CardView
              style={{margin: 20,  width: 98,
                height: 98,
                borderRadius: 98 / 2,}}
              cardElevation={10}
              cardMaxElevation={10}
              cornerRadius={10}>  
              <TouchableOpacity              
                onPress={() => this.getimagesource()}>
                <Image source={ avatarSource == null ? (profileImage == null ? Icons.avatarinit : { uri : profileImage } ) : avatarSource } style={{width: "100%", height: "100%", resizeMode: "stretch"}} />
              </TouchableOpacity>
            </CardView>
            <TouchableOpacity
              style={[styles.iconbutton, { opacity: 0 }]}
            >
              <View style={[styles.iconitem, { opacity: 0 }]} ></View>
            </TouchableOpacity>
          </View>
 
          <TextInput
            placeholder="Full Name"
            style={{
              textAlign: 'center',
              borderBottomColor: '#2e2e2e',
              borderBottomWidth: 0.5,
              width: '80%',
              alignSelf: 'center',
              fontSize: 15,
              paddingVertical: 5,
              marginTop: 20,
            }}
            onChangeText={(name) => {this.setState({name})}}
            value={this.state.name}
          />
          <TextInput
            placeholder="Email"
            keyboardType='email-address'
            style={{
              textAlign: 'center',
              borderBottomColor: '#2e2e2e',
              borderBottomWidth: 0.5,
              width: '80%',
              alignSelf: 'center',
              fontSize: 15,
              paddingVertical: 5,
              marginTop: 20,
            }}
            onChangeText={(email) => {this.setState({email})}}
          >
            {accountInfo ? accountInfo.data.user.email : ""}
          </TextInput>
          <TextInput
            placeholder="Phone"
            style={{
              textAlign: 'center',
              borderBottomColor: '#2e2e2e',
              borderBottomWidth: 0.5,
              width: '80%',
              alignSelf: 'center',
              fontSize: 15,
              paddingVertical: 5,
              marginTop: 20,
            }}
            onChangeText={(phone) => {this.setState({phone})}}
          >
            {accountInfo ? accountInfo.data.user.phone : ""}
          </TextInput>


          <TextInput
            placeholder="New Password"
            secureTextEntry={true} 
            style={{
              textAlign: 'center',
              borderBottomColor: '#2e2e2e',
              borderBottomWidth:  0.6,
              width: '80%',
              alignSelf: 'center',
              fontSize: 15,
              paddingVertical: 5,
              marginTop: 20,
            }}
            onChangeText={(password) => {this.setState({password})}}
          ></TextInput>
          <View style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: 20,
              }}>
            <Button 
              title='Submit Change'   
              onPress = {this.doUpdate}      
            />
          </View>


          <View style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: 20,
              }}>
            <Button 
              title='Sign Out'      
              onPress = {() => {
                this.signOut();
              }}      
            />
          </View>

          
          <View style={{ height: 15 }}></View>
          </ScrollView>
        </SafeAreaView>
        </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  topcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  iconitem: {
    width: 60,
    height: 60,
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
    borderColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  iconbutton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  footer: {
    height: 60,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  input: {maxHeight: 40},
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
})
export default Profile