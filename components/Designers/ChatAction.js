import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, Alert, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import * as ImagePicker from 'expo-image-picker'


const ChatAction = () => {
  const [locationTag, setLocationTag] = useState('');
  // const [descriptionNote, setDescriptionNote] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasImagePickerPermission, setHasImagePickerPermission] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);



  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }
  };
  useEffect(() => {
    requestLocationPermission();
     (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
  
    })();
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasImagePickerPermission(status === 'granted');
    })();
  }, []);


    useEffect(()=>{
      setIsInputEmpty(inputText === '')
    },[inputText])
    

    // take a picture
    const takePicture = async () => {
      if (cameraRef.current && hasCameraPermission) {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri)
        // Do something with the photo...
         try {
          const location = await Location.getCurrentPositionAsync({});
          setLocationTag(`Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`);
          setMessages([...messages, `Image taken at Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`]);
        } catch (error) {
          console.error('Error getting location:', error);
        }
      } else {
        Alert.alert('Camera permission not granted');
      }
    };
    const chooseImage = async () => {
      if (hasImagePickerPermission) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          // Do something with the image..
        } else {
          console.log('User cancelled image picker');
        }
      } else {
        Alert.alert('Image picker permission not granted');
      }
    };

    // Insert Emoji into input element
    function selectEmoji (emoji){
      setInputText((prevText) => prevText + emoji);
    }
  return (
    <View style={[styles.container, styles.absolutePosition]}>
    <View style={styles.inputContainer}>
      <Icon style={styles.iconStyle} name='smile'type="feather" onPress={() => setShowPicker(!showPicker)}/>
      <TextInput style={styles.input} placeholder="Type a mess..." underlineColorAndroid="transparent"
      value={inputText}
      onChangeText={setInputText}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCamera}
        onRequestClose={() => {
          setShowCamera(false);
        }}
      >
        {hasCameraPermission && (
          <Camera style={{ flex: 1 }} ref={cameraRef} />
        )}
        <Icon style={styles.Iconstyle2} name='camera'type="ionicon" onPress={takePicture}/>
        <Icon style={styles.Iconstyle2} name='close'type="ionicon" onPress={() => setShowCamera(false)}/>
      </Modal>
      
      <View style={{flexDirection: 'row'}}>
         <Icon style={{transform: [{rotate: '45deg'}, {scale: 1.5}]}} name='attach' type="ionicon" onPress={chooseImage}/>
         <Icon style={styles.Iconstyle2} name='camera'type="ionicon" onPress={() => setShowCamera(true)}/>
      </View>
    </View>
    {showPicker && (
      <EmojiSelector
        onEmojiSelected={selectEmoji} 
        category={Categories.all}
        showTabs={true}
        showSearchBar={true}
        showHistory={true}
        columns={10}
        placeholder="Search emoji..."
      />
    )}
    {isInputEmpty ? (
      <Icon style={styles.mic} name='mic' color="black" type="FontAwesome5"/>
    ) : (
      <Icon style={styles.mic} name='send' color="black" type="FontAwesome5"/>
    )}
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
    // height: '1/6',
    width: '100%',
    bottom: -10,
    marginBottom: 2
  },

  inputContainer:{
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 9999, 
    marginLeft: 2,
    paddingLeft: 3,
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
    flex: 1, 
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent',
    color: '#424242',
    marginLeft: -2,
    fontSize: 20
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
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 20
  },
});

export default ChatAction;
