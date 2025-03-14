import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateAboutMe } from '../store/portfolioSlice';

export default function AboutScreen() {
  const dispatch = useDispatch();
  const aboutMe = useSelector((state: RootState) => state.portfolio.aboutMe);
  const [description, setDescription] = useState(aboutMe.description);
  const [location, setLocation] = useState(aboutMe.location);

  const handleSave = () => {
    dispatch(updateAboutMe({ description, location }));
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>About Me</Text>
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Changes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});