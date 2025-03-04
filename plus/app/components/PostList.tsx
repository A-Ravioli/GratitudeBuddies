import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Post } from '../types';
import PostItem from './PostItem';
import { colors, typography, spacing, radius } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { emptyStateImageUri } from '../utils/assetUtils';

interface PostListProps {
  posts: Post[];
  hasPostedToday: boolean;
}

const TabItems = [
  { id: 'for_you', label: 'For you' },
  { id: 'following', label: 'Following' },
  { id: 'gratitude', label: 'Gratitude' }
];

const PostList: React.FC<PostListProps> = ({ posts, hasPostedToday }) => {
  const [activeTab, setActiveTab] = useState('for_you');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  if (!hasPostedToday) {
    return (
      <View style={styles.emptyContainer}>
        <Image 
          source={{ uri: emptyStateImageUri }} 
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyHeader}>Ready to share?</Text>
        <Text style={styles.emptyText}>
          Post your gratitude journal to see your friends' posts!
        </Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="people-outline" size={80} color={colors.text.tertiary} />
        <Text style={styles.emptyHeader}>No posts yet</Text>
        <Text style={styles.emptyText}>
          Invite your friends to join and share their gratitude journals!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {TabItems.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabItem, activeTab === tab.id && styles.activeTab]}
            onPress={() => handleTabPress(tab.id)}
          >
            <Text
              style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.id && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Post List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <PostItem post={item} index={index} />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={3}
        windowSize={5}
      />

      {/* Floating Action Button for creating new post */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="add" size={30} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  tabItem: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Empty style object for the active tab item - the active state is shown through the indicator
  },
  tabText: {
    color: colors.text.tertiary,
    fontSize: typography.fontSizes.md,
  },
  activeTabText: {
    color: colors.text.primary,
    fontWeight: typography.fontWeights.bold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 56,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: radius.round,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: spacing.md,
    opacity: 0.8,
  },
  emptyHeader: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
  },
  floatingButton: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});

export default PostList; 