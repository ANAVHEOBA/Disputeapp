import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Case {
  id: string;
  title: string;
  status: 'PENDING' | 'ACTIVE' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  stake: string;
  parties: {
    plaintiff: string;
    defendant: string;
  };
}

export default function CasesIndex() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Case['status'] | 'ALL'>('ALL');

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      // Mock API call
      const mockCases: Case[] = [
        {
          id: '1',
          title: 'Smart Contract Dispute #123',
          status: 'PENDING',
          createdAt: '2024-03-15',
          stake: '2.5 ETH',
          parties: {
            plaintiff: '0x1234...5678',
            defendant: '0x8765...4321',
          },
        },
        {
          id: '2',
          title: 'NFT Ownership Dispute',
          status: 'ACTIVE',
          createdAt: '2024-03-14',
          stake: '1.0 ETH',
          parties: {
            plaintiff: '0x2345...6789',
            defendant: '0x9876...5432',
          },
        },
        {
          id: '3',
          title: 'DeFi Protocol Dispute',
          status: 'RESOLVED',
          createdAt: '2024-03-13',
          stake: '5.0 ETH',
          parties: {
            plaintiff: '0x3456...7890',
            defendant: '0x0987...6543',
          },
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      setCases(mockCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCases();
  };

  const navigateToCase = (caseId: string) => {
    router.push(`/cases/${caseId}/details`);
  };

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'PENDING':
        return '#FFA000';
      case 'ACTIVE':
        return '#4CAF50';
      case 'RESOLVED':
        return '#2196F3';
      case 'CLOSED':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'ALL' || case_.status === filter;
    return matchesSearch && matchesFilter;
  });

  const renderCaseItem = ({ item }: { item: Case }) => (
    <TouchableOpacity
      style={styles.caseCard}
      onPress={() => navigateToCase(item.id)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.caseTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.createdAt}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.stake}</Text>
        </View>
      </View>

      <View style={styles.partiesContainer}>
        <Text style={styles.partyText}>
          Plaintiff: {item.parties.plaintiff}
        </Text>
        <Text style={styles.partyText}>
          Defendant: {item.parties.defendant}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A148C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cases..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        {(['ALL', 'PENDING', 'ACTIVE', 'RESOLVED', 'CLOSED'] as const).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filter === status && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(status)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === status && styles.filterButtonTextActive,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredCases}
        renderItem={renderCaseItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    overflow: 'scroll',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#4A148C',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  caseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
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
  cardDetails: {
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
  partiesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  partyText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
});