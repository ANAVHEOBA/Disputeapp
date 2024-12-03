import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    activeCases: 5,
    pendingEvidence: 3,
    totalStaked: '2.5 ETH',
    recentActivity: [
      {
        id: 1,
        type: 'CASE_CREATED',
        message: 'New case #123 created',
        timestamp: '2h ago',
      },
      {
        id: 2,
        type: 'EVIDENCE_SUBMITTED',
        message: 'Evidence submitted for case #120',
        timestamp: '3h ago',
      },
      {
        id: 3,
        type: 'CASE_RESOLVED',
        message: 'Case #119 resolved successfully',
        timestamp: '5h ago',
      },
      {
        id: 4,
        type: 'STAKE_ADDED',
        message: 'Added 1.0 ETH to stake',
        timestamp: '1d ago',
      },
    ],
  });

  const refreshDashboard = async () => {
    setIsLoading(true);
    try {
      // Implement refresh logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickAction = ({ icon, title, route }) => (
    <TouchableOpacity 
      style={styles.quickAction}
      onPress={() => router.push(route)}
    >
      <View style={styles.quickActionIcon}>
        <Ionicons name={icon} size={24} color="#4A148C" />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'CASE_CREATED':
        return 'create-outline';
      case 'EVIDENCE_SUBMITTED':
        return 'document-outline';
      case 'CASE_RESOLVED':
        return 'checkmark-circle-outline';
      case 'STAKE_ADDED':
        return 'cash-outline';
      default:
        return 'time-outline';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshDashboard} />
      }
    >
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.header}
      >
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>User.eth</Text>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActionsGrid}>
        <QuickAction 
          icon="add-circle-outline" 
          title="New Case"
          route="/dashboard/cases"
        />
        <QuickAction 
          icon="cloud-upload-outline" 
          title="Upload Evidence"
          route="/dashboard/evidence"
        />
        <QuickAction 
          icon="scale-outline" 
          title="Arbitrate"
          route="/dashboard/arbitrator"
        />
        <QuickAction 
          icon="stats-chart-outline" 
          title="Analytics"
          route="/dashboard/stats"
        />
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{dashboardData.activeCases}</Text>
            <Text style={styles.statLabel}>Active Cases</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{dashboardData.pendingEvidence}</Text>
            <Text style={styles.statLabel}>Pending Evidence</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{dashboardData.totalStaked}</Text>
            <Text style={styles.statLabel}>Total Staked</Text>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {dashboardData.recentActivity.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Ionicons 
                name={getActivityIcon(activity.type)} 
                size={20} 
                color="#4A148C" 
              />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityMessage}>{activity.message}</Text>
              <Text style={styles.activityTime}>{activity.timestamp}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    marginTop: -30,
  },
  quickAction: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 20, 140, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  activityContainer: {
    padding: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(74, 20, 140, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
});