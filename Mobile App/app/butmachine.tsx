import React, { useState, useEffect } from 'react';
import { Stack, useNavigation } from 'expo-router';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { FilterIcon, SearchIcon, GlobeIcon } from 'lucide-react-native';


const MACHINERY_DATA = [
  {
    id: '1',
    name: 'Tractor Model X-450',
    image: 'https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor-500x500.jpg',
    price: 1500000,
    rentPrice: 7000,
    category: 'Tractor',
    cropType: ['Wheat', 'Rice', 'Corn'],
    farmSize: 'Large',
    description: 'High-power tractor with advanced features for efficient farming. Features include GPS navigation, climate-controlled cabin, and fuel-efficient engine. Suitable for various agricultural tasks.',
    specifications: {
      power: '75 HP',
      fuelType: 'Diesel',
      transmissionType: 'Manual',
      liftCapacity: '2000 kg',
      yearManufactured: '2023',
    },
  },
  {
    id: '2',
    name: 'Harvester H-200',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-a7UEZDYuqYZYuQcZ09OBYPRBiThatK9tQA&s',
    price: 2400000,
    rentPrice: 15000,
    category: 'Harvester',
    cropType: ['Rice', 'Wheat'],
    farmSize: 'Large',
    description: 'Advanced harvester designed for multiple crop types. Adjustable settings for different harvesting needs with minimal grain loss. Easy to operate and maintain.',
    specifications: {
      grainTankCapacity: '6000 liters',
      headerWidth: '10 meters',
      power: '220 HP',
      fuelConsumption: '15 L/hour',
      yearManufactured: '2022',
    },
  },
  {
    id: '3',
    name: 'Thresher 1000HM',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiIWuoA4R1y_x-2c2tUyLxoa67dbFtnFlGw&s',
    price: 370000,
    rentPrice: 9000,
    category: 'Thresher',
    cropType: ['Corn', 'Wheat', 'Soybean',"Rice","Barley"],
    farmSize: 'Medium',
    description: 'Precision seeder with adjustable row spacing. Designed for consistent seed placement and depth control. Suitable for various seed types and field conditions.',
    specifications: {
      workingWidth: '`12 meters',
      rowSpacing: '15-75 cm (adjustable)',
      seedCapacity: '1200 kg',
      weight: '5 tons',
      yearManufactured: '2017',
    },
  },
  {
    id: '4',
    name: 'Seeder S-100',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SPsEe3MUssShhiqEpN3tlf9SaM2V1ARwmg&s',
    price: 700000,
    rentPrice: 5000,
    category: 'Seeder',
    cropType: ['Corn', 'Wheat', 'Soybean'],
    farmSize: 'Medium',
    description: 'Precision seeder with adjustable row spacing. Designed for consistent seed placement and depth control. Suitable for various seed types and field conditions.',
    specifications: {
      workingWidth: '4 meters',
      rowSpacing: '15-75 cm (adjustable)',
      seedCapacity: '800 kg',
      weight: '1.5 tons',
      yearManufactured: '2024',
    },
  },
  {
    id: '5',
    name: 'Cultivator Amp-438',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIch-ZLhnuTUWM3g35KxX56o9FIH6d34_GCA&s',
    price: 120000,
    rentPrice: 9000,
    category: 'Cultivator',
    cropType: ['All crop types'],
    farmSize: 'Medium',
    description: 'Precision seeder with adjustable row spacing. Designed for consistent seed placement and depth control. Suitable for various seed types and field conditions.',
    specifications: {
      workingWidth: '8 meters',
      rowSpacing: '15-75 cm (adjustable)',
      seedCapacity: '400 kg',
      weight: '0.4 tons',
      yearManufactured: '2024',
    },
  }
];

// Language translations (unchanged)
const TRANSLATIONS = {
  en: {
    title: 'Farm Machinery',
    buy: 'Buy',
    rent: 'Rent',
    viewDetails: 'View Details',
    search: 'Search machinery...',
    filter: 'Filter',
    confirmPurchase: 'Confirm Purchase',
    confirmRental: 'Confirm Rental',
    cancelButton: 'Cancel',
    proceedPayment: 'Proceed to Payment',
    purchaseMessage: 'You are about to purchase',
    rentalMessage: 'You are about to rent',
    paymentMethodNote: 'Select your preferred payment method on the next screen.',
    noMachineryFound: 'No machinery found',
    reset: 'Reset',
    apply: 'Apply',
  },
  hi: {
    title: 'कृषि मशीनरी',
    buy: 'खरीदें',
    rent: 'किराए पर लें',
    viewDetails: 'विवरण देखें',
    search: 'मशीनरी खोजें...',
    filter: 'फ़िल्टर',
    confirmPurchase: 'खरीद की पुष्टि करें',
    confirmRental: 'किराए की पुष्टि करें',
    cancelButton: 'रद्द करें',
    proceedPayment: 'भुगतान पर जाएं',
    purchaseMessage: 'आप खरीदने जा रहे हैं',
    rentalMessage: 'आप किराए पर लेने जा रहे हैं',
    paymentMethodNote: 'अगली स्क्रीन पर अपना पसंदीदा भुगतान विकल्प चुनें।',
    noMachineryFound: 'कोई मशीनरी नहीं मिली',
    reset: 'रीसेट',
    apply: 'लागू करें',
  },
};

