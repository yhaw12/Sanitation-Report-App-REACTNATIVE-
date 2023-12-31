import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../borla-app/parts/Credentials/Login.js'
import SignUp from '../borla-app/parts/Credentials/SignUp.js';
import Home from '../borla-app/parts/Credentials/Home.js';
import Dashboard from '../borla-app/parts/OtherScreens/Dashboard.js';
import ResetPasswords from '../borla-app/parts/Credentials/ResetPasswords.js'

// DRAWER IMPORTS
import Profile from '../borla-app/parts/OtherScreens/Profile.js';
import Support from './parts/OtherScreens/Support.js';
import Settings from './parts/OtherScreens/Settings.js';


const Stack = createStackNavigator();

// ... (import statements)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(token !== null);
    };

    checkLoginStatus();
  }, []);

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="ResetScreen" component={ResetPasswords} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    );
  }

  function AppStack() {
    return (
      <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings}  options={{ headerShown: false }}/>
      <Stack.Screen name="Support" component={Support} options={{ headerShown: false }}/>
    </Stack.Navigator>
    );
  }

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* Load to Home if not logged in, otherwise load to Dashboard */}
          {!isLoggedIn ? (
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;
