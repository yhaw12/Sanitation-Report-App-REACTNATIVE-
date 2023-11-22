import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, TouchableOpacity, Text } from 'react-native';
import borlaBanner from '../../assets/borlaBanner.jpeg';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();

  const LoginLink = () => {
    navigation.navigate('Login');
  };
  const SignUpLink = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={borlaBanner} style={styles.image} />
      </View>

      {/* LOGIN BUTTON */}
      <View style={styles.centeredContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={LoginLink}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* SIGNUP BUTTON */}
        <TouchableOpacity style={styles.signupButton} onPress={SignUpLink}>
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  centeredContainer: {
    position: 'absolute',
    height: 300,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 224, 224, 0.8)',
    borderTopLeftRadius: 50,
    // borderTopRightRadius: 50
  },
  loginButton: {
    width: '80%',
    height: 60,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButton:{
    width: '80%',
    height: 60,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'blue',
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  signupButtonText:{
    color: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});

export default Home;
