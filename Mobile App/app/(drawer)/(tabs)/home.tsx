import React, { useState, useEffect } from 'react';
import { Stack, useNavigation } from 'expo-router';



import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity, 
  Image,
  Platform,
  Dimensions 
} from 'react-native';
import { 
  Cloud, Sun, CloudRain, Wind, Droplet, 
  Cloud as CloudIcon, 
  Thermometer,
  Globe,
  Bell,
  Sun as SunIcon
} from 'lucide-react-native';

// Multilingual Content Dictionary
const CONTENT = {
  hi: {
    welcome: 'नमस्ते, राकेश!',
    alerts: 'महत्वपूर्ण सूचनाएं',
    weather: 'मौसम अपडेट',
    mspPrices: 'एमएसपी मूल्य',
    myCrops: 'मेरी फसलें',
    area: 'क्षेत्र',
    expectedYield: 'अनुमानित उपज',
    health: 'स्वास्थ्य',
    noWeatherData: 'मौसम डेटा प्राप्त नहीं हो सका।'
  },
  en: {
    welcome: 'Hello, Rakesh!',
    alerts: 'Important Alerts',
    weather: 'Weather Update',
    mspPrices: 'MSP Prices',
    myCrops: 'My Crops',
    area: 'Area',
    expectedYield: 'Expected Yield',
    health: 'Health',
    noWeatherData: 'Unable to fetch weather data.'
  }
};

// Mock Data
const MOCK_MSP_DATA = [
  { crop: { hi: 'गेहूँ ', en: 'Wheat' }, msp: '₹2275/क्विंटल', change: '+2.3%', icon: '🌾' },
  { crop: { hi: 'धान', en: 'Rice' }, msp: '₹1940/क्विंटल', change: '+1.5%', icon: '🍚' },
  { crop: { hi: 'कपास', en: 'Cotton' }, msp: '₹5450/क्विंटल', change: '+3.1%', icon: '🌿' },
];

const MOCK_FARMER_CROPS = [
  { name: { hi: 'गेहूँ', en: 'Wheat' }, area: { hi: '5 एकड़', en: '5 Acres' }, expectedYield: { hi: '75 क्विंटल', en: '75 Quintals' }, health: { hi: 'अच्छा', en: 'Good' }, icon: '🌾' },
  { name: { hi: 'कपास', en: 'Cotton' }, area: { hi: '3 एकड़', en: '3 Acres' }, expectedYield: { hi: '45 क्विंटल', en: '45 Quintals' }, health: { hi: 'अच्छा ', en: 'Good' }, icon: '🌿' },
];

const AGRICULTURAL_ALERTS = [
  { id: 1, title: { hi: 'मौसम चेतावनी', en: 'Weather Alert' }, description: { hi: 'अगले 3 दिनों में हल्की बारिश की संभावना', en: 'Light rainfall expected in the next 3 days' }, severity: 'low', icon: '🌧️' },
  { id: 2, title: { hi: 'फसल स्वास्थ्य', en: 'Crop Health' }, description: { hi: 'कपास में कीट नियंत्रण की आवश्यकता', en: 'Pest control needed for cotton' }, severity: 'medium', icon: '🐞' },
];

