import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Post } from '../types';
import PostItem from './PostItem';

interface PostListProps {
  posts: Post[];
  hasPostedToday: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, hasPostedToday }) => {
  if (!hasPostedToday) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Post your gratitude journal to see your friends' posts!
        </Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No posts yet. Invite your friends to join!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostItem post={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default PostList; 