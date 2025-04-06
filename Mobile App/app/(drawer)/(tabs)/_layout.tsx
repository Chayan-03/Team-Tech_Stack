import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Custom Tab Icon with Label
const CustomTabIcon = ({ 
  Icon, 
  iconName, 
  label, 
  color, 
  iconType = 'default' 
}: {
  Icon?: any, 
  iconName: any,
  label: string, 
  color: string, 
  iconType?: 'default' | 'sf' | 'fontawesome5' | 'fontawesome6' | 'materialCommunity'
}) => {
  const renderIcon = () => {
    const iconProps = { 
      size: 28, // Increased size for better visibility
      color: color 
    };

    switch(iconType) {
      case 'sf':
        return <IconSymbol size={30} name={iconName} color={color} />;
      case 'fontawesome5':
        return <FontAwesome5 name={iconName} {...iconProps} />;
      case 'fontawesome6':
        return <FontAwesome6 name={iconName} {...iconProps} />;
      case 'materialCommunity':
        return <MaterialCommunityIcons name={iconName} {...iconProps} />;
      default:
        return <Ionicons name={iconName} {...iconProps} />;
    }
  };

  return (
    <View style={styles.tabIconContainer}>
      {renderIcon()}
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = '#4CAF50'; // Matching the green from marketplace
  const inactiveColor = '#888';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: 'rgba(245, 246, 233, 0.95)', // Matching F5F6E9 from marketplace with transparency
              borderTopWidth: 1,
              borderTopColor: '#D0D7A5', // Softer green-gray border
            },
            default: {
              backgroundColor: '#F5F6E9', // Consistent with marketplace
              borderTopWidth: 1,
              borderTopColor: '#D0D7A5',
            }
          }),
          styles.tabBar
        ],
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'मुख्य पृष्ठ (Home)',

          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="materialCommunity" 
              iconName="home-variant" 
              label="होम" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore" 
        options={{
          title: 'खोजें (Explore)',

          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="fontawesome6" 
              iconName="compass" 
              label="खोजें" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'बाजार (Market)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="materialCommunity" 
              iconName="cart-variant" 
              label="बाजार" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
      
        name="chatbot"
        options={{
          title: 'सहायता (Support)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="materialCommunity" 
              iconName="chat-processing" 
              label="सहायता" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="farmdetails"
        options={{
          title: 'फार्म (Farm)',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon 
              iconType="materialCommunity"
              iconName="tractor" 
              label="फार्म" 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80, // Increased height for better touch area
    paddingBottom: 15, // More space at bottom
    paddingTop: 10,
    elevation: 8, // Stronger shadow for depth
    //shadowColor: 'white', // Green shadow to match theme
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderTopLeftRadius: 20, // Rounded corners
    borderTopRightRadius: 20,
    overflow: 'hidden', // Ensure rounded corners work
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0, // Added padding for larger touch area
  },
  tabLabel: {
    fontSize: 12, // Slightly larger text
    marginTop: 3, // More space between icon and label
    fontWeight: '600', // Bolder text for readability
    textAlign: 'center',
  },
});