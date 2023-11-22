import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import Background from '../../components/Designers/Background';
import BackButton from '../../components/Designers/BackButton';
import Header from '../../components/Header';
import MyTextInput from '../../components/TextInput' 
import axios from 'axios'

import {nameValidator} from '../../components/validators/NameValidator' 
import {emailValidator} from '../../components/validators/EmailValidator'
import {passwordValidator} from '../../components/validators/PasswordValidator';


import SocialsIcons from '../../components/Designers/SocialsIcons';
import HeaderLogo from '../../components/Designers/HeaderLogo';

function SignUp({ navigation }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(true)



  // SIGNUP BUTTON FUNCTIONALITY CODE
  function handleSignUp() {

    let nameError = nameValidator(values.name)
    let emailError = emailValidator(values.email)
    let passwordError = passwordValidator(values.password)

    if (!values.name.trim()) {
      nameError = 'Name is required';
    }
    if (!values.email.trim()) {
      emailError = 'Email is required';
    }
    if (!values.password.trim()) {
      passwordError = 'Password is required';
    }

    if (nameError || emailError || passwordError) {
      setErrors({...errors, name: nameError, email: emailError, password: passwordError });
      return;
    }

    setErrors({ name: '', email: '', password: '' });

    axios.post('http://localhost:8081/signup', values)
    .then(res => {
        if (res.data.Status === 'Success'){
            navigation.navigate('Login')
        }else{
            setErrors(res.data.Error)
        }
    })
    .catch(err => console.log(err));
  }
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };
  return (
    <Background>
      <BackButton goBack={() => navigation.goBack()} />
      <HeaderLogo/>
      <Header>Create Account</Header>
      <MyTextInput
        label="Name"
        returnKeyType="next"
        value={values.name}
        onChangeText={(text) => setValues({ ...values, name: text })}
        error={errors.name}
        placeholder = "Type Name"
        icon="user"
      />
      <MyTextInput
        label="Email"
        returnKeyType="next"
        value={values.email}
        onChangeText={(text) => setValues({ ...values, email: text })}
        error={errors.email}
        placeholder = "Type Email"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        icon="envelope"
      />
      <MyTextInput 
        label="Password"
        returnKeyType="done"
        value={values.password}
        onChangeText={(text) => setValues({ ...values, password: text })}
        error={errors.password}
        placeholder = "Type Password"
        secureTextEntry
        icon={showPass ? "lock": "unlock"}
        onIconPress ={toggleShowPass}
      />

      <View style={{marginTop: 20}}>
        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp} >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

      <SocialsIcons/>
    </Background>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    width: 300,
    height: 60,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    alignItems: 'center',
    textTransform: 'uppercase',
  },forgot: {
    fontSize: 20,
    color: 'blue',
  },
  signupText:{
    fontSize: 20
  },
  link: {
    fontSize:20,
    fontWeight: 'bold',
    color: 'blue', 
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  
});

export default SignUp;
