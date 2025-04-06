import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';

import { useEffect } from 'react';

const Profile = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileHeader}>
          <Image 
            source={require('../../assets/images/farmer.jpg')} 
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.nameText}>Rajesh Kumar</Text>
            <Text style={styles.farmLocationText}>Haryana, India</Text>
          </View>
        </View>
      </View>

      <View style={styles.farmDetailsContainer}>
        <View style={styles.detailRow}>
          <Feather name="map-pin" size={24} color="#4CAF50" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Farm Location</Text>
            <Text style={styles.detailValue}>Haryana</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Feather name="type" size={24} color="#4CAF50" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Crop Type</Text>
            <Text style={styles.detailValue}>Wheat, Soybean</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Feather name="layers" size={24} color="#4CAF50" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Land Area</Text>
            <Text style={styles.detailValue}>4.5 Hectares</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Feather name="phone" size={24} color="#4CAF50" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Contact Number</Text>
            <Text style={styles.detailValue}>+91 9876543210</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Feather name="award" size={24} color="#4CAF50" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Farming Experience</Text>
            <Text style={styles.detailValue}>15 Years</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop:35,
    padding:15
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  nameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  farmLocationText: {
    color: 'white',
    fontSize: 16,
  },
  farmDetailsContainer: {
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailTextContainer: {
    marginLeft: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Profile;