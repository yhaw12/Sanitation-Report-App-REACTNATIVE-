import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function HeaderLogo() {
  return <Image source={require('../../assets/bola.png')} style={styles.logo}/>
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default HeaderLogo;