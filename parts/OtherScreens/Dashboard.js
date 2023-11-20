import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Animated, KeyboardAvoidingView, Platform } from 'react-native';
// import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../../components/Topbar';
import CustomDrawer from '../../components/Designers/CustomDrawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import MakeReports from '../../components/Designers/MakeReports';
import ChatAction from '../../components/Designers/ChatAction';

const renderAppointmentCard = ({ item }) => (
  <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
    <View style={styles.dates}>
        <Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.startDate}</Text>
    </View>
    
    <View style={styles.cardContent}>
      <View style={styles.attendeesContainer}>
        <Image source={{ uri: item.attendees[0].remoteImage }} style={styles.attendeeImage} />
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  </View>
);


function Dashboard({navigation}) {
  

  useEffect(() => {
    // Set the token when the component mounts
    AsyncStorage.setItem('token', JSON.stringify(true));
  }, [])
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Report 1',
      startDate: '2023-05-18',
      endDate: '2023-05-18',
      attendees: [
        { id: 1, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 2, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 3, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar8.png' },
        { id: 4, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 5, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
        { id: 6, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
      ],
      backgroundColor: '#ffdcb2',
      titleColor: '#ff8c00',
    },
    {
      id: 2,
      title: 'Report 2',
      startDate: '2023-05-19',
      endDate: '2023-05-19',
      attendees: [
        { id: 7, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 8, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: 9, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
      ],
      backgroundColor: '#bfdfdf',
      titleColor: '#008080',
    },
    {
      id: 3,
      title: 'Report 3',
      startDate: '2023-05-19',
      endDate: '2023-05-19',
      attendees: [
        { id: 10, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 11, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: 12, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: 13, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
        { id: 14, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
      ],
      backgroundColor: '#e2caf8',
      titleColor: '#8a2be2',
    },
    {
      id: 4,
      title: 'Report 4',
      startDate: '2023-05-19',
      endDate: '2023-05-19',
      attendees: [
        { id: 15, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: 16, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: 17, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
      ],
      backgroundColor: '#d8e4fa',
      titleColor: '#6495ed',
    },
    // Add more appointments here
  ]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth] = useState(new Animated.Value(-250)); // assuming the width of the sidebar is 250


  const openSideBar = () => {
    Animated.timing(sidebarWidth, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const closeSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: -250,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const navigateToMakeReports = () => {
    // Navigate to the MakeReports screen
    navigation.navigate('MakeReports');
  };

 
  // const fetchData = () => {
  //   fetch('https://your-api-endpoint.com/appointments')
  //     .then(response => response.json())
  //     .then(data => setAppointments(data))
  //     .catch(error => console.error(error));
  // };

  // FILTER FUNCTION
  const searchFilter = (item) => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
         <Topbar/>
        <View style={styles.container}>
        <Topbar openSidebar={openSideBar} />

        
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text style={styles.title}> My Reports</Text>
        <FlatList 
          contentContainerStyle={styles.listContainer}
          data={appointments.filter(searchFilter)}
          renderItem={renderAppointmentCard}
          keyExtractor={(item) => item.id.toString()}
        />


       <CustomDrawer  sidebarWidth={sidebarWidth} />


        <View >
            <ChatAction />
        </View>
      </View>      
      </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  listContainer: {
    paddingHorizontal: 10,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dates:{
    flexDirection: 'column'
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  cardDates: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cardDate: {
    color: '#888',
  },
  infoContainer: {
    flex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  attendeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5, 
    borderWidth: 0.5,
  },

  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginTop: 15,
    backgroundColor: '#DCDCDC',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#00008B',
  },
  
});

export default Dashboard
