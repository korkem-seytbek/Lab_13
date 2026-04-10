import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'like' | 'follow' | 'comment';
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'New follower',
      message: 'Jane Smith started following you',
      time: '2m ago',
      isRead: false,
      type: 'follow',
    },
    {
      id: '2',
      title: 'New like',
      message: 'John Developer liked your post',
      time: '10m ago',
      isRead: false,
      type: 'like',
    },
    {
      id: '3',
      title: 'New comment',
      message: 'Alex commented on your photo',
      time: '1h ago',
      isRead: true,
      type: 'comment',
    },
    {
      id: '4',
      title: 'New like',
      message: 'Maria liked your post',
      time: '3h ago',
      isRead: true,
      type: 'like',
    },
  ]);

  const getIconName = (type: NotificationItem['type']) => {
    if (type === 'follow') return 'person-add-outline';
    if (type === 'comment') return 'chatbubble-outline';
    return 'heart-outline';
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[styles.card, !item.isRead && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={getIconName(item.type)} size={22} color="#0066cc" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {!item.isRead && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications yet</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  iconWrap: {
    width: 40,
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0066cc',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666',
    fontSize: 15,
  },
});