import React from 'react';
import {StyleSheet} from 'react-native';
import {H2} from 'native-base';

function Heading({style, heading = 'So good to have you back!'}) {
  const styles = StyleSheet.create({
    container: {
      color: '#485869',
      fontWeight: '500',
      alignSelf: 'center',
      fontFamily: 'AvenirNext-Regular',
    },
  });
  const {container} = styles;
  return <H2 style={[style, container]}>{heading}</H2>;
}

export default Heading;
