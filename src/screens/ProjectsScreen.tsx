import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, TextInput, Button, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateProjects } from '../store/portfolioSlice';
import { Project } from '../types/portfolio';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
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
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3
  },
  cardContent: {
    padding: 20
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
    letterSpacing: 0.5
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16
  },
  techBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 20
  },
  techText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500'
  },
  description: {
    color: '#475569',
    marginBottom: 20,
    lineHeight: 24,
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12
  },
  formContainer: {
    gap: 16
  },
  bottomBar: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0'
  },
  editButton: {
    borderRadius: 12
  },
  addButton: {
    borderRadius: 12,
    paddingVertical: 8
  },
  input: {
    backgroundColor: '#ffffff',
    fontSize: 16
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fef2f2',
    borderRadius: 20
  }
});

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Projects</Text>
        <Button
          mode={editMode ? 'contained' : 'outlined'}
          onPress={() => editMode ? handleSave() : setEditMode(true)}
          style={[styles.editButton, { backgroundColor: editMode ? '#2563eb' : 'transparent' }]}
          labelStyle={{ fontSize: 14, fontWeight: '600' }}
        >
          {editMode ? 'Save Changes' : 'Edit Projects'}
        </Button>
      </View>

      <ScrollView style={styles.scrollContent}>
        {editedProjects.map((project, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              {editMode ? (
                <View style={styles.formContainer}>
                  <TextInput
                    label="Project Title"
                    value={project.title}
                    onChangeText={(value) => handleUpdateProject(index, 'title', value)}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Project Description"
                    value={project.description}
                    onChangeText={(value) => handleUpdateProject(index, 'description', value)}
                    multiline
                    numberOfLines={4}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Technologies (comma-separated)"
                    value={project.technologies.join(', ')}
                    onChangeText={(value) => handleUpdateProject(index, 'technologies', value)}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Image URL"
                    value={project.image}
                    onChangeText={(value) => handleUpdateProject(index, 'image', value)}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="GitHub URL"
                    value={project.githubUrl}
                    onChangeText={(value) => handleUpdateProject(index, 'githubUrl', value)}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Demo URL"
                    value={project.demoUrl}
                    onChangeText={(value) => handleUpdateProject(index, 'demoUrl', value)}
                    mode="outlined"
                    style={styles.input}
                  />
                  <IconButton
                    icon="delete"
                    size={24}
                    onPress={() => handleRemoveProject(index)}
                    style={styles.deleteButton}
                    iconColor="#ef4444"
                  />
                </View>
              ) : (
                <View>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <View style={styles.techContainer}>
                    {project.technologies.map((tech, i) => (
                      <View key={i} style={styles.techBadge}>
                        <Text style={styles.techText}>{tech}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.description}>{project.description}</Text>
                  <View style={styles.buttonContainer}>
                    {project.githubUrl && (
                      <Button
                        mode="outlined"
                        icon="github"
                        onPress={() => {}}
                        style={{ flex: 1, borderColor: '#2563eb' }}
                        labelStyle={{ color: '#2563eb', fontSize: 14, fontWeight: '600' }}
                      >
                        View Code
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        mode="contained"
                        icon="web"
                        onPress={() => {}}
                        style={{ flex: 1, backgroundColor: '#2563eb' }}
                        labelStyle={{ fontSize: 14, fontWeight: '600' }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {editMode && (
        <View style={styles.bottomBar}>
          <Button
            mode="contained"
            onPress={handleAddProject}
            icon="plus"
            style={[styles.addButton, { backgroundColor: '#2563eb' }]}
            labelStyle={{ fontSize: 14, fontWeight: '600' }}
          >
            Add New Project
          </Button>
        </View>
      )}
    </View>
  );
}