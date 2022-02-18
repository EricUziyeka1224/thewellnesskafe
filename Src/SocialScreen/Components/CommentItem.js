import React from 'react';
import { 
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Icon } from 'native-base';
import Icons from '../../Components/Icons';
import { WebView } from "react-native-webview";
import CardView from 'react-native-cardview';

function CommentItem({ 
    avatar = 'https://s3.amazonaws.com/tinycards/image/c5b605125dd3a4685555bf56c37555ed',
    name = 'Henry',
    text = 'This is great comment.',
  }) {
  const { textSocial } = Styles;

  
  return (
    <CardView
      style={{marginLeft: 20, marginRight: 20, marginBottom: 5}}
      cardElevation={5}
      cardMaxElevation={5}
      cornerRadius={10}>    
      <View style={{
          width: '100%',
          borderBottomWidth: 0.5,
          borderColor: '#e2e2e2',
          alignSelf: 'center',
        }}>
        <View style={{
          width: "100%",
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
        }}>
          <View style={{
            width: "100%",
            flexDirection: 'row',
          }}>
            <Image source={{ uri: avatar }}
              style={{ width: 20, height: 20, resizeMode: 'cover', borderRadius: 40 / 2 }} />
            <View>
              <Text style={{
                fontWeight: 'bold',
                marginLeft: 10,
                fontSize: 13,
              }}>
                {name}
              </Text>
              <Text style={textSocial}>{text}</Text>
            </View>
            
          </View>
        </View>
          
      </View>
    </CardView>
  ); 
}

const Styles = StyleSheet.create({
  textSocial: {
    color: 'black',
    fontSize: 12,
    width: '95%',
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
});

export default CommentItem;
