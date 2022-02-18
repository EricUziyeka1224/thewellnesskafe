import React from "react";

import { View, Text, ImageBackground, TouchableOpacity, Linking } from "react-native"
import Moment from 'moment';
import  extendMoment  from 'moment-precise-range';
import timer from '../../Assets/timer.png'
import StatusBar from '../../Components/Statusbar';

const preciseDiff = extendMoment(Moment);

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      diffDate: ""
    }
  } 

  componentWillMount() {
    let diffDate = preciseDiff(Moment(this.props.campaign.endDateTime), Moment() )
    this.setState({diffDate})
    
    setInterval(this.timerDiff, 60000)
  }

  timerDiff = () => {
    let diffDate = preciseDiff(Moment(this.props.campaign.endDateTime), Moment() )
    this.setState({diffDate})
  }

  render() {    
    return (
      <View
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            paddingTop: 40,
            paddingLeft: 16,
            paddingBottom: 16,
            paddingRight: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              maxWidth: "80%",
              fontWeight: "bold",
              color: "rgb(51, 51, 51)"
            }}
          >
            {this.props.campaign.title}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgb(255, 255, 255)",
            padding: 10
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity
                style={{
                  backgroundColor: this.props.campaign.isDonated == 0 ? "green" : "green",
                  padding: 7,
                  minWidth: 100,
                  borderRadius: 16
                }}
              >
                <Text style={{ color: "rgb(255, 255, 255)", textAlign: "center" }}>
                  {this.props.campaign.sms}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: this.props.campaign.isDonated == 0 ? "#FC0FC0" : "#FC0FC0",
                padding: 7,
                minWidth: 100,
                borderRadius: 16
              }}
              onPress={() => {
                Linking.openURL(this.props.campaign.video)
              }}
            >
              <Text style={{ color: "rgb(255, 255, 255)", textAlign: "center" }}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
export default GameCard;