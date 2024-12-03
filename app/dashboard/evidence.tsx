import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function EvidenceScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [evidenceList, setEvidenceList] = useState([
    {
      id: '1',
      caseId: 'CASE-123',
      type: 'DOCUMENT',
      hash: 'QmX...abc',
      timestamp: '2024-03-15 14:30',
      status: 'VERIFIED',
      description: 'Contract Agreement Document',
    },
    // Add more mock evidence
  ]);

  const EvidenceCard = ({ evidence }) => (
    <TouchableOpacity 
      style={styles.evidenceCard}
      onPress={() => Alert.alert('Evidence Details', `Viewing evidence ${evidence.id}`)}
    >
      <View style={styles.evidenceHeader}>
        <View style={styles.evidenceType}>
          <Ionicons 
            name={evidence.type === 'DOCUMENT' ? 'document-text' : 'image'} 
            size={24} 
            color="#4A148C" 
          />
          <Text style={styles.evidenceTitle}>{evidence.description}</Text>
        </View>
        <View style={[styles.statusBadge, 
          { backgroundColor: evidence.status === 'VERIFIED' ? '#4CAF50' : '#FFA000' }]}>
          <Text style={styles.statusText}>{evidence.status}</Text>
        </View>
      </View>

      <View style={styles.evidenceDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Case ID:</Text>
          <Text style={styles.detailText}>{evidence.caseId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>IPFS Hash:</Text>
          <Text style={styles.detailText}>{evidence.hash}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Submitted:</Text>
          <Text style={styles.detailText}>{evidence.timestamp}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('View', 'Opening evidence viewer')}
        >
          <Ionicons name="eye-outline" size={20} color="#4A148C" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Verify', 'Verifying evidence')}
        >
          <Ionicons name="shield-checkmark-outline" size={20} color="#4A148C" />
          <Text style={styles.actionButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Evidence Repository</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>23</Text>
            <Text style={styles.statLabel}>Total Files</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.evidenceList}>
        {evidenceList.map((evidence) => (
          <EvidenceCard key={evidence.id} evidence={evidence} />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => Alert.alert('Upload', 'Upload new evidence')}
      >
        <Ionicons name="cloud-upload" size={24} color="#fff" />
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
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    color: '#fff',
    opacity: 0.8,
  },
  evidenceList: {
    padding: 15,
  },
  evidenceCard: {
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
  evidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  evidenceType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  evidenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
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
  evidenceDetails: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    width: 100,
    color: '#666',
    fontWeight: '500',
  },
  detailText: {
    flex: 1,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionButtonText: {
    marginLeft: 5,
    color: '#4A148C',
    fontWeight: '500',
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