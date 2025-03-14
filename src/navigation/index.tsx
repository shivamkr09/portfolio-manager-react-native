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
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.outline,
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 1,
            borderTopColor: theme.colors.surfaceVariant,
            height: 60,
            paddingBottom: 8,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.surfaceVariant,
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: theme.colors.onSurface,
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