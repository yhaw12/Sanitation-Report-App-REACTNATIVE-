import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

function CustomDrawer({ sidebarWidth, closeSidebar }) {
  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarWidth }] }]}>
      <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      {/* Add more sidebar content here */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    width: 250, // assuming the width of the sidebar is 250
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#f00',
  },
});

export default CustomDrawer;


/* <Animated.View style={[styles.container, { left: sidebarWidth }]}>
      <DrawerItem title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <DrawerItem title="Profile" onPress={() => navigation.navigate('Profile')} />
      <DrawerItem title="Contact Us" onPress={() => navigation.navigate('ContactUs')} />
      <DrawerItem title="Sign Out" onPress={() => { /* handle logout here */ 
    // </Animated.View> 