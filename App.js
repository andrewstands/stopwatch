import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import MyStopwatch from './MyStopwatch'; // Importing your stopwatch component

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Stopwatch by Andrew SLB.</Text>
      <View style={styles.centered}>
        <Card>
          <MyStopwatch /> {/* Rendering your stopwatch component */}
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color to black
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  headline: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  centered: {
    width: '80%', // Set width of centered content
  },
});
