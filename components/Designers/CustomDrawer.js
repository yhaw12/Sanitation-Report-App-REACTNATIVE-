import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Dashboard from '../../parts/OtherScreens/Dashboard';

const DrawerItem = ({ title, onPress }) => {
  const [colorValue] = useState(new Animated.Value(0));

  const handlePress = () => {
    Animated.timing(colorValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      onPress();
      Animated.timing(colorValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  const colorInterpolation = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'lightgray'],
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.drawerItem, { backgroundColor: colorInterpolation }]}>
        <Text style={styles.drawerItemText}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CustomDrawer = ({ navigation, sidebarWidth }) => {
  return (
    <Animated.View style={[styles.container, { left: sidebarWidth }]}>
      <DrawerItem title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <DrawerItem title="Profile" onPress={() => navigation.navigate('Profile')} />
      <DrawerItem title="Contact Us" onPress={() => navigation.navigate('ContactUs')} />
      <DrawerItem title="Sign Out" onPress={() => { /* handle logout here */ }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'white',
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  drawerItemText: {
    fontSize: 16,
  },
});
export default CustomDrawer;