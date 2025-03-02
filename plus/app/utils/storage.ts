import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post, User } from '../types';

// Storage keys
const POSTS_KEY = 'plus_posts';
const USER_KEY = 'plus_user';
const FRIENDS_KEY = 'plus_friends';
const HAS_POSTED_TODAY_KEY = 'plus_has_posted_today';

// Save posts to storage
export const savePosts = async (posts: Post[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

// Get posts from storage
export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsJson = await AsyncStorage.getItem(POSTS_KEY);
    return postsJson ? JSON.parse(postsJson) : [];
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
};

// Save current user
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

// Get current user
export const getUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Save friends list
export const saveFriends = async (friends: User[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  } catch (error) {
    console.error('Error saving friends:', error);
  }
};

// Get friends list
export const getFriends = async (): Promise<User[]> => {
  try {
    const friendsJson = await AsyncStorage.getItem(FRIENDS_KEY);
    return friendsJson ? JSON.parse(friendsJson) : [];
  } catch (error) {
    console.error('Error getting friends:', error);
    return [];
  }
};

// Save has posted today status
export const saveHasPostedToday = async (hasPosted: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(HAS_POSTED_TODAY_KEY, JSON.stringify(hasPosted));
  } catch (error) {
    console.error('Error saving posted status:', error);
  }
};

// Get has posted today status
export const getHasPostedToday = async (): Promise<boolean> => {
  try {
    const hasPostedJson = await AsyncStorage.getItem(HAS_POSTED_TODAY_KEY);
    return hasPostedJson ? JSON.parse(hasPostedJson) : false;
  } catch (error) {
    console.error('Error getting posted status:', error);
    return false;
  }
};

// Reset has posted today status (to be called at midnight)
export const resetHasPostedToday = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(HAS_POSTED_TODAY_KEY, JSON.stringify(false));
  } catch (error) {
    console.error('Error resetting posted status:', error);
  }
}; 