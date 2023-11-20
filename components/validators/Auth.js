import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Auth({ children }) {
  const navigation = useNavigation();

  const userAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!(await userAuth())) {
        navigation.navigate('home');
      }
    };

    checkAuthentication();
  }, [navigation, userAuth]);

  return userAuth() ? children : null;
}

export default Auth;
