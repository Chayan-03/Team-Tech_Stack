import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

// Firebase config
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
  const router = useRouter();   // ✅ this replaces useNavigation()

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Signup successful!');
      router.replace('/first'); // ✅ using router.replace() to navigate
    } catch (error) {
      Alert.alert('Signup Error', (error as any).message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login successful!');
      router.replace('/first'); // ✅ redirect using Expo Router
    } catch (error) {
      Alert.alert('Login Error', (error as any).message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Login or Signup</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: '#2196F3', padding: 10, borderRadius: 5, marginBottom: 10 }}
      >
        <Text style={{ color: 'white' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignup}
        style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
