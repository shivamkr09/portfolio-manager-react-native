import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Card, TextInput, Button, IconButton, Text, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateProjects } from '../store/portfolioSlice';
import { Project } from '../types/portfolio';

export default function ProjectsScreen() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.portfolio.projects);
  const [editMode, setEditMode] = useState(false);
  const [editedProjects, setEditedProjects] = useState<Project[]>(projects);

  const handleUpdateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...editedProjects];
    if (field === 'technologies') {
      updated[index][field] = value.split(',').map(tech => tech.trim());
    } else {
      updated[index][field] = value;
    }
    setEditedProjects(updated);
  };

  const handleAddProject = () => {
    setEditedProjects([...editedProjects, {
      title: '',
      description: '',
      technologies: [],
      image: '',
      githubUrl: '',
      demoUrl: '',
    }]);
  };

  const handleRemoveProject = (index: number) => {
    setEditedProjects(editedProjects.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    dispatch(updateProjects(editedProjects));
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Text variant="headlineMedium" style={styles.headerText}>Projects</Text>
        <Button
          mode={editMode ? 'contained' : 'outlined'}
          onPress={() => editMode ? handleSave() : setEditMode(true)}
          style={styles.headerButton}
        >
          {editMode ? 'Save' : 'Edit'}
        </Button>
      </Surface>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {editedProjects.map((project, index) => (
          <Card key={index} style={styles.card} elevation={3}>
            <Card.Content style={styles.cardContent}>
              {editMode ? (
                <View>
                  <TextInput
                    label="Title"
                    value={project.title}
                    onChangeText={(value) => handleUpdateProject(index, 'title', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Description"
                    value={project.description}
                    onChangeText={(value) => handleUpdateProject(index, 'description', value)}
                    multiline
                    numberOfLines={3}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Technologies (comma-separated)"
                    value={project.technologies.join(', ')}
                    onChangeText={(value) => handleUpdateProject(index, 'technologies', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Image URL"
                    value={project.image}
                    onChangeText={(value) => handleUpdateProject(index, 'image', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="GitHub URL"
                    value={project.githubUrl}
                    onChangeText={(value) => handleUpdateProject(index, 'githubUrl', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Demo URL"
                    value={project.demoUrl}
                    onChangeText={(value) => handleUpdateProject(index, 'demoUrl', value)}
                    style={styles.input}
                    mode="outlined"
                  />
                  <IconButton
                    icon="delete"
                    mode="contained-tonal"
                    onPress={() => handleRemoveProject(index)}
                    style={styles.deleteButton}
                  />
                </View>
              ) : (
                <View>
                  <Text variant="titleLarge" style={styles.projectTitle}>{project.title}</Text>
                  <View style={styles.techContainer}>
                    {project.technologies.map((tech, i) => (
                      <Text key={i} style={styles.techItem}>{tech}</Text>
                    ))}
                  </View>
                  <Text variant="bodyMedium" style={styles.description}>{project.description}</Text>
                  {project.githubUrl && (
                    <Button
                      mode="text"
                      icon="github"
                      onPress={() => {}}
                      style={styles.linkButton}
                    >
                      View on GitHub
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      mode="text"
                      icon="web"
                      onPress={() => {}}
                      style={styles.linkButton}
                    >
                      View Demo
                    </Button>
                  )}
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {editMode && (
        <Button
          mode="contained"
          onPress={handleAddProject}
          style={styles.addButton}
          icon="plus"
        >
          Add Project
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
  projectTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  techItem: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  description: {
    marginBottom: 16,
    lineHeight: 20,
  },
  linkButton: {
    marginVertical: 4,
    alignSelf: 'flex-start',
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