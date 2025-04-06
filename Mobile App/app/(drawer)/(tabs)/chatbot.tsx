import React, { useState, useEffect, useRef } from 'react';

import { Stack, useNavigation } from 'expo-router';


import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Audio } from 'expo-av';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const FarmerChatbotScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [messages, setMessages] = useState<{ id: number; content: string[]; isBot: boolean; type: string }[]>([
    {
      id: 0,
      content: ['🌾 किसान सहायक में आपका स्वागत है! मैं आपकी खेती से संबंधित हर सवाल का जवाब दूंगा।'],
      isBot: true,
      type: 'welcome'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');

  const scrollViewRef = useRef<ScrollView>(null);

  // Farmer Details
  const farmerName = "Rakesh";
  const farmLocation = "Haryana";

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI('AIzaSyBnaKP_EdrnAPH1qlR1nzAokz9DTrMnJDQ');

  // Scroll to bottom of chat
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Update welcome message based on language
  useEffect(() => {
    setMessages([
      {
        id: 0,
        content: [
          language === 'hi'
            ? `🌾 ${farmerName}, किसान सहायक में आपका स्वागत है! मैं आपकी हरियाणा में खेती से संबंधित हर सवाल का जवाब दूंगा।`
            : `🌾 Welcome ${farmerName} to Farmer Assistant! I’ll answer all your farming-related questions for your land in Haryana.`
        ],
        isBot: true,
        type: 'welcome'
      }
    ]);
  }, [language]);

  // Language toggle function
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hi' ? 'en' : 'hi');
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: 0,
        content: [
          language === 'hi'
            ? `🌾 ${farmerName}, किसान सहायक में आपका स्वागत है! मैं आपकी हरियाणा में खेती से संबंधित हर सवाल का जवाब दूंगा।`
            : `🌾 Welcome ${farmerName} to Farmer Assistant! I’ll answer all your farming-related questions for your land in Haryana.`
        ],
        isBot: true,
        type: 'welcome'
      }
    ]);
  };

  // Parse bot response into structured content
  const parseBotResponse = (text: string): string[] => {
    return text
      .replace(/\*\*\*/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '• ')
      .replace(/#{1,6}\s/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  // Send message to AI
  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { 
      id: messages.length, 
      content: [inputText], 
      isBot: false,
      type: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `You are an advanced AI agricultural assistant for an Indian farmer named ${farmerName}, whose farm is located in ${farmLocation}. 
      Provide practical, culturally sensitive, and region-specific agricultural advice tailored to Haryana. 
      Include:
      - Specific crop recommendations for Haryana
      - Local farming techniques suitable for Haryana's climate and soil
      - Seasonal agricultural insights for Haryana
      - Sustainable and economic farming practices
      - Simple, actionable advice
      - Also do not answer very long answer
      - Provide numercal data wherever needed by scraping the web
      
      Language Preference: ${language === 'hi' ? 'Respond in Hindi only' : 'Respond in English only'}
      
      Format your response with clear headings, paragraphs, and bullet points where applicable for readability.
      
      Farmer's Query: ${inputText}`;

      const result = await model.generateContent(prompt);
      const rawBotResponse = result.response.text();
      const botResponse = parseBotResponse(rawBotResponse);

      const botMessage = { 
        id: messages.length + 1, 
        content: botResponse, 
        isBot: true,
        type: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        id: messages.length + 1, 
        content: [
          language === 'hi'
            ? '🚨 क्षमा करें, कुछ गलत हुआ। कृपया पुनः प्रयास करें।'
            : '🚨 Sorry, something went wrong. Please try again.'
        ],
        isBot: true,
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Request microphone permissions
  const requestMicrophonePermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Audio.requestPermissionsAsync();
      return status === 'granted';
    }
    return false;
  };

  // Start voice recording
  const startVoiceRecognition = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          language === 'hi' ? "माइक्रोफोन अनुमति" : "Microphone Permission",
          language === 'hi'
            ? "कृपया ध्वनि इनपुट के लिए माइक्रोफोन अनुमति दें।"
            : "Please grant microphone permission for voice input."
        );
        return;
      }

      setIsListening(true);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error('Voice recording error:', error);
      setIsListening(false);
      Alert.alert(
        language === 'hi' ? "त्रुटि" : "Error",
        language === 'hi'
          ? "ध्वनि रिकॉर्डिंग में समस्या।"
          : "Problem with voice recording."
      );
    }
  };

  // Stop recording and process (placeholder for transcription)
  const stopVoiceRecognition = async () => {
    setIsListening(false);
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      Alert.alert(
        language === 'hi' ? "ध्वनि इनपुट" : "Voice Input",
        language === 'hi'
          ? "ध्वनि रिकॉर्ड की गई। यहाँ वास्तविक ट्रांसक्रिप्शन सेवा लागू करें।"
          : "Voice recorded. Implement actual transcription service here."
      );
      setRecording(null);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {language === 'hi' ? 'किसान सहायक 🌱' : 'Farmer Assistant 🌱'}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
            <Text style={styles.languageButtonText}>{language === 'hi' ? 'EN' : 'हि'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
            <MaterialIcons name="clear-all" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <Animated.View 
            key={message.id} 
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              styles.messageBubble,
              message.isBot ? styles.botMessage : styles.userMessage,
              message.type === 'welcome' && styles.welcomeMessage,
              message.type === 'error' && styles.errorMessage
            ]}
          >
            {message.content.map((line, index) => (
              <Text 
                key={index} 
                style={[
                  styles.messageText,
                  line.startsWith('•') && styles.bulletText,
                ]}
              >
                {line}
              </Text>
            ))}
          </Animated.View>
        ))}
        {isLoading && (
          <Animated.View 
            style={styles.loadingIndicator}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <ActivityIndicator size="small" color="#4CAF50" />
            <Text style={styles.loadingText}>
              {language === 'hi' ? 'प्रसंस्करण...' : 'Processing...'}
            </Text>
          </Animated.View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={language === 'hi' ? "अपना सवाल लिखें..." : "Type your question..."}
          multiline
          placeholderTextColor="#757575"
          autoFocus={true}
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity 
          style={styles.voiceButton}
          onPress={isListening ? stopVoiceRecognition : startVoiceRecognition}
        >
          <Ionicons 
            name={isListening ? "stop-circle" : "mic"} 
            size={30}
            color={isListening ? "#EF5350" : "#4CAF50"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E8ECEF',
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
  },
  clearButton: {
    backgroundColor: '#EF5350',
    borderRadius: 24,
    padding: 10,
  },
  messagesContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 20,
    marginVertical: 12,
    elevation: 4,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#C8E6C9',
    borderTopRightRadius: 6,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 6,
  },
  welcomeMessage: {
    alignSelf: 'center',
    backgroundColor: '#E3F2FD',
    width: '90%',
    textAlign: 'center',
    borderRadius: 24,
  },
  errorMessage: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#EF5350',
  },
  messageText: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 26,
    marginBottom: 8,
  },
  bulletText: {
    marginLeft: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8ECEF',
    elevation: 6,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    minHeight: 50,
    maxHeight: 100,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#F5F6E9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    marginRight: 12,
  },
  voiceButton: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    elevation: 3,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 28,
    padding: 14,
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  loadingIndicator: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8ECEF',
    padding: 12,
    borderRadius: 16,
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 10,
    fontStyle: 'italic',
  },
});

export default FarmerChatbotScreen;