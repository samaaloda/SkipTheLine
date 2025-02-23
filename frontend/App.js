import React from 'react';
import { Text, View, Image } from 'react-native';

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RidesScreen from './tabs/rides.js';
import MapScreen from './tabs/map.js';
import ScheduleScreen from './tabs/schedule.js';



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


const Tab = createBottomTabNavigator();

export default function App() {
  const [ user, setUser ] = useState("")
  function login(user) {
    setUser(user)
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconSource;

            if (route.name === 'Rides') {
              iconSource = require('./assets/nav/rides.png'); // Custom image for Rides
            } else if (route.name === 'Map') {
              iconSource = require('./assets/nav/map.png'); // Custom image for Map
            } else if (route.name === 'Schedule') {
              iconSource = require('./assets/nav/schedule.png'); // Custom image for Schedule
            }

            return (
              <Image
                source={iconSource}
                style={{ width: size, height: size, tintColor: color }} // Adjust size and color (tintColor)
              />
            );
          },
        })}
      >
        <Tab.Screen name="Rides" component={RidesScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