export default function MachineryListingScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const [selectedMachinery, setSelectedMachinery] = useState<typeof MACHINERY_DATA[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    visible: false,
    type: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    cropType: '',
    farmSize: '',
  });
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const t = TRANSLATIONS[selectedLanguage];

  const filteredMachinery = MACHINERY_DATA.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilters.category ? item.category === selectedFilters.category : true) &&
      (selectedFilters.cropType ? item.cropType.includes(selectedFilters.cropType) : true) &&
      (selectedFilters.farmSize ? item.farmSize === selectedFilters.farmSize : true)
  );

  const openMachineryDetails = (item: typeof MACHINERY_DATA[0]) => {
    setSelectedMachinery(item);
    setModalVisible(true);
  };

  const handleBuyOrRent = (type: 'buy' | 'rent') => {
    setModalVisible(false);
    setConfirmationModal({ visible: true, type });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({ visible: false, type: '' });
  };

  const renderMachineryItem = ({ item }: { item: typeof MACHINERY_DATA[0] }) => (
    <TouchableOpacity
      style={[styles.card, styles.shadow]}
      onPress={() => openMachineryDetails(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>{`${t.buy}: ₹${item.price.toLocaleString()}`}</Text>
        <Text style={styles.cardRent}>{`${t.rent}: ₹${item.rentPrice}/day`}</Text>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => openMachineryDetails(item)}
        >
          <Text style={styles.viewDetailsText}>{t.viewDetails}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Buy Machines' }} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedLanguage((prev) => (prev === 'en' ? 'hi' : 'en'))}>
          <GlobeIcon color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.title}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon color="#666" size={20} />
          <TextInput
            placeholder={t.search}
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <FilterIcon color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMachinery}
        renderItem={renderMachineryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>{t.noMachineryFound}</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <Text style={styles.modalTitle}>{t.filter}</Text>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Category</Text>
              {['Tractor', 'Harvester', 'Seeder'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterOption,
                    selectedFilters.category === category && styles.filterOptionSelected,
                  ]}
                  onPress={() =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      category: prev.category === category ? '' : category,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilters.category === category && styles.filterOptionTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setSelectedFilters({ category: '', cropType: '', farmSize: '' });
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>{t.reset}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.buttonTextWhite}>{t.apply}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailsModal}>
            {selectedMachinery && (
              <ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: selectedMachinery.image }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalTitle}>{selectedMachinery.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.modalPrice}>{`${t.buy}: ₹${selectedMachinery.price.toLocaleString()}`}</Text>
                  <Text style={styles.modalRent}>{`${t.rent}: ₹${selectedMachinery.rentPrice}/day`}</Text>
                </View>
                <Text style={styles.sectionTitle}>{t.viewDetails}</Text>
                <Text style={styles.description}>{selectedMachinery.description}</Text>
                <Text style={styles.sectionTitle}>Specifications</Text>
                <View style={styles.specsContainer}>
                  {Object.entries(selectedMachinery.specifications).map(([key, value]) => (
                    <View style={styles.specRow} key={key}>
                      <Text style={styles.specKey}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                      </Text>
                      <Text style={styles.specValue}>{value}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => handleBuyOrRent('buy')}
                  >
                    <Text style={styles.buttonTextWhite}>{t.buy}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rentButton}
                    onPress={() => handleBuyOrRent('rent')}
                  >
                    <Text style={styles.buttonTextWhite}>{t.rent}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationModal.visible}
        onRequestClose={closeConfirmationModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <Text style={styles.modalTitle}>
              {confirmationModal.type === 'buy' ? t.confirmPurchase : t.confirmRental}
            </Text>
            <Text style={styles.confirmationText}>
              {confirmationModal.type === 'buy'
                ? `${t.purchaseMessage} ${selectedMachinery?.name} ${t.proceedPayment} ₹${selectedMachinery?.price.toLocaleString()}.`
                : `${t.rentalMessage} ${selectedMachinery?.name} ${t.proceedPayment} ₹${selectedMachinery?.rentPrice}/day.`}
            </Text>
            <Text style={styles.paymentNote}>{t.paymentMethodNote}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeConfirmationModal}>
                <Text style={styles.buttonText}>{t.cancelButton}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={closeConfirmationModal}>
                <Text style={styles.buttonTextWhite}>
                  {confirmationModal.type === 'buy' ? t.proceedPayment : t.confirmRental}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#16a34a',
    padding: 20,
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    height: 140,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardImage: {
    width: Dimensions.get('window').width * 0.3,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  cardRent: {
    fontSize: 14,
    color: '#666',
  },
  viewDetailsButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  detailsModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  confirmationModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterOption: {
    backgroundColor: '#e5e7eb',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#16a34a',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  filterOptionTextSelected: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  priceContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  modalRent: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  specsContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  specKey: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  specValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  rentButton: {
    flex: 1,
    backgroundColor: '#d97706',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  paymentNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  buttonTextWhite: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});