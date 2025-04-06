import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import { Stack, useNavigation } from 'expo-router';

import { useEffect } from 'react';
interface StorageHouse {
  id: string;
  owner: string;
  location: string;
  capacity: string;
  type: string;
  rent: string;
  contact: string;
  image: string;
  available: boolean;
}

const StorageHousesPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [storageHouses, setStorageHouses] = useState<StorageHouse[]>([
    {
      id: '1',
      owner: 'Ramesh Patel',
      location: 'Hisaar, Haryana',
      capacity: '5000 Quintals',
      type: 'Cold Storage',
      rent: '₹0.50 / Quintal / Day',
      contact: '+91 98765 43210',
      image: 'data:image/jpeg;base64,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', // Replace with actual image URL
      available: true,
    },
    {
      id: '2',
      owner: 'Suresh Kumar',
      location: 'Rewari, Haryana',
      capacity: '3000 Quintals',
      type: 'Dry Storage',
      rent: '₹0.30 / Quintal / Day',
      contact: '+91 87654 32109',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-CS_QNcnSrzYdYVRG8ei2R2hzDIMnsS_WQ&s',
      available: true,
    },
    {
      id: '3',
      owner: 'Priya Sharma',
      location: 'Ludhiana, Punjab',
      capacity: '7000 Quintals',
      type: 'Cold Storage',
      rent: '₹0.60 / Quintal / Day',
      contact: '+91 76543 21098',
      image: 'https://media.istockphoto.com/id/1351105286/photo/stock-of-coffee-in-a-warehouse.jpg?s=612x612&w=0&k=20&c=U8qRUECoXBHGAgYnaRbiPXpTNQXtyiC7kbxHO1UruBs=',
      available: false,
    },
    {
      id: '4',
      owner: 'Amit Singh',
      location: 'Anand Vihar, Delhi NCR',
      capacity: '4000 Quintals',
      type: 'Dry Storage',
      rent: '₹0.25 / Quintal / Day',
      contact: '+91 65432 10987',
      image: 'https://media.istockphoto.com/id/1309407335/photo/storage-room-of-a-restaurant-or-a-cafe-with-nonperishable-food-staples-preserved-foods.jpg?s=612x612&w=0&k=20&c=XumBDJ-GEKfiQjxQ4G538-ZWc8qwA1QsWt5g0q3I2Lk=',
      available: true,
    },
  ]);

  
  const renderStorageItem = ({ item }: { item: StorageHouse }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleContact(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.owner}>{item.owner}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.detailRow}>
          <Ionicons name="cube-outline" size={16} color="#666" />
          <Text style={styles.detailText}>Capacity: {item.capacity}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="storefront-outline" size={16} color="#666" />
          <Text style={styles.detailText}>Type: {item.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>Rent: {item.rent}</Text>
        </View>
        <TouchableOpacity
          style={[styles.contactButton, !item.available && styles.disabledButton]}
          disabled={!item.available}
        >
          <Text style={styles.contactButtonText}>
            {item.available ? 'Contact Now' : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Handle contact action (e.g., open phone dialer or WhatsApp)
  const handleContact = (item: StorageHouse) => {
    if (item.available) {
      alert(`Contact ${item.owner} at ${item.contact}`);
      // Integrate linking to phone or WhatsApp here (e.g., Linking.openURL(`tel:${item.contact}`))
    }
  };

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: 'Rent Storage' }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Storage Houses</Text>
        <Ionicons name="search-outline" size={28} color="#fff" />
      </View>

      {/* Info Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Find affordable storage near you for your produce!
        </Text>
      </View>

      {/* Storage Houses List */}
      <FlatList
        data={storageHouses}
        renderItem={renderStorageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2e7d32', // Green theme for agriculture
    padding: 15,
    marginTop:35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  banner: {
    backgroundColor: '#ffca28',
    padding: 10,
    marginVertical: 10,
  },
  bannerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 120,
    height: 150,
    padding: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  owner: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  contactButton: {
    backgroundColor: '#2e7d32',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StorageHousesPage;