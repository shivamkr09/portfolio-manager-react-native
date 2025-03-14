import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Skills</Text>
      </View>

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
                  textStyle={styles.chipText}
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
  segments: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
  },
  skillsContainer: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  chipText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '500',
  },
});