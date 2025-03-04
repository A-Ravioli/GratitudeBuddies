import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { Post } from '../types';
import { getTimeAgo } from '../utils/dateUtils';
import { colors, typography, spacing, radius, shadows } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

interface PostItemProps {
  post: Post;
  index?: number;
}

const PostItem: React.FC<PostItemProps> = ({ post, index = 0 }) => {
  // Create a small animation on render for a staggered effect
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(20);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity, transform: [{ translateY }] }
      ]}
    >
      <View style={styles.postContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.username[0].toUpperCase()}</Text>
        </View>
        
        <View style={styles.postBody}>
          {/* Post header with username and time */}
          <View style={styles.postHeader}>
            <Text style={styles.displayName}>{post.username}</Text>
            <Ionicons name="checkmark-circle" size={14} color="#1DA1F2" style={styles.verifiedBadge} />
            <Text style={styles.username}>@{post.username.toLowerCase().replace(/\s/g, '')}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.timeAgo}>{getTimeAgo(post.createdAt)}</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={16} color={colors.text.tertiary} />
            </TouchableOpacity>
          </View>
          
          {/* Bullet points list */}
          <View style={styles.bulletsContainer}>
            {post.bullets.map((bullet, bulletIndex) => (
              <View key={bullet.id} style={styles.bulletItem}>
                <View style={styles.bulletPoint} />
                <View style={styles.bulletContent}>
                  <Text style={styles.bulletText}>{bullet.text}</Text>
                  
                  {bullet.imageUri && (
                    <Image 
                      source={{ uri: bullet.imageUri }}
                      style={styles.bulletImage}
                      resizeMode="cover"
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
          
          {/* Post actions */}
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={18} color={colors.text.tertiary} />
              <Text style={styles.actionText}>{(Math.floor(Math.random() * 20)).toString()}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={18} color={colors.text.tertiary} />
              <Text style={styles.actionText}>{(Math.floor(Math.random() * 100) + 100).toString()}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={18} color={colors.text.tertiary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={18} color={colors.text.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.dark,
  },
  postContent: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: colors.text.primary,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
  },
  postBody: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  displayName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginRight: spacing.xs,
  },
  verifiedBadge: {
    marginRight: spacing.xs,
  },
  username: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginRight: spacing.xs,
  },
  dot: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    marginRight: spacing.xs,
  },
  timeAgo: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
  },
  moreButton: {
    marginLeft: 'auto',
    padding: spacing.xs,
  },
  bulletsContainer: {
    marginVertical: spacing.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  bulletContent: {
    flex: 1,
  },
  bulletText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
  },
  bulletImage: {
    width: '100%',
    height: 150,
    borderRadius: radius.md,
    marginTop: spacing.sm,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
  },
});

export default PostItem; 