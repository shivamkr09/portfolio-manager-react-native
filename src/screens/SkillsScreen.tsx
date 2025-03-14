import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { TextInput, Button, Chip, Text, SegmentedButtons, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addSkill, removeSkill } from '../store/portfolioSlice';
import { Skill } from '../types/portfolio';

export default function SkillsScreen() {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.portfolio.skills);
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState<Skill['category']>('Frontend Development');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      dispatch(addSkill({ name: newSkill.trim(), category }));
      setNewSkill('');
    }
  };

  const categories: Skill['category'][] = [
    'Frontend Development',
    'Backend Development',
    'Languages',
    'Cloud/Databases'
  ];

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Text variant="headlineMedium" style={styles.headerText}>Skills</Text>
      </Surface>

      <View style={styles.content}>
        <SegmentedButtons
          value={category}
          onValueChange={value => setCategory(value as Skill['category'])}
          buttons={categories.map(cat => ({
            value: cat,
            label: cat.split('/')[0],
          }))}
          style={styles.segments}
        />

        <View style={styles.inputContainer}>
          <TextInput
            label="New Skill"
            value={newSkill}
            onChangeText={setNewSkill}
            style={styles.input}
            mode="outlined"
            right={<TextInput.Icon icon="plus" onPress={handleAddSkill} />}
            onSubmitEditing={handleAddSkill}
          />
        </View>

        <ScrollView style={styles.skillsContainer}>
          <View style={styles.chipContainer}>
            {skills
              .filter(skill => skill.category === category)
              .map(skill => (
                <Chip
                  key={skill.name}
                  onClose={() => dispatch(removeSkill(skill.name))}
                  style={styles.chip}
                  mode="outlined"
                >
                  {skill.name}
                </Chip>
              ))}
          </View>
        </ScrollView>
      </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  segments: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  skillsContainer: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
});