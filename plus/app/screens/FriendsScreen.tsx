import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { DEFAULT_AVATAR_BASE64 } from '../../assets/default-avatar';

// Mock data for friends
const MOCK_FRIENDS = [
  { 
    id: '1', 
    name: 'Sonith Sunku', 
    username: 'sonithsunku', 
    status: 'NEW CONTACT',
    hasAvatar: true 
  },
  { 
    id: '2', 
    name: 'Alex Hu', 
    username: 'alexhu2004', 
    status: 'NEW CONTACT',
    hasAvatar: true 
  },
  { 
    id: '3', 
    name: 'Sofia Utoft', 
    username: 'sofiautoft', 
    status: '2+ MUTUAL FRIENDS',
    hasAvatar: true,
    isOnline: true
  },
  { 
    id: '4', 
    name: 'Nancy Puthenpurayil', 
    username: 'nancy_puthen', 
    status: 'NEW CONTACT',
    hasAvatar: true,
    isOnline: true
  },
  { 
    id: '5', 
    name: 'Saket Kolluru', 
    username: 'saketk42', 
    status: 'NEW CONTACT',
    hasAvatar: true,
    isOnline: true
  },
  { 
    id: '6', 
    name: 'Sophia Yu', 
    username: 'sophiiyyu', 
    status: '2+ MUTUAL FRIENDS',
    hasAvatar: true,
    isOnline: true
  },
  { 
    id: '7', 
    name: 'Jacob Wojtowicz', 
    username: 'jacob.wojo', 
    status: '50+ MUTUAL FRIENDS',
    hasAvatar: true,
    isOnline: true
  },
  { 
    id: '8', 
    name: 'Hailey Mazur', 
    username: 'hailey.mazur', 
    status: '2+ MUTUAL FRIENDS',
    hasAvatar: true,
    isOnline: true
  },
  { 
    id: '9', 
    name: 'Arjun Melwani', 
    username: 'arjunmelwani', 
    status: '7+ MUTUAL FRIENDS',
    hasAvatar: true,
    isOnline: true
  }
];

const FriendsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newFriends, setNewFriends] = useState(2); // number shown in badge
  const navigation = useNavigation();

  const renderFriendItem = ({ item }: { item: typeof MOCK_FRIENDS[0] }) => (
    <View style={styles.friendItem}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: DEFAULT_AVATAR_BASE64 }} 
            style={styles.avatar}
          />
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="person-add" size={18} color="black" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-down" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Friends</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.text.tertiary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="scan-outline" size={24} color="white" style={styles.scanIcon} />
      </View>
      
      <TouchableOpacity style={styles.inviteContainer}>
        <View style={styles.inviteIconContainer}>
          <Ionicons name="people" size={24} color="black" />
        </View>
        <View style={styles.inviteTextContainer}>
          <Text style={styles.inviteTitle}>Invite your friends!</Text>
          <Text style={styles.inviteSubtitle}>Share your profile or invite contacts</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.text.tertiary} />
      </TouchableOpacity>
      
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Find Friends</Text>
          {newFriends > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{newFriends} New</Text>
            </View>
          )}
        </View>
        <TouchableOpacity>
          <Text style={styles.allContactsText}>All Contacts ›</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={MOCK_FRIENDS}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
  },
  moreButton: {
    padding: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.input,
    borderRadius: 30,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
  },
  scanIcon: {
    padding: spacing.xs,
  },
  inviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  inviteIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffeb3b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  inviteTextContainer: {
    flex: 1,
  },
  inviteTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
  },
  inviteSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
  },
  badge: {
    backgroundColor: '#ff5252',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginLeft: spacing.sm,
  },
  badgeText: {
    color: colors.text.primary,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
  },
  allContactsText: {
    color: colors.text.secondary,
    fontSize: typography.fontSizes.md,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: colors.background.dark,
  },
  nameContainer: {
    marginLeft: spacing.md,
  },
  friendName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
  },
  username: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  status: {
    fontSize: typography.fontSizes.xs,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeb3b',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.round,
    marginRight: spacing.sm,
  },
  addButtonText: {
    color: 'black',
    marginLeft: 4,
    fontWeight: typography.fontWeights.semibold,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FriendsScreen; 