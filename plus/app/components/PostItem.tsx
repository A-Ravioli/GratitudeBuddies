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
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.username[0].toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.date}>{post.date}</Text>
          </View>
        </View>
        <Text style={styles.timeAgo}>{getTimeAgo(post.createdAt)}</Text>
      </View>
      
      <View style={styles.bulletList}>
        {post.bullets.map((bullet, index) => (
          <BulletPoint 
            key={bullet.id} 
            bullet={bullet}
            isLast={index === post.bullets.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: '#888',
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