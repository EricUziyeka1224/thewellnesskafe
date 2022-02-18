import React from 'react';
import { 
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Config from '../Config';
import Icons from './Icons';
import { WebView } from "react-native-webview";

function SocialItem({ 
    avatar = 'https://s3.amazonaws.com/tinycards/image/c5b605125dd3a4685555bf56c37555ed',
    name = 'Henry',
    postDate = '11/2/2019',
    imageurl = 'https://cdn.vox-cdn.com/thumbor/xpOB-dtNfLMnHC-0hscAqEXUsjo=/0x0:2000x1333/1200x675/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/57981209/170423_10_51_45_5DS28279.0.jpg',
    videourl = "",
    text = 'This is great Building.',
    commentCnt = 0,
    likeCnt = 0
  }) {
  const { textSocial } = Styles;

  let mediaTag;
  if ( videourl == "" ) {
    if(imageurl == `${Config.file_path}`) {
      mediaTag = <View/>
    } else {
      mediaTag = <Image source={{ uri: imageurl }}
        style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 5 }} />;
    }
  
  } else {
    mediaTag = <WebView
                  useWebKit={true}
                  style={{ width: "100%", height: 200 }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: videourl }} />;
  }

  return (
    <View style={{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#1C22D815',
        alignSelf: 'center',
      }}>
      
      <View>
        {mediaTag}
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <Image source={{ uri: avatar }}
              style={{ width: 30, height: 30, resizeMode: 'cover', borderRadius: 30 / 2 }} />
            <Text style={{
              fontWeight: 'bold',
              marginLeft: 10,
              fontSize: 13,
            }}>
              {name}:
            </Text>
          </View>
          <View style={{
              flexDirection:"row",
              marginLeft: 5,
              paddingRight: 20
            }}>
            <Text style={{
                flex:1,
                flexWrap:"wrap",
                color: '#1e1e1e'
              }}>
              {text}
            </Text>
          </View>
          
        </View>
        <View style={{
          flexDirection: "row",
          width: '95%',
          marginBottom: 10
          }}>
         <View style={{width: "50%", flexDirection: "row", marginLeft: 20}}>  
            <Text style={{ marginRight: 10, color: "#525252", fontSize: 12}}>Likes {likeCnt}</Text>     
            <Text style={{ marginRight: 10, color: "#525252", fontSize: 12}}>Comments {commentCnt}</Text>
         </View>
         
          <Text style={{width: "50%", fontSize: 12, textAlign: "right", paddingRight: 20}}>{postDate}</Text>
        </View>
      </View>    
    </View>
  ); 
}

const Styles = StyleSheet.create({
  container: {
    height: 156,
    width: '92%',
    backgroundColor: 'rgba(154, 170, 187, 0.2)',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10
  },
  contentitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titletext: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20,
    padding: 10,
  },
  imageitem: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
    borderColor: "#1C22D815",
    borderWidth: 1,
    margin: 10
  },
  textSocial: {
    color: 'black',
    fontSize: 15,
    width: '95%',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default SocialItem;
