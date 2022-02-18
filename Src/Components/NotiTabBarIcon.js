import React from "react";
import {
  Container,
  Content,
  Text,
  View
} from "native-base";
import { connect } from "react-redux";

const NotiTabBarIcon = props => (
  props.notificationCount > 0 ?
 
   <Text 
    style={{color: '#FF0000',
            position:'absolute',
            top:1,
            right:1,
            margin: -1,
            minWidth:13,
            height:13,
            borderRadius:7,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FF0000', 
            textAlign: "center",  
            fontSize: 9 ,
            color: "white"}}>{props.notificationCount}</Text>
  : null
);

export default connect(
  (state) => ({ 
    notificationCount: state.appReducer.notificationCount
  })
)(NotiTabBarIcon);