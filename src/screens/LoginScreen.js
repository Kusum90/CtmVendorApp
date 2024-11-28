import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../redux/Auth/Login'; // Adjust path as needed
import {
  sendForgotPasswordOtp,
  resetPassword,
} from '../redux/Auth/Password'; // Adjust path as needed

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.password);
  const loginState = useSelector((state) => state.login);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log('Login successful. Token:', result.token);

      await AsyncStorage.setItem('userToken', result.token);
      console.log('Token stored in AsyncStorage:', result.token);

      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigation' }],
      });
    } catch (err) {
      Alert.alert('Login Error', err || 'Failed to log in.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email to continue.');
      return;
    }

    try {
      await dispatch(sendForgotPasswordOtp(email)).unwrap();
      Alert.alert('OTP Sent', 'An OTP has been sent to your email.');
      setShowForgotModal(true);
    } catch (err) {
      Alert.alert('Error', err || 'Failed to send OTP.');
    }
  };

  const handleResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Validation Error', 'Please fill all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    try {
      await dispatch(resetPassword({ email, otp, newPassword })).unwrap();
      Alert.alert('Success', 'Password reset successfully.');
      setShowForgotModal(false);
    } catch (err) {
      Alert.alert('Error', err || 'Failed to reset password.');
    }
  };

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
      {loginState.loading && <ActivityIndicator size="large" color="#007BFF" />}

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loginState.loading}
      >
        <Text style={styles.buttonText}>
          {loginState.loading ? 'Logging In...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Forgot Password Modal */}
      <Modal visible={showForgotModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>

            {/* Email Field */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              editable={false} // Email is pre-filled and non-editable
              placeholderTextColor="#999"
            />

            {/* OTP Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              placeholderTextColor="#999"
            />

            {/* New Password Fields */}
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />

            {/* Reset Password Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>

            {/* Close Modal */}
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setShowForgotModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  closeButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#007BFF',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
