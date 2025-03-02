import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate } from '../utils/dateUtils';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ccc',
  },
  date: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
  },
});

export default Header; 