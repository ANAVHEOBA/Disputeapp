import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ArbitratorScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [arbitratorStats, setArbitratorStats] = useState({
    totalCases: 0,
    activeCases: 0,
    completedCases: 0,
    successRate: 0,
    stakedAmount: '0',
    earnings: '0',
  });
  const [pendingCases, setPendingCases] = useState([
    {
      id: '1',
      title: 'Smart Contract Dispute #123',
      status: 'PENDING',
      amount: '0.5 ETH',
      created: '2024-03-15',
      description: 'Contract execution dispute between two parties',
      complexity: 'Medium',
      timeLeft: '48 hours',
    },
    {
      id: '2',
      title: 'Payment Dispute #456',
      status: 'PENDING',
      amount: '1.2 ETH',
      created: '2024-03-14',
      description: 'Payment settlement dispute for services rendered',
      complexity: 'High',
      timeLeft: '24 hours',
    },
    {
      id: '3',
      title: 'NFT Ownership Dispute #789',
      status: 'PENDING',
      amount: '2.0 ETH',
      created: '2024-03-13',
      description: 'NFT ownership and rights dispute',
      complexity: 'Low',
      timeLeft: '72 hours',
    }
  ]);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Mock wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsWalletConnected(true);
      Alert.alert('Success', 'Wallet connected successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArbitratorData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setArbitratorStats({
        totalCases: 45,
        activeCases: 3,
        completedCases: 42,
        successRate: 98,
        stakedAmount: '5.5 ETH',
        earnings: '12.3 ETH',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch arbitrator data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isWalletConnected) {
      fetchArbitratorData();
    }
  }, [isWalletConnected]);

  const handleStakeMore = () => {
    Alert.alert(
      'Stake More',
      'How much ETH would you like to stake?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Stake',
          onPress: () => Alert.alert('Success', 'Staking initiated'),
        },
      ]
    );
  };

  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Earnings',
      'Are you sure you want to withdraw your earnings?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Withdraw',
          onPress: () => Alert.alert('Success', 'Withdrawal initiated'),
        },
      ]
    );
  };

  const CaseCard = ({ caseData }) => (
    <View style={styles.caseCard}>
      <View style={styles.caseHeader}>
        <Text style={styles.caseTitle}>{caseData.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: '#FFA000' }]}>
          <Text style={styles.statusText}>{caseData.status}</Text>
        </View>
      </View>

      <Text style={styles.caseDescription}>{caseData.description}</Text>

      <View style={styles.caseDetailsGrid}>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{caseData.amount}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{caseData.timeLeft}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="trending-up-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{caseData.complexity}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.reviewButton}
        onPress={() => Alert.alert('Review Case', `Reviewing case ${caseData.id}`)}
      >
        <Text style={styles.reviewButtonText}>Review Case</Text>
      </TouchableOpacity>
    </View>
  );

  if (!isWalletConnected) {
    return (
      <View style={styles.connectContainer}>
        <Ionicons name="wallet-outline" size={48} color="#4A148C" />
        <Text style={styles.connectTitle}>Connect Wallet</Text>
        <Text style={styles.connectText}>
          Please connect your wallet to access the arbitrator dashboard
        </Text>
        <TouchableOpacity 
          style={styles.connectButton} 
          onPress={connectWallet}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.connectButtonText}>Connect Wallet</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchArbitratorData} />
      }
    >
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Arbitrator Dashboard</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{arbitratorStats.stakedAmount}</Text>
          <Text style={styles.statLabel}>Staked Amount</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{arbitratorStats.earnings}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{arbitratorStats.successRate}%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{arbitratorStats.totalCases}</Text>
          <Text style={styles.statLabel}>Total Cases</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleStakeMore}
        >
          <Ionicons name="add-circle-outline" size={24} color="#4A148C" />
          <Text style={styles.actionButtonText}>Stake More</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleWithdraw}
        >
          <Ionicons name="cash-outline" size={24} color="#4A148C" />
          <Text style={styles.actionButtonText}>Withdraw Earnings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.casesSection}>
        <Text style={styles.sectionTitle}>Pending Cases</Text>
        {pendingCases.map((caseItem) => (
          <CaseCard key={caseItem.id} caseData={caseItem} />
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
  connectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  connectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginTop: 20,
    marginBottom: 10,
  },
  connectText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#4A148C',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    width: width * 0.8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerGradient: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
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
  actionsSection: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#f0e6ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  actionButtonText: {
    color: '#4A148C',
    marginTop: 5,
    fontWeight: '600',
  },
  casesSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 15,
  },
  caseCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
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
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  caseDescription: {
    color: '#666',
    marginBottom: 15,
    fontSize: 14,
  },
  caseDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: '#666',
    marginLeft: 5,
    fontSize: 14,
  },
  reviewButton: {
    backgroundColor: '#4A148C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});