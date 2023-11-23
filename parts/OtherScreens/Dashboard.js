import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from '../../components/Topbar';
import CustomDrawer from '../../components/Designers/CustomDrawer';
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
    
    // Add more appointments here
  ]);

  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(new Animated.Value(-250)); 

  // sidebar code
  const animateSidebar = () => {
    const showingSidebar = sidebarWidth._value < 0;

    Animated.timing(sidebarWidth, {
        toValue: showingSidebar ? 0 : -250,
        duration: 250,
        useNativeDriver: false,
    }).start();
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
    <SafeAreaView style={styles.container}>

  <Animated.View style={{ position: 'absolute', width: 250, height: '100%', left: sidebarWidth, bottom: 0, zIndex: 200 }}>
    <CustomDrawer />
  </Animated.View>

  <Topbar animatedSidebar={animateSidebar} />

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
    

    <View style={{marginTop: 5}}>
        <ChatAction />
    </View>
  
    </SafeAreaView>   
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dates:{
    flexDirection: 'column'
  },
  searchInput: {
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10, 
    fontSize: 17, fontWeight: 'bold'
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
