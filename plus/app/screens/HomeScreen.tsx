import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Text,
  StatusBar,
  Animated,
  Platform,
  Image
} from 'react-native';
import PostInput from '../components/PostInput';
import PostList from '../components/PostList';
import { useStore } from '../hooks/useStore';
import { BulletPoint } from '../types';
import { colors, typography, spacing, radius, shadows } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Friends: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const { posts, hasPostedToday, addPost, currentUser } = useStore();
  const [isTestMode, setIsTestMode] = useState(false);
  const [showPostInput, setShowPostInput] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = (bullets: BulletPoint[]) => {
    if (!isTestMode) {
      addPost(bullets);
    }
    setShowPostInput(false);
  };

  const toggleTestMode = () => {
    setIsTestMode(!isTestMode);
  };

  const togglePostInput = () => {
    setShowPostInput(!showPostInput);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.dark} />
      
      {/* Twitter-style Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {currentUser?.username ? currentUser.username[0].toUpperCase() : 'P'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Ionicons name="add-circle" size={32} color={colors.primary} />
        </View>

        <TouchableOpacity 
          style={styles.friendsButton}
          onPress={() => navigation.navigate('Friends')}
        >
          <Ionicons name="people-outline" size={22} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
      
      <Animated.View 
        style={[
          styles.content,
          { opacity: fadeAnim }
        ]}
      >
        {hasPostedToday && (
          <TouchableOpacity 
            style={styles.testModeButton} 
            onPress={toggleTestMode}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isTestMode ? "close-circle-outline" : "flask-outline"} 
              size={16} 
              color={isTestMode ? colors.accent.danger : colors.text.secondary} 
            />
            <Text style={[
              styles.testModeButtonText,
              isTestMode && styles.testModeActiveText
            ]}>
              {isTestMode ? 'Exit Test Mode' : 'Enter Test Mode'}
            </Text>
          </TouchableOpacity>
        )}
        
        {showPostInput && (
          <PostInput 
            onSubmit={handleSubmit} 
            hasPostedToday={hasPostedToday} 
            isTestMode={isTestMode}
          />
        )}
        
        {(!hasPostedToday || isTestMode) && !showPostInput ? (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              Post your gratitude journal to see your friends' posts!
            </Text>
            <TouchableOpacity 
              style={styles.createPostButton}
              onPress={togglePostInput}
            >
              <Text style={styles.createPostButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <PostList posts={posts} hasPostedToday={hasPostedToday} />
        )}
      </Animated.View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={26} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={26} color={colors.text.tertiary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications-outline" size={26} color={colors.text.tertiary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="mail-outline" size={26} color={colors.text.tertiary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  profileButton: {
    padding: spacing.xs,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: colors.text.primary,
    fontWeight: typography.fontWeights.bold,
    fontSize: typography.fontSizes.sm,
  },
  logoContainer: {
    alignItems: 'center',
  },
  friendsButton: {
    padding: spacing.xs,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  testModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.input,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    margin: spacing.md,
    borderRadius: radius.round,
    alignSelf: 'flex-end',
    ...shadows.sm,
  },
  testModeButtonText: {
    color: colors.text.secondary,
    fontSize: typography.fontSizes.sm,
    marginLeft: spacing.xs,
    fontWeight: "500",
  },
  testModeActiveText: {
    color: colors.accent.danger,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  message: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
    marginBottom: spacing.xl,
  },
  createPostButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.round,
    ...shadows.sm,
  },
  createPostButtonText: {
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background.dark,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  navItem: {
    padding: spacing.sm,
  },
});

export default HomeScreen; 