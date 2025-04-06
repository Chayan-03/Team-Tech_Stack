import React, { useState } from 'react';
import { Stack, useNavigation } from 'expo-router';

import { useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Language translations
const translations = {
  english: {
    title: 'Self Help Groups',
    createGroup: 'Create New Group',
    joinGroup: 'Join Group',
    memberCount: 'Members',
    location: 'Location',
    activeGroups: 'Active Groups',
    noGroups: 'No groups found in your area',
    languageToggle: 'हिन्दी',
    connect: 'Connect',
    createGroupModal: 'Create New Farmer Group',
    groupName: 'Group Name',
    groupLocation: 'Location',
    groupDescription: 'Group Description',
    cancel: 'Cancel',
    create: 'Create',
    connectModalTitle: 'Connect with Group',
    connectMessage: 'Send Message',
    messagePlaceholder: 'Type your message...'
  },
  hindi: {
    title: 'स्व-सहायता समूह',
    createGroup: 'नया समूह बनाएं',
    joinGroup: 'समूह में शामिल हों',
    memberCount: 'सदस्य',
    location: 'स्थान',
    activeGroups: 'सक्रिय समूह',
    noGroups: 'आपके क्षेत्र में कोई समूह नहीं मिला',
    languageToggle: 'English',
    connect: 'जुड़ें',
    createGroupModal: 'नया किसान समूह बनाएं',
    groupName: 'समूह का नाम',
    groupLocation: 'स्थान',
    groupDescription: 'समूह विवरण',
    cancel: 'रद्द करें',
    create: 'बनाएं',
    connectModalTitle: 'समूह से जुड़ें',
    connectMessage: 'संदेश भेजें',
    messagePlaceholder: 'अपना संदेश लिखें...'
  }
};

const SelfHelpGroupsPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [isCreateGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [isConnectModalVisible, setConnectModalVisible] = useState(false);
  interface FarmerGroup {
    id: number;
    name: string;
    location: string;
    members: number;
    description: string;
  }

  const [selectedGroup, setSelectedGroup] = useState<FarmerGroup | null>(null);
  const [newGroup, setNewGroup] = useState({
    name: '',
    location: '',
    description: ''
  });
  const [connectMessage, setConnectMessage] = useState('');

  const t = translations[language];

  // Sample farmer groups data
  const [farmerGroups, setFarmerGroups] = useState([
    {
      id: 1,
      name: 'Krishi Mitra Mandal',
      location: 'Maharashtra',
      members: 2324,
      description: 'Supporting farmers in crop management and market access'
    },
    {
      id: 2,
      name: 'Sahayog Samiti',
      location: 'Punjab',
      members: 420,
      description: 'Sharing agricultural technology and resources'
    },
    {
      id: 3,
      name: 'Grameen Sangathan',
      location: 'Karnataka',
      members: 180,
      description: 'Promoting sustainable farming practices'
    },
    {
      id: 4,
      name: 'Kisan Mandal',
      location: 'Uttar Pradesh',
      members: 1240,
      description: 'Providing financial assistance and training'
    }
  ]);

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  const handleCreateGroup = () => {
    // Validate input
    if (!newGroup.name.trim() || !newGroup.location.trim()) {
      Alert.alert(
        language === 'english' ? 'Validation Error' : 'सत्यापन त्रुटि', 
        language === 'english' 
          ? 'Please fill in group name and location' 
          : 'कृपया समूह का नाम और स्थान भरें'
      );
      return;
    }

    // Create new group
    const newGroupEntry = {
      id: farmerGroups.length + 1,
      name: newGroup.name,
      location: newGroup.location,
      members: 1,
      description: newGroup.description || 'New farmer self-help group'
    };

    // Update groups and reset state
    setFarmerGroups([...farmerGroups, newGroupEntry]);
    setCreateGroupModalVisible(false);
    setNewGroup({ name: '', location: '', description: '' });

    // Show success message
    Alert.alert(
      language === 'english' ? 'Success' : 'सफलता', 
      language === 'english' 
        ? 'Group created successfully' 
        : 'समूह सफलतापूर्वक बनाया गया'
    );
  };

  const handleConnect = () => {
    // Validate message
    if (!connectMessage.trim()) {
      Alert.alert(
        language === 'english' ? 'Validation Error' : 'सत्यापन त्रुटि', 
        language === 'english' 
          ? 'Please enter a message' 
          : 'कृपया एक संदेश दर्ज करें'
      );
      return;
    }

    // Simulate sending message
    Alert.alert(
      language === 'english' ? 'Message Sent' : 'संदेश भेजा गया', 
      language === 'english' 
        ? `Your message to ${selectedGroup?.name || 'group'} has been sent` 
        : `${selectedGroup?.name || 'समूह'} को आपका संदेश भेज दिया गया है`
    );

    // Reset modals and state
    setConnectModalVisible(false);
    setSelectedGroup(null);
    setConnectMessage('');
  };

  const renderCreateGroupModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCreateGroupModalVisible}
      onRequestClose={() => setCreateGroupModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t.createGroupModal}</Text>
          
          <TextInput
            style={styles.input}
            placeholder={t.groupName}
            value={newGroup.name}
            onChangeText={(text) => setNewGroup({...newGroup, name: text})}
          />
          
          <TextInput
            style={styles.input}
            placeholder={t.groupLocation}
            value={newGroup.location}
            onChangeText={(text) => setNewGroup({...newGroup, location: text})}
          />
          
          <TextInput
            style={styles.input}
            placeholder={t.groupDescription}
            value={newGroup.description}
            onChangeText={(text) => setNewGroup({...newGroup, description: text})}
            multiline
          />
          
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setCreateGroupModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>{t.cancel}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalCreateButton}
              onPress={handleCreateGroup}
            >
              <Text style={styles.modalCreateButtonText}>{t.create}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderConnectModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isConnectModalVisible}
      onRequestClose={() => setConnectModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {t.connectModalTitle}: {selectedGroup?.name}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder={t.messagePlaceholder}
            value={connectMessage}
            onChangeText={setConnectMessage}
            multiline
          />
          
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setConnectModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>{t.cancel}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalCreateButton}
              onPress={handleConnect}
            >
              <Text style={styles.modalCreateButtonText}>{t.connectMessage}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderCreateGroupModal()}
      {renderConnectModal()}

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{t.title}</Text>
        <TouchableOpacity 
          onPress={toggleLanguage} 
          style={styles.languageToggleButton}
        >
          <Icon name="web" size={20} color="white" />
          <Text style={styles.languageToggleText}>{t.languageToggle}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity 
          style={styles.createGroupButton}
          onPress={() => setCreateGroupModalVisible(true)}
        >
          <Icon name="plus-circle" size={20} color="white" />
          <Text style={styles.buttonText}>{t.createGroup}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinGroupButton}>
          <Icon name="account-group" size={20} color="white" />
          <Text style={styles.buttonText}>{t.joinGroup}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.activeGroupsTitle}>{t.activeGroups}</Text>

      <ScrollView>
        {farmerGroups.length > 0 ? (
          farmerGroups.map((group) => (
            <View key={group.id} style={styles.groupCard}>
              <View style={styles.groupCardHeader}>
                <Text style={styles.groupName}>{group.name}</Text>
                <View style={styles.memberCountContainer}>
                  <Icon name="account-group" size={16} color="#666" />
                  <Text style={styles.memberCountText}>
                    {group.members} {t.memberCount}
                  </Text>
                </View>
              </View>
              <Text style={styles.groupDescription}>{group.description}</Text>
              <View style={styles.groupCardFooter}>
                <View style={styles.locationContainer}>
                  <Icon name="map-marker" size={16} color="#666" />
                  <Text style={styles.locationText}>{group.location}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.connectButton}
                  onPress={() => {
                    setSelectedGroup(group);
                    setConnectModalVisible(true);
                  }}
                >
                  <Icon name="message-text" size={16} color="white" />
                  <Text style={styles.connectButtonText}>{t.connect}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noGroupsText}>{t.noGroups}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... Previous styles remain the same
  
  // New modal styles
  container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 40
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      languageToggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20
      },
      languageToggleText: {
        color: 'white',
        marginLeft: 8
      },
      actionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
      },
      createGroupButton: {
        backgroundColor: '#2ecc71',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8
      },
      joinGroupButton: {
        backgroundColor: '#3498db',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8
      },
      buttonText: {
        color: 'white',
        marginLeft: 8
      },
      activeGroupsTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16
      },
      groupCard: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8
      },
      groupCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
      },
      groupName: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      memberCountContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      memberCountText: {
        marginLeft: 8,
        color: '#666'
      },
      groupDescription: {
        color: '#333',
        marginBottom: 8
      },
      groupCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      locationText: {
        marginLeft: 8,
        color: '#666'
      },
      connectButton: {
        backgroundColor: '#2ecc71',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8
      },
      connectButtonText: {
        color: 'white',
        marginLeft: 8
      },
      noGroupsText: {
        textAlign: 'center',
        color: '#666'
      },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    marginRight: 10
  },
  modalCreateButton: {
    flex: 1,
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8
  },
  modalCancelButtonText: {
    color: 'white',
    textAlign: 'center'
  },
  modalCreateButtonText: {
    color: 'white',
    textAlign: 'center'
  }
});

export default SelfHelpGroupsPage;