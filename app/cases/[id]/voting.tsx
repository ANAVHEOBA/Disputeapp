import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CaseVoting() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState({ for: 0, against: 0 });

  useEffect(() => {
    // Fetch voting data from an API or blockchain
    const fetchVotingData = async () => {
      try {
        // Mock API call
        const mockData = { for: 10, against: 5 };
        setVoteCount(mockData);
      } catch (error) {
        console.error('Failed to fetch voting data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotingData();
  }, [id]);

  const handleVote = async (vote) => {
    if (hasVoted) {
      Alert.alert('Error', 'You have already voted');
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call to submit vote
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVoteCount((prev) => ({
        ...prev,
        [vote]: prev[vote] + 1,
      }));
      setHasVoted(true);
      Alert.alert('Success', 'Your vote has been submitted');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit vote');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vote on Case {id}</Text>
      <View style={styles.voteCountContainer}>
        <Text style={styles.voteCountText}>Votes For: {voteCount.for}</Text>
        <Text style={styles.voteCountText}>Votes Against: {voteCount.against}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.voteButton, styles.voteForButton]}
          onPress={() => handleVote('for')}
          disabled={hasVoted}
        >
          <Text style={styles.voteButtonText}>Vote For</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.voteButton, styles.voteAgainstButton]}
          onPress={() => handleVote('against')}
          disabled={hasVoted}
        >
          <Text style={styles.voteButtonText}>Vote Against</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 20,
    textAlign: 'center',
  },
  voteCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  voteCountText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  voteButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  voteForButton: {
    backgroundColor: '#4CAF50',
  },
  voteAgainstButton: {
    backgroundColor: '#F44336',
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});