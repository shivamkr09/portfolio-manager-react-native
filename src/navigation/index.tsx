import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import AboutScreen from '../screens/AboutScreen';
import SkillsScreen from '../screens/SkillsScreen';
import ExperienceScreen from '../screens/ExperienceScreen';
import ProjectsScreen from '../screens/ProjectsScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#64748b',
          tabBarStyle: {
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            borderTopWidth: 0,
            backgroundColor: '#ffffff',
            height: 64,
            paddingBottom: 8,
          },
          headerStyle: {
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            backgroundColor: '#ffffff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
            color: '#1f2937',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Skills"
          component={SkillsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="lightbulb" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Experience"
          component={ExperienceScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="briefcase" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="folder" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}