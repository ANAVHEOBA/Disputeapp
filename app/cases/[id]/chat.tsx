import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CaseChat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch existing messages from an API or blockchain
    const fetchMessages = async () => {
      try {
        // Mock API call
        const mockMessages = [
          { id: '1', sender: 'Alice', text: 'Hello, I have a question about the contract.', timestamp: '2024-03-15 10:00' },
          { id: '2', sender: 'Bob', text: 'Sure, what would you like to know?', timestamp: '2024-03-15 10:05' },
        ];
        setMessages(mockMessages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'You',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([newMsg, ...messages]);
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.messagesContainer} inverted>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageItem}>
            <Text style={styles.messageSender}>{message.sender}</Text>
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  messageSender: {
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4A148C',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});