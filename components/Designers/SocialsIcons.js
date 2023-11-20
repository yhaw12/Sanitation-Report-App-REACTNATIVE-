import React from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import SocialLogin from 'react-native-social-login';


function SocialsIcons() {

  const handleSocialLogin = async (provider) => {
    try {
      const user = await SocialLogin.loginWith(provider);
      // Handle the user data as needed
      Alert.alert('Social Login Success', `Welcome ${user.name}!`);
    } catch (error) {
      console.error('Social Login Error', error);
      Alert.alert('Social Login Error', 'An error occurred during social login.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSocialLogin('google')}>
        <Icon style={styles.image} name="google" size={40} color="#db4437" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSocialLogin('facebook')}>
        <Icon style={styles.image} name="facebook-official" size={40} color="#1778f2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSocialLogin('twitter')}>
        <Icon style={styles.image} name="twitter-square" size={40} color="#08a0e9" />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: 'blue',
        borderWidth: 1,
        marginTop: 30,
        justifyContent: 'space-between'
    },
    image:{
        alignItems: 'center',
        display: 'flex',
        width: 40,
        height: 40,
        marginRight: 10
    }
})

export default SocialsIcons