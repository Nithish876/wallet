import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const SettingsScreen = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('Logged out'), style: 'destructive' },
    ]);
  };

  const SettingItem = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.settingItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color="#84cc16" />
      </View>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={{flex:1}}>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <ThemedText style={styles.header}>Settings</ThemedText>

      <Image
        source={{ uri: "https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-e778-61f7-8a0b-396fc264c529/raw?se=2025-04-25T15%3A52%3A44Z&sp=r&sv=2024-08-04&sr=b&scid=4b51e652-6e2b-5b69-95c1-53cc3d4e4cf7&skoid=72d71449-cf2f-4f10-a498-f160460104ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-25T00%3A05%3A05Z&ske=2025-04-26T00%3A05%3A05Z&sks=b&skv=2024-08-04&sig=v4QhW7xwfCE7tZQeBk%2BTb8ZPs24FylJEfSXwRjTlBUo%3D" }}
        className='w-32 h-32 rounded-full mx-auto my-4 '
      />
      <ThemedView style={styles.section}>
        <SettingItem icon="person-outline" label="Profile" onPress={() => { }} />
        <SettingItem icon="notifications-outline" label="Notifications" onPress={() => { }} />
        <SettingItem icon="lock-closed-outline" label="Security" onPress={() => { }} />
      </ThemedView>

      <ThemedView style={styles.section}>
        <SettingItem icon="information-circle-outline" label="About" onPress={() => { }} />
        <SettingItem icon="help-circle-outline" label="Help & Support" onPress={() => { }} />
      </ThemedView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
     
    </ScrollView>
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10 
    // backgroundColor: '#f9fafb', // gray-50
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    // backgroundColor:'red',
    paddingTop:10,
    marginBottom: 24,
    // color: '#111827', // gray-900
  },
  section: {
    // backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomColor: '#e5e7eb', // gray-200
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    // color: '#111827',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
