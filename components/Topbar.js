import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';



function Topbar({ navigation, openSideBar, closeSiderBar }) {

  const handleProfileClick = () => {
    openSideBar();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Paul Akuffo</Text>
      <TouchableOpacity onPress={handleProfileClick}>
        <Image source={require('../assets/profile.jpg')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 60,
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Topbar;
