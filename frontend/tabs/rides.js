import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';


import data from '../data/rides.json';


export default function App() {
  const rides = data;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Define the request options with headers and body
    const requestOptions = {
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',  // Specify the content type
      },
    };

    fetch('http://localhost:4000/rides', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Log the response data
      })
      .catch(error => {
        console.error('Error fetching data:', error);  // Handle any errors
      });
  }, []); 


  const filteredRides = rides.filter((ride) =>
    ride.name.toLowerCase().includes(searchQuery.toLowerCase()) //filters data from json file that matches the query
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Rides</Text>
     
      {}
      <TextInput
        style={styles.input}
        placeholder="Search for rides..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />


      {}
      <FlatList
        data={filteredRides}
        renderItem={({ item }) => 
            <Text style={styles.ride}>{item.name}</Text>
        }
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  ride: {
    fontSize: 18,
    padding: 10,
  },
});
