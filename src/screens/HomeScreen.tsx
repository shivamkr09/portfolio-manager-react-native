import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const HomeScreen = ({ navigation }:any) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Portfolio Manager</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('About')}
          style={styles.button}
        >
          About Me
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Skills')}
          style={styles.button}
        >
          Skills
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Experience')}
          style={styles.button}
        >
          Experience
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Projects')}
          style={styles.button}
        >
          Projects
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;