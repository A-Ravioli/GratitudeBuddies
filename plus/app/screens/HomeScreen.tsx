wimport React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Header from '../components/Header';
import PostInput from '../components/PostInput';
import PostList from '../components/PostList';
import { useStore } from '../hooks/useStore';
import { BulletPoint } from '../types';

const HomeScreen: React.FC = () => {
  const { posts, hasPostedToday, addPost } = useStore();
  const [isTestMode, setIsTestMode] = useState(false);

  const handleSubmit = (bullets: BulletPoint[]) => {
    if (!isTestMode) {
      addPost(bullets);
    }
  };

  const toggleTestMode = () => {
    setIsTestMode(!isTestMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="positivity" />
      
      <View style={styles.content}>
        {hasPostedToday && (
          <TouchableOpacity style={styles.testModeButton} onPress={toggleTestMode}>
            <Text style={styles.testModeButtonText}>
              {isTestMode ? 'Exit Test Mode' : 'Enter Test Mode'}
            </Text>
          </TouchableOpacity>
        )}
        
        <PostInput 
          onSubmit={handleSubmit} 
          hasPostedToday={hasPostedToday} 
          isTestMode={isTestMode}
        />
        
        {(!hasPostedToday || isTestMode) ? (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              Post your gratitude journal to see your friends' posts!
            </Text>
          </View>
        ) : (
          <PostList posts={posts} hasPostedToday={hasPostedToday} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  testModeButton: {
    backgroundColor: '#333',
    padding: 8,
    margin: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  testModeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default HomeScreen; 