import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'user' | 'post' | 'hashtag';
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches] = useState<string[]>([
    'React Native',
    'TypeScript',
    'Mobile Development',
  ]);

  const mockResults: SearchResult[] = [
    { id: '1', title: 'reactnative', subtitle: '1.2K posts', type: 'hashtag' },
    { id: '2', title: 'John Developer', subtitle: '@johndev', type: 'user' },
    { id: '3', title: 'TypeScript Tips', subtitle: '150 posts', type: 'post' },
    { id: '4', title: 'mobileapps', subtitle: '890 posts', type: 'hashtag' },
    { id: '5', title: 'Jane Smith', subtitle: '@janesmith', type: 'user' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = mockResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const getIconName = (type: SearchResult['type']) => {
    if (type === 'user') return 'person-outline';
    if (type === 'post') return 'document-text-outline';
    return 'pricetag-outline';
  };

  const renderResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultIcon}>
        <Ionicons name={getIconName(item.type)} size={22} color="#0066cc" />
      </View>
      <View style={styles.resultText}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Search users, posts, hashtags..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {searchQuery.trim() ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderResult}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No results found</Text>
          }
        />
      ) : (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentItem}
              onPress={() => handleSearch(item)}
            >
              <Ionicons name="time-outline" size={18} color="#666" />
              <Text style={styles.recentText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  resultIcon: {
    width: 40,
    alignItems: 'center',
  },
  resultText: {
    flex: 1,
    marginLeft: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  resultSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  recentSection: {
    marginTop: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  recentText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666',
    fontSize: 15,
  },
});