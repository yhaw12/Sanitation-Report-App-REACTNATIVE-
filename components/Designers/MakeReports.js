import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView, Text } from 'react-native';
import * as Location from 'expo-location';
import ImagePicker from 'react-native-image-picker';

function MakeReports({ navigation, appointments, setAppointments, ...props }) {
  const [locationTag, setLocationTag] = useState('');
  const [descriptionNote, setDescriptionNote] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
      }
    })();
  }, []);

  const takePicture = async () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const newAppointment = {
          id: appointments.length + 1,
          title: 'New Appointment',
          startDate: new Date().toISOString().split('T')[0],
          attendees: [{ id: appointments.length + 1, remoteImage: response.uri }],
          backgroundColor: '#d8e4fa',
          titleColor: '#6495ed',
        };
        setAppointments([...appointments, newAppointment]);

        try {
          const location = await Location.getCurrentPositionAsync({});
          setLocationTag(`Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`);
          setMessages([...messages, `Image taken at Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`]);
        } catch (error) {
          console.error('Error getting location:', error);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </ScrollView>
      <Button title="Take Picture" onPress={takePicture} />
      <TextInput style={styles.input} placeholder="Location Tag" value={locationTag} onChangeText={setLocationTag} />
      <TextInput style={styles.input} placeholder="Description Note" value={descriptionNote} onChangeText={setDescriptionNote} />
    </View>
  );
}

export default MakeReports;

const styles = StyleSheet.create({
  container: {
    marginVertical: 150,
  },

  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
