import { useState, useEffect } from 'react';
import { AppState, Post, User, BulletPoint } from '../types';
import * as Storage from '../utils/storage';
import { getTodayMidnight } from '../utils/dateUtils';

// Initial mock data for testing
const mockUser: User = {
  id: '1',
  username: 'user1',
  name: 'Current User',
};

const mockFriends: User[] = [
  {
    id: '2',
    username: 'friend1',
    name: 'Friend One',
  },
  {
    id: '3',
    username: 'friend2',
    name: 'Friend Two',
  },
];

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    username: 'friend1',
    date: 'feb 24th',
    bullets: [
      { id: '1', text: 'i really need to be more consistent with this for this to work, finishing the app will probably help' },
      { id: '2', text: 'had great time seeing addison again' },
      { id: '3', text: 'he gave me delicious orange soda that tasted like childhood' },
      { id: '4', text: 'burke was nicer to me today' },
      { id: '5', text: 'sleep schedule is starting to self adjust' },
    ],
    createdAt: new Date().getTime() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
  },
  {
    id: '2',
    userId: '3',
    username: 'friend2',
    date: 'feb 25th',
    bullets: [
      { id: '1', text: 'mustered the confidence to text selena' },
      { id: '2', text: 'brushing my teeth hurt but in the oh wait like new tootbrush is good kinda way so it\'s working' },
      { id: '3', text: 'minh and i laughed sm all class that the teacher called us out for it' },
    ],
    createdAt: new Date().getTime() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
  },
];

// Custom hook for managing app state
export const useStore = () => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    posts: [],
    friends: [],
    hasPostedToday: false,
  });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      // Get data from storage or use mock data
      const user = await Storage.getUser() || mockUser;
      const friends = await Storage.getFriends();
      const posts = await Storage.getPosts();
      const hasPostedToday = await Storage.getHasPostedToday();

      // If no data in storage, use mock data
      setState({
        currentUser: user,
        posts: posts.length > 0 ? posts : mockPosts,
        friends: friends.length > 0 ? friends : mockFriends,
        hasPostedToday,
      });
    };

    loadData();
  }, []);

  // Add a new post
  const addPost = async (bullets: BulletPoint[]) => {
    if (!state.currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: state.currentUser.id,
      username: state.currentUser.username,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      bullets,
      createdAt: new Date().getTime(),
    };

    const updatedPosts = [newPost, ...state.posts];
    
    // Update state
    setState({
      ...state,
      posts: updatedPosts,
      hasPostedToday: true,
    });

    // Save to storage
    await Storage.savePosts(updatedPosts);
    await Storage.saveHasPostedToday(true);
  };

  // Reset hasPostedToday flag at midnight
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      
      const timeUntilMidnight = midnight.getTime() - now.getTime();
      
      // Set timeout to reset hasPostedToday at midnight
      setTimeout(async () => {
        setState(prevState => ({
          ...prevState,
          hasPostedToday: false,
        }));
        
        await Storage.resetHasPostedToday();
        checkDate(); // Set up the next day's timeout
      }, timeUntilMidnight);
    };
    
    checkDate();
  }, []);

  return {
    ...state,
    addPost,
  };
}; 