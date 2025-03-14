import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Card, TextInput, Button, IconButton, Text, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateExperience } from '../store/portfolioSlice';
import { Experience } from '../types/portfolio';

export default function ExperienceScreen() {
  const dispatch = useDispatch();
  const experiences = useSelector((state: RootState) => state.portfolio.experiences);
  const [editMode, setEditMode] = useState(false);
  const [editedExperiences, setEditedExperiences] = useState<Experience[]>(experiences);

  const handleUpdateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...editedExperiences];
    if (field === 'achievements') {
      updated[index][field] = value.split('\n');
    } else {
      updated[index][field] = value;
    }
    setEditedExperiences(updated);
  };

  const handleAddExperience = () => {
    setEditedExperiences([...editedExperiences, {
      title: '',
      company: '',
      duration: '',
      description: '',
      achievements: [],
    }]);
  };

  const handleRemoveExperience = (index: number) => {
    setEditedExperiences(editedExperiences.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    dispatch(updateExperience(editedExperiences));
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Text variant="headlineMedium" style={styles.headerText}>Experience</Text>
        <Button
          mode={editMode ? 'contained' : 'outlined'}
          onPress={() => editMode ? handleSave() : setEditMode(true)}
          style={styles.headerButton}
        >
          {editMode ? 'Save' : 'Edit'}
        </Button>
      </Surface>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {editedExperiences.map((exp, index) => (
          <Card key={index} style={styles.card} elevation={3}>
            <Card.Content style={styles.cardContent}>
              {editMode ? (
                <View>
                  <TextInput
                    label="Title"
                    value={exp.title}
                    onChangeText={(value) => handleUpdateExperience(index, 'title', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Company"
                    value={exp.company}
                    onChangeText={(value) => handleUpdateExperience(index, 'company', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Duration"
                    value={exp.duration}
                    onChangeText={(value) => handleUpdateExperience(index, 'duration', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Description"
                    value={exp.description}
                    onChangeText={(value) => handleUpdateExperience(index, 'description', value)}
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Achievements (one per line)"
                    value={exp.achievements.join('\n')}
                    onChangeText={(value) => handleUpdateExperience(index, 'achievements', value)}
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                    mode="outlined"
                  />
                  <IconButton
                    icon="delete"
                    mode="contained-tonal"
                    onPress={() => handleRemoveExperience(index)}
                    style={styles.deleteButton}
                  />
                </View>
              ) : (
                <View>
                  <Text variant="titleLarge" style={styles.title}>{exp.title}</Text>
                  <Text variant="titleMedium" style={styles.company}>{exp.company}</Text>
                  <Text variant="labelLarge" style={styles.duration}>{exp.duration}</Text>
                  <Text variant="bodyMedium" style={styles.description}>{exp.description}</Text>
                  <View style={styles.achievementsContainer}>
                    {exp.achievements.map((achievement, i) => (
                      <Text key={i} style={styles.achievement}>• {achievement}</Text>
                    ))}
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {editMode && (
        <Button
          mode="contained"
          onPress={handleAddExperience}
          style={styles.addButton}
          icon="plus"
        >
          Add Experience
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerText: {
    fontWeight: '600',
  },
  headerButton: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  company: {
    color: '#666',
    marginBottom: 4,
  },
  duration: {
    color: '#888',
    marginBottom: 12,
  },
  description: {
    marginBottom: 16,
    lineHeight: 20,
  },
  achievementsContainer: {
    paddingLeft: 8,
  },
  achievement: {
    marginBottom: 4,
    lineHeight: 20,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  addButton: {
    margin: 16,
    borderRadius: 8,
  },
});