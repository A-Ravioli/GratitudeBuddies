import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Image,
} from 'react-native';
import { useStore } from '../hooks/useStore';
import { User } from '../types';
import { colors, typography, spacing, radius, shadows } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
  const { currentUser, updateUser, friends, addFriend, removeFriend } = useStore();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [name, setName] = useState(currentUser?.name || '');
  const [friendUsername, setFriendUsername] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSave = () => {
    if (!username.trim() || !name.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    updateUser({
      ...currentUser!,
      username,
      name,
    });
    
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleAddFriend = () => {
    if (!friendUsername.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    addFriend(friendUsername);
    setFriendUsername('');
  };

  const generateAvatarColor = (id: string) => {
    // Simple hash function to generate a consistent color
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    return `hsl(${hue}, 65%, 55%)`;
  };

  return (
    <Animated.ScrollView 
      style={[styles.container, { opacity: fadeAnim }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name ? name[0].toUpperCase() : '?'}
            </Text>
          </View>
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.namePreview}>{name || 'Your Name'}</Text>
          <Text style={styles.usernamePreview}>@{username || 'username'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Edit Profile</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={colors.text.disabled}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor={colors.text.disabled}
              autoCapitalize="none"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Friends</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add Friend</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.friendInput}
                value={friendUsername}
                onChangeText={setFriendUsername}
                placeholder="Enter friend's username"
                placeholderTextColor={colors.text.disabled}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddFriend}
                activeOpacity={0.7}
                disabled={!friendUsername.trim()}
              >
                <Ionicons name="person-add-outline" size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.friendsList}>
            <Text style={styles.friendsCount}>
              {friends.length} {friends.length === 1 ? 'Friend' : 'Friends'}
            </Text>
            
            {friends.length === 0 ? (
              <View style={styles.emptyFriends}>
                <Ionicons name="people-outline" size={40} color={colors.text.tertiary} />
                <Text style={styles.emptyFriendsText}>
                  You haven't added any friends yet
                </Text>
              </View>
            ) : (
              friends.map((friend) => (
                <View key={friend.id} style={styles.friendItem}>
                  <View style={styles.friendInfo}>
                    <View 
                      style={[
                        styles.friendAvatar,
                        { backgroundColor: generateAvatarColor(friend.id) }
                      ]}
                    >
                      <Text style={styles.avatarText}>
                        {friend.username[0].toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <Text style={styles.friendUsername}>@{friend.username}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFriend(friend.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="person-remove-outline" size={20} color={colors.accent.danger} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.footer} />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  profileHeader: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  avatarText: {
    color: colors.text.primary,
    fontSize: 40,
    fontWeight: typography.fontWeights.bold,
  },
  profileInfo: {
    alignItems: 'center',
  },
  namePreview: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
  },
  usernamePreview: {
    fontSize: typography.fontSizes.md,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  section: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  input: {
    backgroundColor: colors.background.input,
    borderRadius: radius.sm,
    padding: spacing.md,
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendInput: {
    backgroundColor: colors.background.input,
    borderRadius: radius.sm,
    padding: spacing.md,
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
    flex: 1,
    marginRight: spacing.sm,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: radius.round,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
    ...shadows.sm,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
  },
  friendsList: {
    marginTop: spacing.md,
  },
  friendsCount: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  emptyFriends: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFriendsText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.tertiary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.input,
    padding: spacing.md,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  friendName: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    fontWeight: typography.fontWeights.medium,
  },
  friendUsername: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
  },
  removeButton: {
    padding: spacing.sm,
    borderRadius: radius.round,
  },
  footer: {
    height: spacing.xl,
  },
});

export default ProfileScreen; 