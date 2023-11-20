import React from 'react'

import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Header from '../../components/Header'
import MyTextInput from '../../components/TextInput';
import {emailValidator} from '../../components/validators/EmailValidator'

function ResetPasswords() {

    const handlePasswordEmailReset = () => {
        let emailError = emailValidator(email.value)
        if (emailError) {
          setEmail({ ...email, error: emailError })
          return
        }
        navigation.navigate('LoginScreen')
      }
    
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Restore Password</Header>
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
        description="You will receive email with password reset link."
        error={errors.email}
        icon="envelope"
        
      />
      <View style={styles.centeredContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handlePasswordEmailReset} >
          <Text style={styles.buttonText}>Send Instructions</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
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
    },
});

export default ResetPasswords