import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack, useNavigation } from 'expo-router';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Firebase config (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyANotXe3bOglk6jcGqqAblm_stSSt8vZGQ",
  authDomain: "solution-challenge-f74ab.firebaseapp.com",
  projectId: "solution-challenge-f74ab",
  storageBucket: "solution-challenge-f74ab.appspot.com",
  messagingSenderId: "219291865691",
  appId: "1:219291865691:web:ab8d633e6f57ef5089657e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Localized strings
  const strings = {
    hi: {
      title: 'एग्रोसेतु',
      subtitle: 'अपनी कृषि यात्रा शुरू करें',
      emailPlaceholder: 'ईमेल',
      passwordPlaceholder: 'पासवर्ड',
      loginButton: 'लॉग इन करें',
      signupButton: 'साइन अप करें',
      toggleLogin: 'पहले से खाता है? लॉग इन करें',
      toggleSignup: 'खाता नहीं है? साइन अप करें'
    },
    en: {
      title: 'KrishiSetu',
      subtitle: 'Start Your Agricultural Journey',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      loginButton: 'Login',
      signupButton: 'Sign Up',
      toggleLogin: 'Already have an account? Login',
      toggleSignup: 'Don\'t have an account? Sign Up'
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert(
        language === 'hi' ? 'सफलता' : 'Success', 
        language === 'hi' ? 'लॉगिन सफल' : 'Login successful!'
      );
      router.replace('/home');
    } catch (error: any) {
      Alert.alert(
        language === 'hi' ? 'लॉगिन त्रुटि' : 'Login Error', 
        error.message
      );
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert(
        language === 'hi' ? 'सफलता' : 'Success', 
        language === 'hi' ? 'खाता सफलतापूर्वक बनाया गया' : 'Account created successfully!'
      );
      router.replace('/home');
    } catch (error: any) {
      Alert.alert(
        language === 'hi' ? 'साइन अप त्रुटि' : 'Signup Error', 
        error.message
      );
    }
  };

  return (
    
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Language Toggle */}
        <TouchableOpacity 
          style={styles.languageToggle} 
          onPress={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
        >
          <Text style={styles.languageToggleText}>
            {language === 'hi' ? 'English' : 'हिन्दी'}
          </Text>
        </TouchableOpacity>

        {/* Logo and Branding */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/main.jpg')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {strings[language].title}
        </Text>
        <Text style={styles.subtitle}>
          {strings[language].subtitle}
        </Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            placeholder={strings[language].emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            placeholder={strings[language].passwordPlaceholder}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity 
          onPress={isSignup ? handleSignup : handleLogin}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            {isSignup ? strings[language].signupButton : strings[language].loginButton}
          </Text>
        </TouchableOpacity>

        {/* Toggle between Login and Signup */}
        <TouchableOpacity 
          onPress={() => setIsSignup(!isSignup)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {isSignup 
              ? strings[language].toggleLogin
              : strings[language].toggleSignup}
          </Text>
        </TouchableOpacity>

        {/* Alternative Login Options */}
        <View style={styles.alternativeLoginContainer}>
          <Text style={styles.orText}>
            {language === 'hi' ? 'या फिर' : 'Or'}
          </Text>
          <View style={styles.alternativeButtons}>
            {/* OTP Login */}
            <TouchableOpacity style={styles.alternativeButton}>
              <Ionicons name="phone-portrait" size={24} color="#2196F3" />
              <Text style={styles.alternativeButtonText}>
                {language === 'hi' ? 'OTP लॉगिन' : 'OTP Login'}
              </Text>
            </TouchableOpacity>

            {/* Local Language Support */}
            <TouchableOpacity style={styles.alternativeButton}>
              <Ionicons name="language" size={24} color="#4CAF50" />
              <Text style={styles.alternativeButtonText}>
                {language === 'hi' ? 'क्षेत्रीय भाषा' : 'Regional Language'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    marginTop:35,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  languageToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  languageToggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#2C3E50',
  },
  passwordToggle: {
    paddingHorizontal: 15,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  alternativeLoginContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  orText: {
    color: '#7F8C8D',
    marginBottom: 15,
  },
  alternativeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alternativeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alternativeButtonText: {
    marginLeft: 10,
    color: '#4CAF50',
  },
});

export default LoginScreen;