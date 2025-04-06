import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { 
  ChevronRight, Video, Tractor, FileText, PlayCircle, 
  CloudRain, Calculator, Bell, Crop, BookOpen, HeartHandshake 
} from 'lucide-react-native';
import { Stack } from 'expo-router';
const governmentSchemes = [
  {
    id: 1,
    title: 'PM Kisan Samman Nidhi Yojana',
    description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to protect farmers from crop losses',
    link: 'https://pmfby.gov.in/'
  },
  {
    id: 3,
    title: 'Kisan Credit Card Scheme',
    description: 'Affordable credit for agricultural and allied activities',
    link: 'https://dfcc.co.in/kisan-credit-card/'
  }
];

const cropAdvisories = [
  {
    id: 1,
    title: 'Monsoon Crop Planning',
    description: 'Recommended crops and planting techniques for Kharif season',
    icon: <CloudRain color="#2980b9" size={24} />
  },
  {
    id: 2,
    title: 'Soil Health Management',
    description: 'Tips for maintaining soil fertility and improving yield',
    icon: <Crop color="#27ae60" size={24} />
  },
  {
    id: 3,
    title: 'Crop Disease Prevention',
    description: 'Recommended Disease Prevention techniques for Summer season',
    icon: <Crop color="#2980b9" size={24} />
  }
];

const latestMachinery = [
  {
    id: 1,
    name: 'Smart Tractor X2000',
    description: 'Advanced GPS-enabled tractor with precision farming features',
    image: 'https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor-500x500.jpg',
    price: '₹12,50,000'
  },
  {
    id: 2,
    name: 'Solar-Powered Irrigation Pump',
    description: 'Eco-friendly irrigation solution for small landholdings',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFdgXwgPDIL-vRNrM35dOPH8d0mBfhLSKUoA&s',
    price: '₹85,000'
  }
];

const youtubeVideos = [
  {
    id: 1,
    title: 'Modern Farming Techniques in India',
    channel: 'Krishi Vibhag',
    thumbnailUrl: 'https://img.youtube.com/vi/_20zC-doDvs/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=_20zC-doDvs'
  },
  {
    id: 2,
    title: 'Sustainable Agriculture Practices',
    channel: 'Agricultural Ministry',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    videoUrl: 'https://www.youtube.com/watch?v=dCIcB1iqTGI'
  },
  {
    id: 3,
    title: 'Mango Farming Agriculture Practices',
    channel: 'DD Kisan',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    videoUrl: 'https://www.youtube.com/watch?v=2AzQB2iMJWs'
  },
  {
    id: 4,
    title: 'Budget 2025 for Farmers and Agriculture',
    channel: 'DD Kisan',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    videoUrl: 'https://www.youtube.com/watch?v=-xsTa2UkU7w'
  }
  
];

const languageResources = [
  {
    id: 1,
    language: 'Hindi',
    description: 'Agricultural resources and guides in Hindi',
    icon: <BookOpen color="#e67e22" size={24} />
  },
  {
    id: 2,
    language: 'Regional Languages',
    description: 'Support for multiple regional Indian languages',
    icon: <HeartHandshake color="#9b59b6" size={24} />
  }
];

const FarmersDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    'schemes' | 'machinery' | 'videos' | 'advisories' | 'resources'
  >('schemes');

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderSchemes = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>सरकारी योजनाएं (Government Schemes)</Text>
      {governmentSchemes.map(scheme => (
        <TouchableOpacity 
          key={scheme.id} 
          style={styles.cardContainer}
          onPress={() => openLink(scheme.link)}
        >
          <View style={styles.cardContent}>
            <FileText color="#2ecc71" size={24} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{scheme.title}</Text>
              <Text style={styles.cardDescription}>{scheme.description}</Text>
            </View>
            <ChevronRight color="#95a5a6" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCropAdvisories = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>फसल सलाह (Crop Advisories)</Text>
      {cropAdvisories.map(advisory => (
        <View key={advisory.id} style={styles.advisoryCard}>
          <View style={styles.advisoryIconContainer}>
            {advisory.icon}
          </View>
          <View style={styles.advisoryTextContainer}>
            <Text style={styles.advisoryTitle}>{advisory.title}</Text>
            <Text style={styles.advisoryDescription}>{advisory.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderMachinery = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>कृषि मशीनरी (Agricultural Machinery)</Text>
      {latestMachinery.map(machine => (
        <View key={machine.id} style={styles.machineCard}>
          <Image 
            source={{ uri: machine.image }} 
            style={styles.machineImage} 
          />
          <View style={styles.machineTextContainer}>
            <Text style={styles.machineTitle}>{machine.name}</Text>
            <Text style={styles.machineDescription}>{machine.description}</Text>
            <Text style={styles.machinePrice}>Price: {machine.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderLanguageResources = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>भाषा संसाधन (Language Resources)</Text>
      {languageResources.map(resource => (
        <View key={resource.id} style={styles.resourceCard}>
          <View style={styles.resourceIconContainer}>
            {resource.icon}
          </View>
          <View style={styles.resourceTextContainer}>
            <Text style={styles.resourceTitle}>{resource.language}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderVideos = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>कृषि वीडियो (Agriculture Videos)</Text>
      {youtubeVideos.map(video => (
        <TouchableOpacity 
          key={video.id} 
          style={styles.videoCard}
          onPress={() => openLink(video.videoUrl)}
        >
          <Image 
            source={{ uri: video.thumbnailUrl }} 
            style={styles.videoThumbnail} 
          />
          <View style={styles.videoTextContainer}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoChannel}>{video.channel}</Text>
          </View>
          <PlayCircle color="#3498db" size={24} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>किसान सेवा (Kisan Seva)</Text>
        <Text style={styles.headerSubtitle}>Your Comprehensive Agricultural Companion</Text>
      </View>

      <View style={styles.navigationContainer}>
        {[
          { 
            section: 'schemes', 
            icon: <FileText 
              color={selectedSection === 'schemes' ? '#2ecc71' : '#7f8c8d'}
              size={20} 
            />,
            label: 'योजनाएं'
          },
          { 
            section: 'advisories', 
            icon: <Bell 
              color={selectedSection === 'advisories' ? '#e74c3c' : '#7f8c8d'}
              size={20} 
            />,
            label: 'सलाह'
          },
          { 
            section: 'machinery', 
            icon: <Tractor 
              color={selectedSection === 'machinery' ? '#3498db' : '#7f8c8d'}
              size={20} 
            />,
            label: 'मशीनरी'
          },
          { 
            section: 'videos', 
            icon: <Video 
              color={selectedSection === 'videos' ? '#9b59b6' : '#7f8c8d'}
              size={20} 
            />,
            label: 'वीडियो'
          },
          { 
            section: 'resources', 
            icon: <Calculator 
              color={selectedSection === 'resources' ? '#f39c12' : '#7f8c8d'}
              size={20} 
            />,
            label: 'संसाधन'
          }
        ].map(item => (
          <TouchableOpacity 
            key={item.section}
            style={[
              styles.navButton, 
              selectedSection === item.section && styles.activeNavButton
            ]}
            onPress={() => setSelectedSection(item.section as any)}
          >
            {item.icon}
            <Text style={styles.navButtonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedSection === 'schemes' && renderSchemes()}
        {selectedSection === 'machinery' && renderMachinery()}
        {selectedSection === 'videos' && renderVideos()}
        {selectedSection === 'advisories' && renderCropAdvisories()}
        {selectedSection === 'resources' && renderLanguageResources()}
      </ScrollView>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f7',
  },
  headerContainer: {
    backgroundColor: '#2ecc71',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  activeNavButton: {
    backgroundColor: '#e8f5e9',
  },
  navButtonText: {
    marginTop: 5,
    color: '#7f8c8d',
    fontWeight: '500',
    fontSize: 12,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 15,
  },
  sectionContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  advisoryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  advisoryIconContainer: {
    marginRight: 15,
  },
  advisoryTextContainer: {
    flex: 1,
  },
  advisoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  advisoryDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  machineCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  machineImage: {
    width: '100%',
    height: 200,
  },
  machineTextContainer: {
    padding: 15,
  },
  machineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  machineDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  machinePrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 10,
  },
  resourceCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceIconContainer: {
    marginRight: 15,
  },
  resourceTextContainer: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoThumbnail: {
    width: 100,
    height: 10,
    borderRadius: 8,
  },
  videoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  videoChannel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default FarmersDashboard;