interface WeatherData {
  current: {
    condition: { text: string };
    humidity: number;
    wind_kph: number;
    temp_c: number;
  };
}

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'hi' | 'en'>('en');

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=fa540f9aedd24bfb974121903252203&q=New Delhi&days=3`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return <Sun color="#FFB300" size={48} />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain color="#0288D1" size={48} />;
    } else if (conditionLower.includes('cloud')) {
      return <CloudIcon color="#546E7A" size={48} />;
    } else {
      return <Cloud color="#546E7A" size={48} />;
    }
  };

  const Card = ({ children, style, title, icon }: { children: React.ReactNode, style?: any, title?: string, icon?: React.ReactNode }) => (
    <View style={[styles.cardContainer, style]}>
      {(title || icon) && (
        <View style={styles.cardHeader}>
          {icon}
          {title && <Text style={styles.cardTitle}>{title}</Text>}
        </View>
      )}
      {children}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Profile and Language Toggle */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image 
              source={require('@/assets/images/farmer.jpg')} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeText}>{CONTENT[language].welcome}</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                weekday: 'long', month: 'long', day: 'numeric'
              })}
            </Text>
          </View>
        </View>
        <View style={styles.languageToggle}>
          <TouchableOpacity 
            onPress={() => setLanguage('hi')}
            style={[styles.languageButton, language === 'hi' && styles.activeLanguageButton]}
          >
            <Text style={styles.languageButtonText}>हि</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setLanguage('en')}
            style={[styles.languageButton, language === 'en' && styles.activeLanguageButton]}
          >
            <Text style={styles.languageButtonText}>En</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weather Section - Prominent at Top */}
      <Card style={styles.weatherCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />
        ) : weatherData ? (
          <View style={styles.weatherContent}>
            <View style={styles.weatherHeader}>
              {getWeatherIcon(weatherData.current.condition.text)}
              <View>
                <Text style={styles.weatherTemp}>{weatherData.current.temp_c}°C</Text>
                <Text style={styles.weatherCondition}>{weatherData.current.condition.text}</Text>
              </View>
            </View>
            <Text style={styles.cityName}>New Delhi</Text>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetailItem}>
                <Droplet color="#0288D1" size={20} />
                <Text style={styles.weatherDetailText}>{weatherData.current.humidity}% Humidity</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Wind color="#546E7A" size={20} />
                <Text style={styles.weatherDetailText}>{weatherData.current.wind_kph} km/h Wind</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>{CONTENT[language].noWeatherData}</Text>
        )}
      </Card>

      {/* Alerts Section */}
      <Card title={CONTENT[language].alerts} icon={<Bell color="#EF5350" size={24} />}>
        {AGRICULTURAL_ALERTS.map((alert) => (
          <View key={alert.id} style={styles.alertItem}>
            <Text style={styles.alertIcon}>{alert.icon}</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{alert.title[language]}</Text>
              <Text style={styles.alertDescription}>{alert.description[language]}</Text>
            </View>
          </View>
        ))}
      </Card>

      {/* MSP Prices Section */}
      <Card title={CONTENT[language].mspPrices} icon={<Globe color="#4CAF50" size={24} />}>
        {MOCK_MSP_DATA.map((crop, index) => (
          <View key={index} style={styles.mspItem}>
            <View style={styles.cropIconAndName}>
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={styles.cropName}>{crop.crop[language]}</Text>
            </View>
            <View style={styles.mspDetails}>
              <Text style={styles.mspPrice}>{crop.msp}</Text>
              <Text style={[
                styles.mspChange, 
                crop.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
              ]}>
                {crop.change}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      {/* My Crops Section */}
      <Card title={CONTENT[language].myCrops} icon={<CloudIcon color="#8BC34A" size={24} />}>
        {MOCK_FARMER_CROPS.map((crop, index) => (
          <View key={index} style={styles.cropItem}>
            <View style={styles.cropIconAndName}>
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={styles.cropName}>{crop.name[language]}</Text>
            </View>
            <View style={styles.cropDetails}>
              <Text style={styles.cropDetailText}>{crop.area[language]}</Text>
              <Text style={styles.cropDetailText}>{crop.expectedYield[language]}</Text>
              <Text style={[styles.cropDetailText, styles.healthText]}>{crop.health[language]}</Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6E9', // Earthy background
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4CAF50',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
  },
  dateText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  languageToggle: {
    flexDirection: 'row',
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  activeLanguageButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  languageButtonText: {
    color: '#424242',
    fontWeight: '600',
    fontSize: 14,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    elevation: 6,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E8ECEF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 8,
  },
  weatherCard: {
    backgroundColor: 'white',
    padding: 20,
  },
  weatherContent: {
    alignItems: 'center',
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2E7D32',
  },
  weatherCondition: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'right',
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 12,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  weatherDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weatherDetailText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  noDataText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    padding: 20,
  },
  loading: {
    padding: 20,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F6E9',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  alertIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  mspItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  cropIconAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
  },
  mspDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mspPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#424242',
  },
  mspChange: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
  },
  positiveChange: {
    color: '#4CAF50',
  },
  negativeChange: {
    color: '#EF5350',
    backgroundColor: '#FFEBEE',
  },
  cropItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  cropDetails: {
    alignItems: 'flex-end',
  },
  cropDetailText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  healthText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
