import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header';
import PostInput from '../components/PostInput';
import PostList from '../components/PostList';
import { useStore } from '../hooks/useStore';
import { BulletPoint } from '../types';

const HomeScreen: React.FC = () => {
  const { posts, hasPostedToday, addPost } = useStore();

  const handleSubmit = (bullets: BulletPoint[]) => {
    addPost(bullets);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="positivity" />
      
      <View style={styles.content}>
        <PostInput onSubmit={handleSubmit} hasPostedToday={hasPostedToday} />
        <PostList posts={posts} hasPostedToday={hasPostedToday} />
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
});

export default HomeScreen; 