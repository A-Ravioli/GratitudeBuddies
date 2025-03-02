import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Post } from '../types';
import BulletPoint from './BulletPoint';
import { getTimeAgo } from '../utils/dateUtils';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{post.date}</Text>
        <Text style={styles.timeAgo}>{getTimeAgo(post.createdAt)}</Text>
      </View>
      
      <View style={styles.bulletList}>
        {post.bullets.map((bullet) => (
          <BulletPoint key={bullet.id} bullet={bullet} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderLeftWidth: 2,
    borderLeftColor: '#333',
    paddingLeft: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ccc',
  },
  timeAgo: {
    fontSize: 14,
    color: '#888',
  },
  bulletList: {
    marginLeft: 8,
  },
});

export default PostItem; 