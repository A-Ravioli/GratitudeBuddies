import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Keyboard,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BulletPoint } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '../utils/theme';

interface PostInputProps {
  onSubmit: (bullets: BulletPoint[]) => void;
  hasPostedToday: boolean;
  isTestMode?: boolean;
}

const PostInput: React.FC<PostInputProps> = ({ onSubmit, hasPostedToday, isTestMode = false }) => {
  const [bullets, setBullets] = useState<BulletPoint[]>([
    { id: '1', text: '' },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleTextChange = (text: string, index: number) => {
    // Check if text contains an image trigger (e.g., typing "img" or pressing a special key)
    if (text.endsWith(' img ')) {
      pickImage(index);
      // Remove the "img" trigger from the text
      text = text.slice(0, -4);
    }
    
    const updatedBullets = [...bullets];
    updatedBullets[index] = { ...updatedBullets[index], text };
    setBullets(updatedBullets);
  };

  const addBullet = () => {
    const newBullet: BulletPoint = {
      id: Date.now().toString(),
      text: '',
    };
    setBullets([...bullets, newBullet]);
    
    // Scroll to the bottom after adding a new bullet
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const removeBullet = (index: number) => {
    if (bullets.length === 1) {
      // Don't remove the last bullet, just clear it
      setBullets([{ id: Date.now().toString(), text: '' }]);
      return;
    }

    const updatedBullets = bullets.filter((_, i) => i !== index);
    setBullets(updatedBullets);
  };

  const pickImage = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library to add images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const updatedBullets = [...bullets];
      updatedBullets[index] = {
        ...updatedBullets[index],
        imageUri: result.assets[0].uri,
      };
      setBullets(updatedBullets);
    }
  };

  const removeImage = (index: number) => {
    const updatedBullets = [...bullets];
    const { imageUri, ...rest } = updatedBullets[index];
    updatedBullets[index] = rest;
    setBullets(updatedBullets);
  };

  const handleSubmit = () => {
    // Filter out empty bullets
    const validBullets = bullets.filter(bullet => bullet.text.trim() !== '');
    
    if (validBullets.length === 0) {
      Alert.alert('Empty Post', 'Please add at least one gratitude item before posting.');
      return;
    }
    
    onSubmit(validBullets);
    
    // Reset the form
    setBullets([{ id: Date.now().toString(), text: '' }]);
    Keyboard.dismiss();
  };

  if (hasPostedToday && !isTestMode) {
    return null; // Don't show anything if already posted
  }

  // Calculate the button position based on keyboard state
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you grateful for today?</Text>
      
      <ScrollView 
        style={styles.bulletContainer}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        {bullets.map((bullet, index) => (
          <View key={bullet.id} style={styles.bulletInputContainer}>
            <View style={styles.bulletRow}>
              <View style={styles.bulletPoint} />
              <TextInput
                style={styles.input}
                value={bullet.text}
                onChangeText={(text) => handleTextChange(text, index)}
                placeholder="Add a gratitude item... (type 'img' to add an image)"
                placeholderTextColor={colors.text.disabled}
                multiline
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeBullet(index)}
                activeOpacity={0.7}
              >
                <Ionicons name="close-circle" size={20} color={colors.accent.danger} />
              </TouchableOpacity>
            </View>
            
            {bullet.imageUri && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: bullet.imageUri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close-circle" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addBullet}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color={colors.primary} />
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.postButton} 
            onPress={handleSubmit}
            activeOpacity={0.7}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {hasPostedToday && isTestMode && (
        <Text style={styles.testModeText}>Test Mode: Posts won't be saved</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: radius.md,
    margin: spacing.md,
    ...shadows.sm,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  bulletContainer: {
    maxHeight: 300,
    marginBottom: spacing.md,
  },
  bulletInputContainer: {
    marginBottom: spacing.md,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 12,
    height: 12,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    marginTop: 12,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 40,
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
    paddingVertical: spacing.sm,
  },
  removeButton: {
    padding: spacing.sm,
    marginLeft: spacing.xs,
  },
  imageContainer: {
    marginTop: spacing.sm,
    marginLeft: spacing.lg,
    position: 'relative',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: radius.md,
  },
  removeImageButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: radius.round,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingBottom: spacing.md,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.medium,
    backgroundColor: colors.background.input,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: typography.fontSizes.md,
    marginLeft: spacing.xs,
    fontWeight: typography.fontWeights.medium,
  },
  postButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    minWidth: 120,
    alignItems: 'center',
    ...shadows.sm,
  },
  postButtonText: {
    color: colors.text.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
  },
  testModeText: {
    color: colors.accent.danger,
    fontSize: typography.fontSizes.sm,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});

export default PostInput; 