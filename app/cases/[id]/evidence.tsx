import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CaseEvidence() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [evidenceList, setEvidenceList] = useState([]);
  const [newEvidence, setNewEvidence] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvidence();
  }, [id]);

  const fetchEvidence = async () => {
    try {
      // Mock API call
      const mockData = [
        {
          id: '1',
          type: 'DOCUMENT',
          title: 'Original Contract',
          description: 'Signed contract between parties',
          submittedBy: '0x1234...5678',
          timestamp: '2024-03-15 14:30',
          hash: '0xabc...def'
        },
        {
          id: '2',
          type: 'IMAGE',
          title: 'Payment Receipt',
          description: 'Transaction proof',
          submittedBy: '0x8765...4321',
          timestamp: '2024-03-16 09:15',
          hash: '0xfed...cba'
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvidenceList(mockData);
    } catch (error) {
      console.error('Error fetching evidence:', error);
      Alert.alert('Error', 'Failed to load evidence');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEvidence = async () => {
    if (!newEvidence.trim()) {
      Alert.alert('Error', 'Please enter evidence description');
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvidenceItem = {
        id: Date.now().toString(),
        type: 'DOCUMENT',
        title: newEvidence,
        description: newEvidence,
        submittedBy: '0x1234...5678',
        timestamp: new Date().toISOString(),
        hash: '0x' + Math.random().toString(16).slice(2)
      };

      setEvidenceList([newEvidenceItem, ...evidenceList]);
      setNewEvidence('');
      Alert.alert('Success', 'Evidence submitted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit evidence');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A148C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.submitSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter evidence description"
          value={newEvidence}
          onChangeText={setNewEvidence}
          multiline
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitEvidence}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Evidence'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.evidenceList}>
        {evidenceList.map(evidence => (
          <View key={evidence.id} style={styles.evidenceItem}>
            <View style={styles.evidenceHeader}>
              <Ionicons 
                name={evidence.type === 'DOCUMENT' ? 'document-text' : 'image'} 
                size={24} 
                color="#4A148C" 
              />
              <Text style={styles.evidenceTitle}>{evidence.title}</Text>
            </View>
            <Text style={styles.evidenceDescription}>{evidence.description}</Text>
            <View style={styles.evidenceFooter}>
              <Text style={styles.evidenceSubmitter}>
                Submitted by: {evidence.submittedBy}
              </Text>
              <Text style={styles.evidenceTimestamp}>{evidence.timestamp}</Text>
            </View>
            <Text style={styles.evidenceHash}>Hash: {evidence.hash}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
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
  submitSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  evidenceList: {
    flex: 1,
  },
  evidenceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  evidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  evidenceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A148C',
    marginLeft: 10,
  },
  evidenceDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  evidenceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  evidenceSubmitter: {
    fontSize: 14,
    color: '#666',
  },
  evidenceTimestamp: {
    fontSize: 14,
    color: '#666',
  },
  evidenceHash: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'monospace',
  },
});