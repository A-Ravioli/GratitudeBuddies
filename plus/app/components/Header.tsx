import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Ionicons name="add-circle" size={24} color="#4CAF50" />
        <Text style={styles.title}>plus</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ccc',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },
});

export default Header; 