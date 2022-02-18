import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    alignSelf: 'center',
  },
});

function ButtonComponent({style, onPress, text = 'Sign In'}) {
  const {container} = styles;
  return (
    <Button onPress={onPress} style={[container, style]} rounded>
      <Text uppercase={false} style={styles.text}>
        {text}
      </Text>
    </Button>
  );
}

export default ButtonComponent;
