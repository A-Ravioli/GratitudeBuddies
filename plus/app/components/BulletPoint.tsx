import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { BulletPoint as BulletPointType } from '../types';
import { colors, typography, spacing, radius } from '../utils/theme';

interface BulletPointProps {
  bullet: BulletPointType;
  isEditing?: boolean;
  isLast?: boolean;
}

const BulletPoint: React.FC<BulletPointProps> = ({ bullet, isEditing = false, isLast = false }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const toggleExpanded = () => {
    if (bullet.imageUri) {
      setExpanded(!expanded);
    }
  };

  return (
    <View style={styles.bulletContainer}>
      <View style={styles.bulletLineContainer}>
        <View style={styles.bulletPoint} />
        {!isLast && <View style={styles.verticalLine} />}
      </View>
      <Pressable 
        style={styles.contentContainer} 
        onPress={toggleExpanded}
        disabled={!bullet.imageUri}
      >
        <Text style={styles.text}>{bullet.text}</Text>
        {bullet.imageUri && (
          <Image 
            source={{ uri: bullet.imageUri }} 
            style={[
              styles.image, 
              expanded && styles.expandedImage
            ]} 
            resizeMode="cover"
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  bulletLineContainer: {
    alignItems: 'center',
    marginRight: spacing.sm,
    height: '100%',
  },
  bulletPoint: {
    width: 12,
    height: 12,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    marginTop: 6,
  },
  verticalLine: {
    width: 2,
    height: '100%',
    backgroundColor: colors.border.medium,
    position: 'absolute',
    top: 18,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.md,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: radius.md,
    marginTop: spacing.sm,
  },
  expandedImage: {
    height: 250,
  },
});

export default BulletPoint; 