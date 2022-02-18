import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import TopImage from '../Assets/top-bg.png';
import { Icon } from 'native-base';

const Header = props => {
  const { imageBackground, container, name } = Styles;
  return (
    <>
      <ImageBackground
        source={TopImage}
        resizeMode={'stretch'}
        style={imageBackground}>
        <View style={container}>
          <Icon
            name={'notifications-outline'}
            type={'Ionicons'}
            fontSize={30}
            style={{ color: 'white' }}
          />
          <Image source={require("../Assets/logo.png")} style={{ height: 80, width: 100 }} resizeMode="contain" />
          <View style={name}>
            <Text style={{ color: 'white' }}>Reya </Text>
            <Icon
              type="Ionicons"
              name="arrow-dropdown"
              fontSize={30}
              style={{ marginLeft: 5, color: 'white' }}
            />
          </View>
        </View>
        {props.children}
      </ImageBackground>
    </>
  );
};

const Styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 330,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: '4%',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
