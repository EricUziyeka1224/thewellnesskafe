import React from 'react';
import TextInput from '../../Components/TextInput';
import PlaceHolder from '../../Components/PlaceHolder';


function InputForm({setName, setEmail, setPhone, setPassword, confirmPassword}) {
  return (
    <>
      <PlaceHolder placeHolder={'Name'} style={{marginTop: 40, color: "#ffffff"}} />
      <TextInput style={{marginTop: '1.5%'}} onChangeText={name} />

      <PlaceHolder placeHolder={'Email address'} style={{color: "#ffffff"}} />
      <TextInput style={{marginTop: '1.5%'}} onChangeText={email} />

      <PlaceHolder placeHolder={'Phone number'} style={{color: "#ffffff"}} />
      <TextInput style={{marginTop: '1.5%'}} onChangeText={phone} />

      <PlaceHolder placeHolder={'Password'} style={{marginTop: '2.5%', color: "#ffffff"}} />
      <TextInput style={{marginTop: '1.5%'}} onChangeText={password} />
    </>
  );
}

export default InputForm;
