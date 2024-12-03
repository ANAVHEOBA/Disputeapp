import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CasesLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A148C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/dashboard')}
          >
            <Ionicons name="home" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Cases',
        }}
      />
      <Stack.Screen
        name="[id]/details"
        options={{
          title: 'Case Details',
        }}
      />
      <Stack.Screen
        name="[id]/evidence"
        options={{
          title: 'Case Evidence',
        }}
      />
      <Stack.Screen
        name="[id]/chat"
        options={{
          title: 'Case Chat',
        }}
      />
      <Stack.Screen
        name="[id]/voting"
        options={{
          title: 'Case Voting',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
  },
});