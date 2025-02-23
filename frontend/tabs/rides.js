import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList} from 'react-native';


import data from '../data/rides2.json';


export default function App() {
  const rides = data;
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRides = rides.filter((ride) =>
    ride.name.toLowerCase().includes(searchQuery.toLowerCase()) //filters data from json file that matches the query
  );

  useEffect(() => {
    fetch('http://localhost:3000/queue') // Change to your actual backend URL if deployed
      .then(response => response.json())
      .then(data => {
        setRides(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching rides:', error);
        setLoading(false);
      });
    }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Rides</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for rides..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.rideName}>{item.name}</Text>
            <Text>Duration: {item.duration} mins</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
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

