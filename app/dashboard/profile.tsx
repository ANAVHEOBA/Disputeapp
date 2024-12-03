import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    address: '0x1234...5678',
    ensName: 'user.eth',
    totalCases: 12,
    reputation: 4.8,
    joinedDate: 'May 2023',
  });
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleDisconnect = () => {
    Alert.alert('Success', 'Wallet disconnected successfully');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.ensName}>{profileData.ensName}</Text>
          <Text style={styles.address}>{profileData.address}</Text>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profileData.totalCases}</Text>
          <Text style={styles.statLabel}>Total Cases</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profileData.reputation}</Text>
          <Text style={styles.statLabel}>Reputation</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profileData.joinedDate}</Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={24} color="#4A148C" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#4A148C' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={24} color="#4A148C" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#4A148C' }}
          />
        </View>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Export', 'Export functionality to be implemented')}
        >
          <Ionicons name="download-outline" size={24} color="#4A148C" />
          <Text style={styles.settingButtonText}>Export Data</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingButton}
          onPress={() => Alert.alert('Support', 'Support functionality to be implemented')}
        >
          <Ionicons name="help-circle-outline" size={24} color="#4A148C" />
          <Text style={styles.settingButtonText}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.settingButton, styles.disconnectButton]}
          onPress={handleDisconnect}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={[styles.settingButtonText, styles.disconnectText]}>
            Disconnect Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    padding: 20,
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4A148C',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  ensName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  address: {
    color: '#fff',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  settingsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  disconnectButton: {
    marginTop: 20,
  },
  disconnectText: {
    color: '#FF3B30',
  },
});