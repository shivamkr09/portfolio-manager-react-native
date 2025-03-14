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
      <View style={styles.header}>
        <Text style={styles.headerText}>About Me</Text>
      </View>
      
      <View style={styles.content}>
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          mode="outlined"
          style={styles.input}
        />
        <Button 
          mode="contained" 
          onPress={handleSave} 
          style={styles.button}
          labelStyle={{ fontSize: 14, fontWeight: '600' }}
        >
          Save Changes
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: 0.5
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 6,
  },
});