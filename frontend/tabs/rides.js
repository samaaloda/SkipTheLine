import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

import data from '../data/rides.json';

export default function App() {
  const rides = data;
  const [searchQuery, setSearchQuery] = useState('');
  const [useRides, setRides] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
    };

    fetch('http://localhost:4000/rides', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the response data
        setRides(data); // Update the state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Handle any errors
      });
  }, []);

  const filteredRides = rides.filter((ride) =>
    ride.name.toLowerCase().includes(searchQuery.toLowerCase()) // filters data from json file that matches the query
  );

  const enqueue = (rideName) => {
    useEffect(() => {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify the content type
          },
          body: JSON.stringify({
            key: 'value',  // Replace with the actual data you want to send
            anotherKey: 'anotherValue',
          }),
        };
    
        fetch('http://localhost:4000/queue', requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data); // Log the response data
            setQueueData(data);  // Update the state with the fetched data
          })
          .catch(error => {
            console.error('Error fetching data:', error); // Handle any errors
          });
      }, []);
    alert(`${rideName} added to queue!`);
  };

  const imageMap = {
    "../assets/rcs/the-fly.jpeg": require('../assets/rcs/the-fly.jpeg'),
    "../assets/rcs/thunder-run.jpeg": require('../assets/rcs/thunder-run.jpeg'),
    "../assets/rcs/time-warp.jpeg": require('../assets/rcs/time-warp.jpeg'),
    "../assets/rcs/wilde-beast.jpeg": require('../assets/rcs/wilde-beast.jpeg'),
    "../assets/rcs/wkm.jpeg": require('../assets/rcs/wkm.jpeg'),
    "../assets/rcs/windseeker.jpeg": require('../assets/rcs/windseeker.jpeg'),
    "../assets/rcs/wmg.jpeg": require('../assets/rcs/wmg.jpeg'),
    "../assets/rcs/wwb.jpeg": require('../assets/rcs/wwb.jpeg'),
    "../assets/rcs/yukon-striker.jpeg": require('../assets/rcs/yukon-striker.jpeg'),
    "../assets/rcs/psyclone.jpeg": require('../assets/rcs/psyclone.jpeg'),
    "../assets/rcs/riptide.jpeg": require('../assets/rcs/riptide.jpeg'),
    "../assets/rcs/shockwave.jpeg": require('../assets/rcs/shockwave.jpeg'),
    "../assets/rcs/skyhawk.jpeg": require('../assets/rcs/skyhawk.jpeg'),
    "../assets/rcs/sledge-hammer.jpeg": require('../assets/rcs/sledge-hammer.jpeg'),
    "../assets/rcs/soaring-timbers.jpeg": require('../assets/rcs/soaring-timbers.jpeg'),
    "../assets/rcs/the-bat.jpeg": require('../assets/rcs/the-bat.jpeg'),
    "../assets/rcs/bsc.jpeg": require('../assets/rcs/bsc.jpeg'),
    "../assets/rcs/behemoth.jpeg": require('../assets/rcs/behemoth.jpeg'),
    "../assets/rcs/dragon-fyre.jpeg": require('../assets/rcs/dragon-fyre.jpeg'),
    "../assets/rcs/drop-tower.jpeg": require('../assets/rcs/drop-tower.jpeg'),
    "../assets/rcs/flight-deck.jpeg": require('../assets/rcs/flight-deck.jpeg'),
    "../assets/rcs/ghoster-coaster.jpeg": require('../assets/rcs/ghoster-coaster.jpeg'),
    "../assets/rcs/leviathan.jpeg": require('../assets/rcs/leviathan.jpeg'),
    "../assets/rcs/lumberjack.jpeg": require('../assets/rcs/lumberjack.jpeg'),
    "../assets/rcs/minebuster.jpeg": require('../assets/rcs/minebuster.jpeg')
  };
  
  

  return (
    <View style={styles.container}>
        <View style={styles.header}>
      <Text style={styles.title}>Search Rides</Text>
        
      <TextInput
        style={styles.input}
        placeholder="Search for rides..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
        </View>
      <FlatList
        data={filteredRides}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            <View style={styles.evRide}>
            <Image source={imageMap[item.img]} style={styles.img} />
                <TouchableOpacity
                style={styles.queue}
                onPress={() => enqueue(item.name)}
              >+</TouchableOpacity>
              
              <Text style={styles.rideName}>{item.name}</Text>
              <Text style={styles.rideDuration}>Duration: {item.capacity} mins</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name} 
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f8f8f8', // Light gray to create contrast
    },
    card: {
      width: 350,
      padding: 15,
      marginBottom: 20,
      borderRadius: 15, // Rounded corner
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      color: '#d71b23', // Canada's Wonderland red
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#d71b23', // Red border for matching theme
      borderWidth: 2,
      width: '100%',
      paddingLeft: 10,
      marginBottom: 20,
      borderRadius: 5,
      fontSize: 16,
    },
    evRide: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10, // Round inner elements too
      borderColor: '#0061ff', // Blue border for a professional touch
      borderWidth: 1,
    },
    rideName: {
      fontSize: 20,
      color: '#0061ff', // Blue for names
      fontWeight: 'bold',
      marginTop: 10,
    },
    rideDuration: {
      fontSize: 16,
      color: '#333',
      marginTop: 5,
    },
    queue: {
      backgroundColor: '#ffcc00', // Bright yellow for action
      padding: 10,
      borderRadius: 5,
      marginLeft: 0,
      width: 30,
      height:30,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
    header: {
      backgroundColor: '#fff',
      width: '100%',
      padding: 10,
    },
    img: {
      width: 300,
      height: 100,
      borderRadius: 5,
      marginBottom: 10,
      marginRight:20,
    },
  });