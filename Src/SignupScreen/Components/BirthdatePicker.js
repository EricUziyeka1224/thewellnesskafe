import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DatePicker, Text, Icon} from 'native-base';

const BirthdatePicker = ({day, month, year}) => {
  const [chosenDate, setChosenDate] = React.useState(new Date());
  const {dateView, yearView} = Styles;
  return (
    <>
      <View style={Styles.container}>
        <Text style={{marginLeft: 10}}>
          {chosenDate.toString().substr(4, 4)}
        </Text>
        <View style={dateView}>
          <Icon type="Ionicons" name="arrow-dropdown" fontSize={30} />
          <Text style={{marginLeft: 3}}>
            {chosenDate.toString().substr(7, 3)}
          </Text>
        </View>
        <View style={yearView}>
          <Icon type="Ionicons" name="arrow-dropdown" fontSize={30} />
          <Text style={{marginLeft: 3}}>
            {chosenDate.toString().substr(10, 5)}
          </Text>
        </View>
        <View style={{position: 'absolute', width: '100%', height: 50}}>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(1960, 1, 1)}
            maximumDate={new Date()}
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText="Select date"
            textStyle={{color: 'transparent'}}
            placeHolderTextStyle={{color: 'transparent', width: '100%'}}
            onDateChange={setChosenDate}
            disabled={false}
          />
        </View>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateView: {
    flexDirection: 'row',
    marginLeft: '30%',
    alignItems: 'center',
  },
  yearView: {
    flexDirection: 'row',
    marginLeft: '25%',
    alignItems: 'center',
  },
});

export default BirthdatePicker;
