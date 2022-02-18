import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

function BoldText({text, boldText, containerStyle, style, onPress, boldStyle}) {
  const Styles = StyleSheet.create({
    boldTextStyle: {
      fontSize: 14,
      alignSelf: 'center',
      color: '#FFF',
      fontFamily: 'AvenirNext-Regular',
      fontWeight: '400',
    },
  });

  const {boldTextStyle} = Styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {flexDirection: 'row', justifyContent: 'center'},
        containerStyle,
      ]}>
      <Text style={[boldTextStyle, style]}>{text}</Text>
      <Text style={[boldTextStyle, {fontWeight: 'bold'}, boldStyle]}>{boldText}</Text>
    </TouchableOpacity>
  );
}

export default BoldText;
