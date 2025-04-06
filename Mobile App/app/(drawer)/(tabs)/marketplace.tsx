import React, { useState } from 'react';
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Dimensions,
  Platform 
} from 'react-native';
import { Link } from 'expo-router';
import { 
  FontAwesome5, 
  MaterialIcons 
} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Multilingual Content Dictionary
const CONTENT = {
  hi: {
    title: 'किसान बाज़ार',
    sellProduction: 'फसल बेचें',
    buyMachinery: 'मशीन खरीदें',
    fertilizer: 'खाद खरीदें',
    storage: 'भंडारण किराये पर लें',
  },
  en: {
    title: "Farmer's Market",
    sellProduction: 'Sell Crops',
    buyMachinery: 'Buy Machines',
    fertilizer: 'Buy Fertilizer',
    storage: 'Rent Storage',
  }
};

const Marketplace = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [language, setLanguage] = useState<'hi' | 'en'>('en');

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'en' ? 'hi' : 'en');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Language Toggle */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {CONTENT[language].title}
        </Text>
        <TouchableOpacity 
          onPress={toggleLanguage}
          style={styles.languageButton}
        >
          <Text style={styles.languageButtonText}>
            {language === 'en' ? 'हिंदी' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../sellproduct" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <FontAwesome5 
                name="shopping-cart" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].sellProduction}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../butmachine" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <MaterialIcons 
                name="agriculture" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].buyMachinery}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../fertilizers" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <MaterialIcons 
                name="spa" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].fertilizer}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../storage" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <MaterialIcons 
                name="warehouse" 
                size={30} 
                color="#fff" 
              />
              <Text style={styles.buttonText}>
                {CONTENT[language].storage}
              </Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: '#2ecc71',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  languageButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  languageButtonText: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  marketButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    marginVertical: 15,
    paddingVertical: 20,
    elevation: 4,
  },
  linkStyle: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});

export default Marketplace;