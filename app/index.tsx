import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    if (isWalletConnected) {
      router.push('/dashboard');
    } else {
      router.push('/modals/wallet-connect');
    }
  };

  // In your HomePage component
const handleCreateCase = () => {
  if (isWalletConnected) {
    router.push('/modals/create-case');
  } else {
    Alert.alert(
      'Wallet Required',
      'Please connect your wallet first to create a case',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Connect Wallet',
          onPress: () => router.push('/modals/wallet-connect'),
        },
      ]
    );
  }
};

  const FeatureCard = ({ icon, title, description }) => (
    <View style={styles.featureCard}>
      <Ionicons name={icon} size={32} color="#4A148C" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#4A148C', '#7B1FA2']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>DecentralJustice</Text>
            <TouchableOpacity 
              style={styles.connectButton}
              onPress={handleConnectWallet}
            >
              <Text style={styles.connectButtonText}>
                {isWalletConnected ? 'Dashboard' : 'Connect Wallet'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              Decentralized Dispute Resolution
            </Text>
            <Text style={styles.heroSubtitle}>
              Fair, Transparent, and Efficient Justice System
            </Text>
            <TouchableOpacity 
              style={styles.createCaseButton}
              onPress={handleCreateCase}
            >
              <Text style={styles.createCaseButtonText}>Create New Case</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>1,234</Text>
              <Text style={styles.statLabel}>Cases Resolved</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>56</Text>
              <Text style={styles.statLabel}>Active Arbitrators</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featureGrid}>
              <FeatureCard 
                icon="shield-checkmark-outline"
                title="Secure"
                description="Blockchain-backed security and transparency"
              />
              <FeatureCard 
                icon="scale-outline"
                title="Fair"
                description="Impartial arbitration process"
              />
              <FeatureCard 
                icon="flash-outline"
                title="Fast"
                description="Quick dispute resolution"
              />
              <FeatureCard 
                icon="cash-outline"
                title="Cost-Effective"
                description="Lower than traditional courts"
              />
            </View>
          </View>

          {/* How It Works Section */}
          <View style={styles.howItWorksSection}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepTitle}>Connect Wallet</Text>
                <Text style={styles.stepDescription}>
                  Link your Web3 wallet to get started
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepTitle}>Create Case</Text>
                <Text style={styles.stepDescription}>
                  Submit your dispute details
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepTitle}>Get Resolution</Text>
                <Text style={styles.stepDescription}>
                  Receive fair arbitration
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={handleConnectWallet}
            >
              <Text style={styles.ctaButtonText}>
                {isWalletConnected ? 'Go to Dashboard' : 'Connect Wallet'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    paddingTop: StatusBar.currentHeight || 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  connectButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  createCaseButton: {
    backgroundColor: '#4A148C',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createCaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A148C',
    marginTop: 10,
  },
  featureDescription: {
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  howItWorksSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  stepsList: {
    marginTop: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A148C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  stepDescription: {
    color: '#666',
    flex: 1,
  },
  ctaSection: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#4A148C',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
  },
  ctaButtonText: {
    color: '#4A148C',
    fontSize: 18,
    fontWeight: '600',
  },
});