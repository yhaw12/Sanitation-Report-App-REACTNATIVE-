import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';

const ChatAction = () => {
  return (
    <View style={[styles.container, styles.absolutePosition]}>
      <View style={styles.inputContainer}>
        
        <Icon style={styles.iconStyle} name='smile'type="feather"/>

        <TextInput style={styles.input} placeholder="Type a mess..." underlineColorAndroid="transparent"/>

        <View style={{flexDirection: 'row'}}>
           <Icon iconStyle={styles.rotateAndScale} name='attach' type="ionicon"/>
           <Icon iconStyle={styles.Iconstyle2} name='camera'type="ionicon" solid={true}/>
        </View>
       
      </View>

      <Icon style={styles.mic} name='mic' color="black" type="FontAwesome5"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 1,
    height: '1/6',
    width: '100%',
    bottom: -5,
    marginBottom: 10
  },

  inputContainer:{
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 9999, 
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  absolutePosition: {
    position: 'absolute',
  },
  
  iconStyle: {
    margin: 2,padding: 2,
  },
  input: {
    flex: 1, // Allow the TextInput to take the available space
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    marginLeft: 10,
    fontSize: 20,
  },

  rotateAndScale: {
    transform: [
      { rotate: '-40deg' },
      { scale: 1.2 },
    ],
    padding: 2,
    paddingVertical: 4,
  },
  Iconstyle2: {
    marginLeft: -2,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  mic: {
    margin: 2,
    color: 'black'
  },
});

export default ChatAction;
