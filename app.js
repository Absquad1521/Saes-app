import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Needs: npx expo install expo-linear-gradient

// Mock Data for "Secret Missions" and Posts
const MOCK_POSTS = [
  { id: '1', user: 'AB~SQUAD', content: 'Secret Mission Alpha is live! 🚀', likes: 12 },
  { id: '2', user: 'Squad_Member_07', content: 'Just uploaded the new stickers.', likes: 8 },
];

export default function SaesApp() {
  const [view, setView] = useState('chats'); // Switch between 'chats' and 'posts'
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#00d2ff', '#3a7bd5']} style={styles.header}>
        <Text style={styles.logoText}>SAES APP</Text>
        <Text style={styles.subText}>Powered by AB~SQUAD 1521</Text>
      </LinearGradient>

      {/* Navigation Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setView('chats')}>
          <Text style={[styles.tabText, view === 'chats' && styles.activeTab]}>CHATS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setView('posts')}>
          <Text style={[styles.tabText, view === 'posts' && styles.activeTab]}>SQUAD FEED</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {view === 'chats' ? (
          <View style={styles.chatContainer}>
            <FlatList
              data={[{ id: '1', name: 'Secret Squad Group', lastMsg: 'Mission details inside...' }]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.chatItem}>
                  <View style={styles.avatar} />
                  <View>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.chatMsg}>{item.lastMsg}</Text>
                  </View>
                </View>
              )}
            />
            <View style={styles.inputRow}>
              <TextInput 
                style={styles.input} 
                placeholder="Type a secret message..." 
                placeholderTextColor="#aaa"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity style={styles.sendBtn}>
                <Text style={{color: '#fff'}}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            data={MOCK_POSTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <Text style={styles.postUser}>{item.user}</Text>
                <Text style={styles.postContent}>{item.content}</Text>
                <Text style={styles.postStats}>❤️ {item.likes} Likes</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f8ff' },
  header: { padding: 40, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  logoText: { fontSize: 28, fontWeight: 'bold', color: '#fff', textShadowColor: '#00ffff', textShadowRadius: 10 },
  subText: { color: '#e0e0e0', fontSize: 12 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#fff' },
  tabText: { fontWeight: 'bold', color: '#888' },
  activeTab: { color: '#3a7bd5', borderBottomWidth: 2, borderBottomColor: '#3a7bd5' },
  content: { flex: 1 },
  chatItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#3a7bd5', marginRight: 15 },
  chatName: { fontWeight: 'bold', fontSize: 16 },
  chatMsg: { color: '#666' },
  inputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#f1f1f1', borderRadius: 20, paddingHorizontal: 15, height: 40 },
  sendBtn: { marginLeft: 10, backgroundColor: '#3a7bd5', padding: 10, borderRadius: 20 },
  postCard: { backgroundColor: '#fff', margin: 10, padding: 15, borderRadius: 10, elevation: 3 },
  postUser: { fontWeight: 'bold', color: '#3a7bd5', marginBottom: 5 },
  postContent: { fontSize: 16, color: '#333' },
  postStats: { marginTop: 10, fontSize: 12, color: '#999' }
});
