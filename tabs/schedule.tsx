/*import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
//import schedule from './data/schedule.json';

const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
//        data={schedule}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.event}>{item.event}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  event: { fontSize: 18, fontWeight: 'bold' },
  time: { fontSize: 16, color: 'gray' },
});

export default ScheduleScreen;
*/