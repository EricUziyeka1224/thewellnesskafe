import React from 'react';
import {StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
    marginTop: '1%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowRadius: 1,
    minHeight: 50,
    maxHeight: 150,
  },
});

function TextInput({
  style,
  onChangeText,
  secureTextEntry,
  multiline = false,
  children,
}) {
  const {container} = styles;
  return (
    <Item rounded style={[container, style]}>
      <Input
        style = {{color: "#FFFFFF"}}
        multiline={multiline}
        numberOfLines={10}
        onChangeText={value => onChangeText(value)}
        secureTextEntry={secureTextEntry}>
        {children}
      </Input>
    </Item>
  );
}

export default TextInput;
