import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
interface Fertilizer {
  id: string;
  name: string;
  type: string;
  description: string;
  price: string;
  image: string;
  available: boolean;
}

const FertilizerPage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [fertilizers, setFertilizers] = useState([
    {
      id: '1',
      name: 'Urea',
      type: 'Chemical Fertilizer',
      description: 'High-nitrogen fertilizer, ideal for crops like rice and wheat.',
      price: '₹250 / 50kg',
      image: 'https://gogarden.co.in/cdn/shop/files/71yg6hRnpTL._SL1200_fac2b8e7-208b-482d-9493-07d03daaff6f.jpg?v=1741858085', // Replace with actual image URL
      available: true,
    },
    {
      id: '2',
      name: 'Vermicompost',
      type: 'Organic Manure',
      description: 'Rich in nutrients, improves soil health, suitable for all crops.',
      price: '₹500 / 50kg',
      image: 'https://utkarshagro.com/cdn/shop/files/VermicompostFront.jpg?v=1731144379',
      available: true,
    },
    {
      id: '3',
      name: 'Nano Urea (New)',
      type: 'Innovative Fertilizer',
      description: 'Liquid fertilizer, reduces usage by 50%, eco-friendly.',
      price: '₹240 / 500ml',
      image: 'https://hellokart.com/cdn/shop/files/nanourea.jpg?v=1687357332',
      available: true,
    },
    {
      id: '4',
      name: 'DAP',
      type: 'Chemical Fertilizer',
      description: 'Phosphorus-rich, good for root development.',
      price: '₹1350 / 50kg',
      image: 'https://inputs.kalgudi.com/data/p_images/1676369609351.png',
      available: false,
    },
  ]);

  // Render each fertilizer item
  const renderFertilizerItem = ({ item }: { item: Fertilizer }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleBuy(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity
          style={[styles.buyButton, !item.available && styles.disabledButton]}
          disabled={!item.available}
        >
          <Text style={styles.buyButtonText}>
            {item.available ? 'Buy Now' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Handle buy action (you can integrate payment gateway or cart logic here)
  const handleBuy = (item: Fertilizer) => {
    if (item.available) {
      alert(`Proceeding to buy ${item.name} for ${item.price}`);
      // Add logic for payment or cart
    }
  };

  return (
    <View style={styles.container}>
    <Stack.Screen options={{ title: 'Buy Fertilizers' }} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Fertilizers & Manures</Text>
        <Ionicons name="cart-outline" size={28} color="#fff" />
      </View>

      {/* Info Banner */}
      <ScrollView horizontal style={styles.banner}>
        <Text style={styles.bannerText}>
          Discover new fertilizers like Nano Urea - Save costs, boost yield!
        </Text>
      </ScrollView>

      {/* Fertilizer List */}
      <FlatList
        data={fertilizers}
        renderItem={renderFertilizerItem}
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
    marginTop: 35,
    padding: 15,
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
    padding: 5,
    margin: 10,
    marginVertical: 10,
  },
  bannerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    margin: 3,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  type: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d81b60',
  },
  buyButton: {
    backgroundColor: '#2e7d32',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FertilizerPage;