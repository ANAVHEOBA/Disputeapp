import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CaseDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [caseDetails, setCaseDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  const fetchCaseDetails = async () => {
    try {
      setIsLoading(true);
      // Mock API call - replace with your actual API call
      const mockData = {
        id,
        title: 'Smart Contract Dispute #123',
        status: 'PENDING',
        createdAt: '2024-03-15',
        parties: {
          plaintiff: '0x1234...5678',
          defendant: '0x8765...4321'
        },
        stake: '2.5 ETH',
        summary: 'Dispute regarding smart contract execution and payment terms.',
        timeline: [
          { date: '2024-03-15', event: 'Case Created' },
          { date: '2024-03-16', event: 'Evidence Submitted' }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCaseDetails(mockData);
    } catch (error) {
      console.error('Error fetching case details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A148C" />
      </View>
    );
  }

  if (!caseDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load case details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{caseDetails.title}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{caseDetails.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Case Summary</Text>
        <Text style={styles.summaryText}>{caseDetails.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parties Involved</Text>
        <View style={styles.partyContainer}>
          <Text style={styles.partyLabel}>Plaintiff:</Text>
          <Text style={styles.partyAddress}>{caseDetails.parties.plaintiff}</Text>
        </View>
        <View style={styles.partyContainer}>
          <Text style={styles.partyLabel}>Defendant:</Text>
          <Text style={styles.partyAddress}>{caseDetails.parties.defendant}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stake Amount</Text>
        <Text style={styles.stakeAmount}>{caseDetails.stake}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timeline</Text>
        {caseDetails.timeline.map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.timelineDate}>{item.date}</Text>
            <Text style={styles.timelineEvent}>{item.event}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#4A148C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A148C',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  partyContainer: {
    marginBottom: 10,
  },
  partyLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  partyAddress: {
    fontSize: 16,
    color: '#333',
  },
  stakeAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  timelineItem: {
    marginBottom: 10,
  },
  timelineDate: {
    fontSize: 14,
    color: '#666',
  },
  timelineEvent: {
    fontSize: 16,
    color: '#333',
  },
});