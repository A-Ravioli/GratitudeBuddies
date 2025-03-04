import React, { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BulletPoint } from '../types';

interface PostInputProps {
  onSubmit: (bullets: BulletPoint[]) => void;
  hasPostedToday: boolean;
  isTestMode?: boolean;
}

const PostInput: React.FC<PostInputProps> = ({ onSubmit, hasPostedToday, isTestMode = false }) => {
  const [bullets, setBullets] = useState<BulletPoint[]>([
    { id: '1', text: '' },
  ]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you thinking?</Text>
      
      <ScrollView style={styles.bulletContainer}>
        {bullets.map((bullet, index) => (
          <View key={bullet.id} style={styles.bulletInputContainer}>
            <View style={styles.bulletRow}>
              <View style={styles.bulletPoint} />
              <TextInput
                style={styles.input}
                value={bullet.text}
                onChangeText={(text) => handleTextChange(text, index)}
                placeholder="Add a gratitude item... (type 'img' to add an image)"
                placeholderTextColor="#666"
                multiline
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeBullet(index)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            {bullet.imageUri && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: bullet.imageUri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addBullet}>
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      
      {hasPostedToday && isTestMode && (
        <Text style={styles.testModeText}>Test Mode: Posts won't be saved</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ccc',
    marginBottom: 16,
  },
  bulletContainer: {
    maxHeight: 300,
  },
  bulletInputContainer: {
    marginBottom: 16,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginTop: 12,
    marginRight: 10,
  },
  input: {
    flex: 1,
    minHeight: 40,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 20,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 8,
    marginLeft: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  addButton: {
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#555',
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 4,
    minWidth: 100,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  testModeText: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default PostInput; 