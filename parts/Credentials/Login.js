import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView  } from 'react-native';
import Background from '../../components/Designers/Background';
import BackButton from '../../components/Designers/BackButton';
import Header from '../../components/Header';

import axios from 'axios'

import {emailValidator} from '../../components/validators/EmailValidator'
import {passwordValidator} from '../../components/validators/PasswordValidator';


import MyTextInput from '../../components/TextInput';
import SocialsIcons from '../../components/Designers/SocialsIcons';
import HeaderLogo from '../../components/Designers/HeaderLogo';



function Login({ navigation }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showPass, setShowPass] = useState(true)

  function handleSubmit() {
    let emailError = emailValidator(values.email)
    let passwordError = passwordValidator(values.password)

    if (!values.email.trim()) {
      emailError = 'Email is required';
    }

    if (!values.password.trim()) {
      passwordError = 'Password is required';
    }

    if (emailError || passwordError) {
      setErrors({...errors, email: emailError, password: passwordError });
      return;
    }

    setErrors({ email: '', password: '' });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })

    axios.defaults.withCredentials = true;
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if (res.data.Status === 'Success'){
                navigation.navigate('Dashboard')
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
      <BackButton goBack={navigation.goBack} />

       <HeaderLogo/>
      <Header>Welcome back.</Header>
      <MyTextInput
        label="Email"
        returnKeyType="next"
        value={values.email}
        onChangeText={(text) => setValues({ ...values, email: text })}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        placeholder = "Type Email"
        error={errors.email}
        icon="envelope"
        
      />

      <MyTextInput
        label="Password"
        returnKeyType="done"
        value={values.password}
        onChangeText={(text) => setValues({ ...values, password: text })}
        autoCapitalize="none"
        secureTextEntry
        placeholder = "Type Password"
        error={errors.password}
        icon={showPass ? "lock": "unlock"}
        onIconPress ={toggleShowPass}
        />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <View >
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
        

      <View style={styles.row}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <SocialsIcons/>
    </Background>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    width: 320,
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
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
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
});

export default Login;
