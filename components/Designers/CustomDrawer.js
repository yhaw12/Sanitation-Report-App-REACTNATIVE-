import React, { useState }  from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Sharing from 'expo-sharing';


const menuItems = [
  {
    name: 'Home',
    icon: 'home-outline',
    navigateTo: 'Dashboard' 
    },
  {
    name: 'Profile',
    icon: 'person-outline',
    navigateTo: 'Profile' 
  },
  {
    name: 'Settings',
    icon: 'settings-outline',
    navigateTo: 'Settings'
  },
  {
    name: 'Support',
    icon: 'help-circle-outline',
    navigateTo: 'Support'
  },
  
];

function CustomDrawer() {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  
  // share 
  // const shareOptions = {
  //   title: 'Share via',
  //   message: 'some message',
  //   url: 'https://play.google.com/store/apps/details?id=<your_app_id>' //Replace <your_app_id> with your actual Play Store app id
  // };
  
  const onShare = async () => {
    try {
      const result = await Sharing.shareAsync(
        'https://play.google.com/store/apps/details?id=<your_app_id>', //Replace <your_app_id> with your actual Play Store app id
        {
          dialogTitle: 'Share via',
          mimeType: 'text/plain',
          tintColor: '#B2BEB5'
        }
      );
      if (result.action === Sharing.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Sharing.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  
    // Logout Code 
    const handleLogout = () => {
      axios.post('http://localhost:8081/logout')
        .then(res => {
          if (res.data.Status === 'Success') {
            navigation.navigate('Login'); 
          } else {
            console.error('Logout failed:', res.data.Error);
          }
        })
        .catch(err => {
          console.error('Logout error:', err);
        });
    };
  
    const bottomItems = [
      {
        name: 'Share',
        icon: 'share-outline',
        onPress: onShare,
      },
      {
        name: 'Sign out',
        icon: 'log-out-outline',
        onPress: handleLogout
      },
    ]
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
  
        <View style={{height: 160,  alignItems: 'center', justifyContent: 'center', backgroundColor:'#B2BEB5'}}>
            <Image style={{width: 100, height: 100, borderRadius: 50}} source={require('../../assets/profile.jpg')}/>
            <Text style={{fontSize: 20}}>Paul Akuffo</Text>
        </View>
        <View  style={{flex:1,marginTop: 40, paddingHorizontal: 30, borderBottomColor: '#b2beb5', borderBottomWidth: 2}}>
          {menuItems.map((item, index) => (
            <TouchableOpacity  
            key={index} 
            onPress={() => {navigation.navigate(item.navigateTo);setSelectedItem(item.name);}}
            style={selectedItem === item.name ? {backgroundColor: 'lightgray'} : {}}>
              <View style={{  flexDirection: 'row', gap: 10, alignItems: 'center',  marginBottom: 20, paddingVertical: 'auto'}}>
                <Icon name={item.icon} size={24} />
                <Text style={{fontSize: 20}}>{item.name}</Text>
              </View>
            
              </TouchableOpacity>
        ))}
      </View>

      <View style={{marginTop: 50, marginBottom: 50,paddingHorizontal: 30}}>
        {bottomItems.map((item, index) => (
      <TouchableOpacity key={index} onPress={item.onPress}>
        <View style={{flexDirection: 'row', gap: 10, marginBottom: 20}}>
          <Icon name={item.icon} size={24} />
          <Text style={{fontSize: 20}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
      ))}  
      </View>
    </SafeAreaView>
  );
}
export default CustomDrawer;
  