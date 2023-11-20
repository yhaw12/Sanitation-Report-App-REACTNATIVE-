import React from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Dimensions } from 'react-native';

function Background({ children }) {
  const { width, height } = Dimensions.get('window');
  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <ScrollView contentContainerStyle={{flex: 1}}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%', 
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Background;
