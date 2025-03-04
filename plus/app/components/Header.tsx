import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../utils/theme';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Friends: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.dark} />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="add-circle" size={28} color={colors.primary} />
          <Text style={styles.title}>plus</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Friends')}
            activeOpacity={0.7}
          >
            <Ionicons name="people-outline" size={22} color={colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
          >
            <Ionicons name="person-outline" size={22} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? spacing.lg : spacing.md,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.dark,
    ...shadows.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginLeft: spacing.sm,
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: spacing.md,
    padding: spacing.xs,
    borderRadius: 8,
    backgroundColor: colors.background.card,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header; 