import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BulletPoint as BulletPointType } from '../types';

interface BulletPointProps {
  bullet: BulletPointType;
  isEditing?: boolean;
}

const BulletPoint: React.FC<BulletPointProps> = ({ bullet, isEditing = false }) => {
  return (
    <View style={styles.bulletContainer}>
      <View style={styles.bulletPoint} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{bullet.text}</Text>
        {bullet.imageUri && (
          <Image source={{ uri: bullet.imageUri }} style={styles.image} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginTop: 6,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default BulletPoint; 