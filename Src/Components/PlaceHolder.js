import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';

function PlaceHolder({style, placeHolder = 'placeHolder'}) {
  const styles = StyleSheet.create({
    container: {
      fontFamily: 'AvenirNext-Regular',
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: '9%',
      color: '#ffffff',
    },
  });
  const {container} = styles;
  return <Text style={[container, style]}>{placeHolder}</Text>;
}

export default PlaceHolder;
