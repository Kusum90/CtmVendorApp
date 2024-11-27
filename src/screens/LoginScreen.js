import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../redux/Auth/Login'; // Adjust path as needed

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.login);

  const handleLogin = async () => {
    if (!email.trim() || !password) { // Removed `trim` for password
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    try {
      // Dispatch login action
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log('Login successful. Token:', result.token);

      // Store token in Async Storage
      await AsyncStorage.setItem('userToken', result.token);
      console.log('Token stored in AsyncStorage:', result.token);

      // Reset the navigation stack to prevent going back to the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigation' }], // Replace with your main screen
      });
    } catch (err) {
      Alert.alert('Login Error', err || 'Failed to log in.');
    }
  };

  const checkStoredToken = async () => {
    const storedToken = await AsyncStorage.getItem('userToken');
    console.log('Retrieved Token from AsyncStorage:', storedToken);
  };

  // Call `checkStoredToken` on load or whenever needed for testing
  checkStoredToken();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      {/* Show Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#007BFF" />}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Login'}</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
