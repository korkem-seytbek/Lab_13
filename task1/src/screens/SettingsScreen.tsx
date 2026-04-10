import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

interface SettingRowProps {
  label: string;
  description?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
  showArrow?: boolean;
}

function SettingRow({
  label,
  description,
  value,
  onValueChange,
  onPress,
  showArrow = false,
}: SettingRowProps) {
  const content = (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>

      {onValueChange !== undefined && value !== undefined && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#e0e0e0', true: '#0066cc' }}
          thumbColor={value ? '#ffffff' : '#f4f4f4'}
        />
      )}

      {showArrow && <Text style={styles.arrow}>{'\u203A'}</Text>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Logged out successfully');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <SettingRow
              label="Edit Profile"
              onPress={() => navigation.navigate('Profile', { userId: '123' })}
              showArrow
            />
            <SettingRow
              label="Change Password"
              onPress={() => Alert.alert('Change Password')}
              showArrow
            />
            <SettingRow
              label="Privacy"
              onPress={() => Alert.alert('Privacy Settings')}
              showArrow
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingRow
              label="Push Notifications"
              description="Receive notifications about activity"
              value={notifications}
              onValueChange={setNotifications}
            />
            <SettingRow
              label="Dark Mode"
              description="Use dark theme"
              value={darkMode}
              onValueChange={setDarkMode}
            />
            <SettingRow
              label="Auto-play Videos"
              description="Play videos automatically"
              value={autoPlay}
              onValueChange={setAutoPlay}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.sectionContent}>
            <SettingRow
              label="Analytics"
              description="Help improve the app"
              value={analytics}
              onValueChange={setAnalytics}
            />
            <SettingRow
              label="Clear Cache"
              onPress={() => Alert.alert('Cache cleared')}
              showArrow
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingRow
              label="Help Center"
              onPress={() => Alert.alert('Help Center')}
              showArrow
            />
            <SettingRow
              label="Contact Us"
              onPress={() => Alert.alert('Contact Us')}
              showArrow
            />
            <SettingRow
              label="About"
              onPress={() => Alert.alert('Version 1.0.0')}
              showArrow
            />
          </View>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
  logoutSection: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});