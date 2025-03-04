import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useStore } from '../hooks/useStore';
import { User } from '../types';

const ProfileScreen: React.FC = () => {
  const { currentUser, updateUser, friends, addFriend, removeFriend } = useStore();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [name, setName] = useState(currentUser?.name || '');
  const [friendUsername, setFriendUsername] = useState('');

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
  };

  const handleAddFriend = () => {
    if (!friendUsername.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    addFriend(friendUsername);
    setFriendUsername('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Friends</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={friendUsername}
            onChangeText={setFriendUsername}
            placeholder="Enter friend's username"
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
            <Text style={styles.buttonText}>Add Friend</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.friendsList}>
          {friends.map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <View style={styles.friendInfo}>
                <View style={styles.avatar}>
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
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  friendsList: {
    marginTop: 16,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  friendName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  friendUsername: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProfileScreen; 