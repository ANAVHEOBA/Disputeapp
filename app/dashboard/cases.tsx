import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CasesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [cases, setCases] = useState([
    {
      id: '1',
      title: 'Smart Contract Dispute #123',
      status: 'ACTIVE',
      type: 'CONTRACT',
      amount: '2.5 ETH',
      date: '2024-03-15',
      parties: ['0x1234...', '0x5678...'],
      progress: 65,
    },
    // Add more mock cases here
  ]);

  const filterCases = () => {
    return cases.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.includes(searchQuery)
    );
  };

  const CaseCard = ({ caseData }) => (
    <TouchableOpacity 
      style={styles.caseCard}
      onPress={() => Alert.alert('Case Details', `Viewing case ${caseData.id}`)}
    >
      <View style={styles.caseHeader}>
        <Text style={styles.caseTitle}>{caseData.title}</Text>
        <View style={[styles.statusBadge, 
          { backgroundColor: caseData.status === 'ACTIVE' ? '#4CAF50' : '#FFA000' }]}>
          <Text style={styles.statusText}>{caseData.status}</Text>
        </View>
      </View>

      <View style={styles.caseDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{caseData.amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{caseData.date}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${caseData.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{caseData.progress}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Cases</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cases..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
      </LinearGradient>

      <View style={styles.tabBar}>
        {['active', 'pending', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.casesList}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              // Implement refresh logic
            }}
          />
        }
      >
        {filterCases().map((caseData) => (
          <CaseCard key={caseData.id} caseData={caseData} />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => Alert.alert('New Case', 'Create new case')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A148C',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4A148C',
    fontWeight: 'bold',
  },
  casesList: {
    padding: 15,
  },
  caseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  caseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginRight: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4A148C',
    borderRadius: 2,
  },
  progressText: {
    color: '#666',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A148C',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});