
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RidesScreen from './tabs/rides.js';
import Login from './tabs/login.js'



function MapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Map Screen</Text>
    </View>
  );
}

function ScheduleScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Schedule Screen</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [ user, setUser ] = useState("")
  function login(user) {
    setUser(user)
  }
  return (
    <View>

      {user == ""? <Login login={login}/> : 
        <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Rides" component={RidesScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Schedule" component={ScheduleScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    }
    </View>
    
  );
}
