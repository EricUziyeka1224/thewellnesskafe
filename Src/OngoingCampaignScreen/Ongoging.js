import React from 'react';
import { 
  View, 
  Text, 
  AsyncStorage, 
  Image, 
  Alert, 
  NativeModules, 
  FlatList, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity,
  Linking,
  ScrollView,
  Modal
} from 'react-native';
import CardList from "react-native-card-animated-modal";
import GameCard from "./Components/GameCard";
import Config from '../Config';
import StatusBar from '../Components/Statusbar';

import FastImage from 'react-native-fast-image'
import NetInfo from '@react-native-community/netinfo';
import back from '../Assets/11.jpg';

class Ongoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible: false,
      userId: -1,
      selectedItem: null
    }
  } 

  componentDidMount() {

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
          NativeModules.DevSettings.reload();
      } 
    });

    AsyncStorage.getItem('accountInfo').then((accountInfo) => {
      const userId = JSON.parse(accountInfo).data.user._id
      this.setState({userId})
      this.props.campaignActions.loadCampaignList(userId)
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isError } = this.props.campaignReducer
  }

  gotoStripeScreen = (campaignId) => {
    this.props.navigation.navigate("StripeScreen")
  }

  render() {
    
    const { isLoading , campaigns } = this.props.campaignReducer
    const navigation = this.props.navigation
    const campaignActions = this.props.campaignActions

    const { userId } = this.state
    let cards = [];
    campaigns.forEach(function(campaign, index) {
      
      const donateUrl = `${Config.donate_path}/${userId}/${campaign._id}`
      let card = {
        image: {
          uri: `${Config.file_path}${campaign.image}`
        },
        description: campaign.description,
        video :  campaign.video,
        campaign: campaign,
        renderItem: ({ item }) => <GameCard campaign={campaign} donateUrl = {donateUrl} navigation = { navigation } campaignActions = {campaignActions}/>
      }

      cards.push(card)
    });
    //end make
    
    /*
    return(
      
      <CardList
        listProps={{
          ListHeaderComponent: () => (
            <View style={{ padding: 16, paddingBottom: 0 }}>            
            </View>
          )
        }}
        safeAreaStyle={{margin: 0, width: "100%"}}
        data={cards}
        detailsContainerStyle={{ borderRadius: 0, paddingTop: 50 }}
        renderItem={({ item }) => {
          
          if (item.renderItem) return item.renderItem({ item });

          return (
            <View>
              <FastImage
                style={{
                  width: "100%",
                  height: height * 0.55
                }}
                source={{
                  uri: item.source,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          );
        }}
        renderDetails={({ item, index }) => {
          return (
            <View
              style={{
                paddingVertical: 30,
                paddingHorizontal: 16
              }}
            >
              <Text style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: 18 }}>
                {item.description}
              </Text>            
            </View>
          )
        }}
      />  
    )
    */
    return (     
      <ImageBackground
        source={back}
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover'
        }}
      >     
        <Modal
          animationType="slide"
          supportedOrientations={['portrait', 'landscape']}
          visible={this.state.modalVisible}>
          <ScrollView style={{marginTop: 42}}>
            <View 
              style={{
                justifyContent: 'flex-end', flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({...this.state, modalVisible: false});
                }}
                style={{
                  borderColor: '#f20', borderRadius: 4, borderWidth: 1,
                  marginRight: 20, marginTop: 20
                }}
              >
                <Text style={{padding: 5, color: '#f20'}}>Close</Text>
              </TouchableOpacity>
            </View>            
            {this.state.selectedItem && 
              <View
                style={{
                  paddingVertical: 30,
                  paddingHorizontal: 16,
                  justifyContent: 'center'
                }}
              >
                <Text style={{color: '#45654b', fontSize: 14}} numberOfLines={1}>{this.state.selectedItem.campaign.title}</Text>
                <Text style={{ color: '#45654b'}}>
                  {this.state.selectedItem.campaign.sms}
                </Text>
                <Image
                  style={{
                    width: 300,
                    height: 200
                  }}
                  source={{
                    uri: this.state.selectedItem.image.uri
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: 18 }}>
                  {this.state.selectedItem.description}
                </Text>            
              </View>
            }            
          </ScrollView>
        </Modal>
        <ScrollView>
          <View
            style={{
              marginTop: 40, marginHorizontal: 10, marginBottom: 20,
              flexDirection: 'row', flexWrap: 'wrap',
              justifyContent: 'space-around',
              width: '95%'
            }}
          >
            {cards.map((card, index) => (
              <View 
                style={{
                  marginBottom: 20,
                  marginTop: (index%2==1)?40:10,
                  width: 160, height: 200,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  paddingHorizontal: 10, paddingVertical: 10
                }}
              >
                <TouchableOpacity onPress={() => this.openModal(card)}>
                  <Text style={{color: '#45654b', fontSize: 14}} numberOfLines={1}>{card.campaign.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.openModal(card)}>
                  <Image
                    style={{
                      width: "100%",
                      height: 120
                    }}
                    source={{
                      uri: card.image.uri,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>              
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0 }}>
                  <TouchableOpacity
                    style={{                    
                      padding: 7,
                      minWidth: 80,
                      borderRadius: 16
                    }}
                  >
                    <Text style={{ color: '#45654b', textAlign: "left" }}>
                      {card.campaign.sms}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: card.campaign.isDonated == 0 ? "#FC0FC0" : "#FC0FC0",
                      padding: 7,
                      minWidth: 60,
                      borderRadius: 16
                    }}
                    onPress={() => {
                      Linking.openURL(card.campaign.video)
                    }}
                  >
                    <Text style={{ color: "rgb(255, 255, 255)", textAlign: "center" }}>
                      Buy
                    </Text>
                  </TouchableOpacity>
                </View>            
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }

  openModal = (selectedItem) => {
    this.setState({
      ...this.state,
      modalVisible: true,
      selectedItem
    })
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
}

export default Ongoing;
