import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Linking 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const FARM_DATA = {
  soilMoisture: 65,
  temperature: 28,
  irrigationTimeLeft: 2.5,
  lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }),
};

const CROP_TYPES = [
    'फसल चुनें (Select Crop)',
    'टमाटर (Tomato)',
    'प्याज (Onion)',
    'गाजर (Carrot)',
    'भिंडी (Okra)',
    'शाम (Spinach)',
    'खान (Cabbage)',
    'गोभी (Lettuce)',
    'मटर (Peas)',
    'फूलगोभी (Cauliflower)',
    'कद्दू (Pumpkin)',
    'ककड़ी (Cucumber)',
    'बैंगन (Brinjal)',
    'मूली (Radish)',
    'धनिया (Coriander)',
    'पुदीना (Mint)',
    'dal (Lentil)',
    'चना (Chickpea)',
    'चावल (Rice)',
    'आम (Mango)',
    'गाय (Guava)',
    'आलू (Potato)',
    'मक्का (Corn)',
    'गेहूँ (Wheat)',
    'चावल (Rice)',
    'सोयाबीन (Soybean)',
    'खीरा (Cucumber)',
    'मिर्च (Pepper)',
    'पत्ता गोभी (Lettuce)',
    'पत्ता गोभी (Cabbage)',
    'बैंगन (Eggplant)',
    'अन्य (Other)',
];

const EXPERTS_DATA = [
  {
    name_en: 'Dr. Anil Sharma',
    name_hi: 'डॉ. अनिल शर्मा',
    specialization_en: 'Plant Pathology',
    specialization_hi: 'पौध रोग विज्ञान',
    availability_en: 'Mon-Fri, 9 AM - 5 PM',
    availability_hi: 'सोम-शुक्र, सुबह 9 बजे - शाम 5 बजे',
    tollFreeNumber: '1800-123-4567',
  },
  {
    name_en: 'Dr. Priya Patel',
    name_hi: 'डॉ. प्रिया पटेल',
    specialization_en: 'Crop Nutrition',
    specialization_hi: 'फसल पोषण',
    availability_en: 'Tue-Sat, 10 AM - 6 PM',
    availability_hi: 'मंगल-शनि, सुबह 10 बजे - शाम 6 बजे',
    tollFreeNumber: '1800-234-5678',
  },
  {
    name_en: 'Dr. Rajesh Kumar',
    name_hi: 'डॉ. राजेश कुमार',
    specialization_en: 'Pest Management',
    specialization_hi: 'कीट प्रबंधन',
    availability_en: 'Mon-Thu, 8 AM - 4 PM',
    availability_hi: 'सोम-गुरु, सुबह 8 बजे - शाम 4 बजे',
    tollFreeNumber: '1800-345-6789',
  },
];

const parseAnalysisResponse = (text: string): string[] => {
  // Split the text into lines and clean up
  return text
    .replace(/\*\*\*/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\n\s*\n/g, '\n')
    .replace(/^(\d+\.\s)/gm, '• ')
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0); // Return an array of lines
};

const PlantDiseaseDetectionScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string[] | null>(null); // Changed to string array
  const [isLoading, setIsLoading] = useState(false);
  const [cropType, setCropType] = useState(CROP_TYPES[0]);
  const [diseaseSeverity, setDiseaseSeverity] = useState<string | null>(null);
  const [farmData, setFarmData] = useState(FARM_DATA);
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');

  const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        language === 'hi' ? 'अनुमति' : 'Permissions',
        language === 'hi' ? 'फोटो लेने के लिए कैमरा अनुमति आवश्यक है' : 'Camera permissions are required to take photos'
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    if (cropType === CROP_TYPES[0]) {
      Alert.alert(
        language === 'hi' ? 'चयन आवश्यक' : 'Selection Required',
        language === 'hi' ? 'फोटो लेने से पहले फसल का प्रकार चुनें' : 'Please select a crop type before taking a photo'
      );
      return;
    }

    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await analyzeImage(result.assets[0].uri);
    }
  };

  const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => reader.result && typeof reader.result === 'string' 
        ? resolve(reader.result.split(',')[1]) 
        : reject(new Error('Failed to read file'));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const determineSeverity = (analysisText: string) => {
    const lowSeverityKeywords = ['mild', 'early stage', 'minimal', 'slight'];
    const highSeverityKeywords = ['severe', 'critical', 'advanced', 'extensive', 'urgent'];
    const mediumSeverityKeywords = ['moderate', 'developing', 'spreading'];

    const lowSeverityMatch = lowSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));
    const highSeverityMatch = highSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));
    const mediumSeverityMatch = mediumSeverityKeywords.some(keyword => analysisText.toLowerCase().includes(keyword));

    if (highSeverityMatch) return 'High';
    if (mediumSeverityMatch) return 'Medium';
    if (lowSeverityMatch) return 'Low';
    return 'Unknown';
  };

  const analyzeImage = async (imageUri: string) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setDiseaseSeverity(null);

    try {
      const base64Image = await convertImageToBase64(imageUri);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = language === 'hi'
        ? `इस ${cropType} पौधे की छवि का विश्लेषण करें। निम्नलिखित विशिष्ट विवरणों के साथ व्यापक बीमारी विश्लेषण प्रदान करें:
          1. पौधे की प्रजाति की पुष्टि करें (${cropType})
          2. विशिष्ट बीमारी के लक्षणों की पहचान करें
          3. संभावित बीमारी का प्रकार
          4. बीमारी की गंभीरता
          5. तत्काल उपचार के कदमों की सिफारिश करें
          6. दीर्घकालिक प्रबंधन रणनीतियाँ
          किसान को उचित कार्रवाई करने में मदद करने के लिए जितना संभव हो उतना विशिष्ट रहें। छोटे और सरल वाक्यों में उत्तर दें।`
        : `Analyze this ${cropType} plant image. Provide a comprehensive disease analysis with these specific details:
          1. Confirm the plant species (${cropType})
          2. Identify specific disease symptoms
          3. Potential disease type
          4. Severity of the disease
          5. Recommended immediate treatment steps
          6. Long-term management strategies
          Be as specific as possible to help the farmer take appropriate action. Answer in short and simple sentences.`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
      ]);

      const rawAnalysisText = result.response.text();
      const parsedAnalysisText = parseAnalysisResponse(rawAnalysisText); // Now returns an array
      const severity = determineSeverity(rawAnalysisText);

      setAnalysisResult(parsedAnalysisText);
      setDiseaseSeverity(severity);
    } catch (error) {
      console.error('Error analyzing image:', error);
      Alert.alert(
        language === 'hi' ? 'त्रुटि' : 'Error',
        language === 'hi' ? 'छवि का विश्लेषण करने में विफल' : 'Failed to analyze the image'
      );
      setAnalysisResult([language === 'hi' 
        ? 'विश्लेषण विफल। कृपया अपना इंटरनेट कनेक्शन और API कुंजी जांचें।' 
        : 'Analysis failed. Please check your internet connection and API key.']);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'High': return '#FF4136';
      case 'Medium': return '#FF851B';
      case 'Low': return '#2ECC40';
      default: return '#AAAAAA';
    }
  };

  const updateFarmData = () => {
    setFarmData({
      soilMoisture: Math.max(30, Math.min(90, FARM_DATA.soilMoisture + (Math.random() * 10 - 5))),
      temperature: Math.max(20, Math.min(40, FARM_DATA.temperature + (Math.random() * 2 - 1))),
      irrigationTimeLeft: Math.max(0, FARM_DATA.irrigationTimeLeft - 0.1),
      lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }),
    });
  };

  useEffect(() => {
    const intervalId = setInterval(updateFarmData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  const handleBookFieldVisit = (expertName: string) => {
    Alert.alert(
      language === 'hi' ? 'फील्ड विजिट बुक करें' : 'Book a Field Visit',
      language === 'hi' 
        ? `${expertName} के साथ फील्ड विजिट बुक करने के लिए कृपया उपलब्ध समय की पुष्टि करें।` 
        : `Please confirm availability to book a field visit with ${expertName}.`,
      [
        { text: 'हाँ', onPress: () => Alert.alert('सफल', 'फील्ड विजिट बुक की गई!') },
        { text: 'नहीं', style: 'cancel' },
      ]
    );
  };

  const handleCallExpert = (tollFreeNumber: string) => {
    const phoneNumber = `tel:${tollFreeNumber.replace(/-/g, '')}`;
    Linking.openURL(phoneNumber).catch(err => {
      Alert.alert(
        language === 'hi' ? 'त्रुटि' : 'Error',
        language === 'hi' ? 'कॉल करने में असमर्थ। कृपया मैन्युअल रूप से डायल करें।' : 'Unable to make call. Please dial manually.'
      );
    });
  };

  const renderFarmDataCard = () => (
    <View style={styles.farmDataContainer}>
      <Text style={styles.cardTitle}>
        {language === 'hi' ? '🚜 फार्म की स्थिति' : '🚜 Farm Status'}
      </Text>
      <View style={styles.farmDataGrid}>
        <View style={styles.farmDataItem}>
          <MaterialIcons name="opacity" size={24} color="#2196F3" />
          <Text style={styles.farmDataLabel}>
            {language === 'hi' ? 'मिट्टी की नमी' : 'Soil Moisture'}
          </Text>
          <Text style={styles.farmDataValue}>{farmData.soilMoisture.toFixed(0)}%</Text>
        </View>
        <View style={styles.farmDataItem}>
          <MaterialIcons name="thermostat" size={24} color="#FF5722" />
          <Text style={styles.farmDataLabel}>
            {language === 'hi' ? 'तापमान' : 'Temperature'}
          </Text>
          <Text style={styles.farmDataValue}>{farmData.temperature.toFixed(1)}°C</Text>
        </View>
        <View style={styles.farmDataItem}>
          <MaterialIcons name="water-drop" size={24} color="#03A9F4" />
          <Text style={styles.farmDataLabel}>
            {language === 'hi' ? 'सिंचाई' : 'Irrigation'}
          </Text>
          <Text style={styles.farmDataValue}>{farmData.irrigationTimeLeft.toFixed(1)} {language === 'hi' ? 'घंटे' : 'hours'}</Text>
        </View>
      </View>
      <Text style={styles.lastUpdatedText}>
        {language === 'hi' ? `अंतिम अपडेट: ${farmData.lastUpdated}` : `Last Updated: ${farmData.lastUpdated}`}
      </Text>
    </View>
  );

  const renderExpertSection = () => (
    <View style={styles.expertContainer}>
      <Text style={styles.sectionTitle}>
        {language === 'hi' ? 'विशेषज्ञों से संपर्क करें' : 'Contact Experts'}
      </Text>
      {EXPERTS_DATA.map((expert, index) => (
        <View key={index} style={styles.expertCard}>
          <View style={styles.expertDetails}>
            <Text style={styles.expertDetailText}>
              {language === 'hi' ? `नाम: ${expert.name_hi}` : `Name: ${expert.name_en}`}
            </Text>
            <Text style={styles.expertDetailText}>
              {language === 'hi' ? `विशेषज्ञता: ${expert.specialization_hi}` : `Specialization: ${expert.specialization_en}`}
            </Text>
            <Text style={styles.expertDetailText}>
              {language === 'hi' ? `उपलब्धता: ${expert.availability_hi}` : `Availability: ${expert.availability_en}`}
            </Text>
            <Text style={styles.expertDetailText}>
              {language === 'hi' ? `टोल-फ्री नंबर: ${expert.tollFreeNumber}` : `Toll-Free Number: ${expert.tollFreeNumber}`}
            </Text>
          </View>
          <View style={styles.expertButtonContainer}>
            <TouchableOpacity 
              style={styles.fieldVisitButton} 
              onPress={() => handleBookFieldVisit(language === 'hi' ? expert.name_hi : expert.name_en)}
            >
              <MaterialIcons name="event" size={20} color="white" />
              <Text style={styles.expertButtonText}>
                {language === 'hi' ? 'फील्ड विजिट बुक करें' : 'Book a Field Visit'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.callButton} 
              onPress={() => handleCallExpert(expert.tollFreeNumber)}
            >
              <MaterialIcons name="phone" size={20} color="white" />
              <Text style={styles.expertButtonText}>
                {language === 'hi' ? 'कॉल करें' : 'Call Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <Stack.Screen options={{ title: language === 'hi' ? '🌱 पौधे की बीमारी जांच' : '🌱 Plant Disease Detection' }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {language === 'hi' ? '🌱 पौधे की बीमारी जांच' : '🌱 Plant Disease Detection'}
        </Text>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageToggle}>
          <Text style={styles.languageToggleText}>{language === 'hi' ? 'EN' : 'हिं'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {renderFarmDataCard()}

        <View style={styles.actionContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>
              {language === 'hi' ? 'फसल चुनें' : 'Select Crop'}
            </Text>
            <Picker
              selectedValue={cropType}
              onValueChange={(itemValue) => setCropType(itemValue)}
              style={styles.picker}
            >
              {CROP_TYPES.map((type, index) => (
                <Picker.Item key={index} label={type} value={type} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <MaterialIcons name="photo-camera" size={24} color="white" />
            <Text style={styles.photoButtonText}>
              {language === 'hi' ? 'पौधे की फोटो खींचें' : 'Take Plant Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        {isLoading && (
          <Text style={styles.loadingText}>
            {language === 'hi' ? 'पौधे की छवि का विश्लेषण हो रहा है...' : 'Analyzing plant image...'}
          </Text>
        )}

        {analysisResult && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.resultContainer}>
            {diseaseSeverity && (
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(diseaseSeverity) }]}>
                <Text style={styles.severityText}>
                  {language === 'hi' ? `बीमारी की गंभीरता: ${diseaseSeverity}` : `Disease Severity: ${diseaseSeverity}`}
                </Text>
              </View>
            )}
            <Text style={styles.sectionTitle}>
              {language === 'hi' ? 'पौधे की बीमारी विश्लेषण:' : 'Plant Disease Analysis:'}
            </Text>
            <View style={styles.analysisContent}>
              {analysisResult.map((line, index) => (
                <Text key={index} style={styles.resultText}>
                  {line}
                </Text>
              ))}
            </View>
            {renderExpertSection()}
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#E8F0F2',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#388E3C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  languageToggle: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  languageToggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  container: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 30,
  },
  farmDataContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2E7D32',
    textAlign: 'center',
  },
  farmDataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  farmDataItem: {
    alignItems: 'center',
    flex: 1,
  },
  farmDataLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  farmDataValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  lastUpdatedText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
  },
  actionContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  photoButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 6,
  },
  photoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  image: {
    width: width * 0.9,
    height: width * 0.6,
    resizeMode: 'cover',
    marginVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  loadingText: {
    marginVertical: 20,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  resultContainer: {
    padding: 25, // Increased padding for better spacing
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20, // Increased spacing
  },
  severityText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20, // Larger title for hierarchy
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 15, // More spacing below titles
  },
  analysisContent: {
    marginBottom: 25, // Space before expert section
  },
  resultText: {
    fontSize: 16,
    lineHeight: 26, // Increased line height for readability
    color: '#444',
    marginBottom: 8, // Space between lines
  },
  expertContainer: {
    marginTop: 25, // Increased spacing above expert section
  },
  expertCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 20, // Increased padding for better structure
    marginBottom: 20, // More space between cards
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  expertDetails: {
    marginBottom: 20, // More space before buttons
  },
  expertDetailText: {
    fontSize: 15, // Slightly larger for readability
    color: '#555',
    lineHeight: 24, // Increased line height
    marginBottom: 6, // Space between detail lines
  },
  expertButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldVisitButton: {
    backgroundColor: '#0288D1',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  callButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  expertButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PlantDiseaseDetectionScreen;