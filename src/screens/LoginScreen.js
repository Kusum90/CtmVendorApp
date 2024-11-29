import React, {useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  sendForgotPasswordOtp,
  verifyOtp,
  resetPassword,
} from '../redux/Auth/Password'; // Adjust path
import {loginUser} from '../redux/Auth/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVisible, setOtpVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle for new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password
  const [loginError, setLoginError] = useState(''); // Validation for login error


  const [emailError, setEmailError] = useState(''); // Validation for email
  const [otpError, setOtpError] = useState(''); // Validation for OTP
  const [passwordError, setPasswordError] = useState(''); // Validation for new password
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(''); // Validation for confirm password

  const dispatch = useDispatch();
  const {loading, error, successMessage} = useSelector(state => state.password);
  const [loginLoading, setLoginLoading] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setLoginError(''); // Clear previous login error
    if (!email.trim() || !password.trim()) {
      setLoginError('Please enter both email and password.');
      return;
    }
    setLoginLoading(true);

    try {
      const result = await dispatch(loginUser({email, password})).unwrap();
      console.log('Login successful. Token:', result.token);

      await AsyncStorage.setItem('userToken', result.token);
      console.log('Token stored in AsyncStorage:', result.token);

      navigation.reset({
        index: 0,
        routes: [{name: 'DrawerNavigation'}],
      });
    } catch (err) {
      console.error('Login Error:', err);
      setLoginError('Incorrect email or password. Please try again.'); // Set error message for incorrect login
    } finally {
      setLoginLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setEmailError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      return;
    }

    setEmailError(''); // Clear error if validation passes
    try {
      await dispatch(sendForgotPasswordOtp(email)).unwrap();
      setOtpVisible(true);
    } catch (err) {
      setEmailError(err || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setOtpError('OTP is required.');
      return;
    }

    if (otp.length !== 6 || isNaN(otp)) {
      setOtpError('Invalid OTP.');
      return;
    }

    setOtpError(''); // Clear error if validation passes
    try {
      await dispatch(verifyOtp({email, otp})).unwrap();
      setShowForgotModal(false);
      setShowResetModal(true); // Open reset password modal
    } catch (err) {
      setOtpError(err || 'Incorrect OTP.');
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      setPasswordError('Password is required.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    setPasswordError(''); // Clear password error if valid

    if (!confirmPassword.trim()) {
      setConfirmPasswordMessage('Confirm Password is required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordMessage('Passwords do not match.');
      return;
    }

    setConfirmPasswordMessage('Passwords match successfully!'); // Green success message

    try {
      console.log('Attempting to reset password with:', {
        email,
        newPassword,
        confirmNewPassword: confirmPassword,
      });

      await dispatch(
        resetPassword({
          email,
          newPassword,
          confirmNewPassword: confirmPassword,
        }),
      ).unwrap();

      setShowResetModal(false);
      setPasswordError(''); // Clear error
      setConfirmPasswordMessage('');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (err) {
      console.error('Reset Password Error:', err);
      setPasswordError('Failed to reset password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError(''); // Clear error on input change
          setLoginError(''); // Clear login error on input change

        }}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
     {emailError ? (
      <Text style={styles.validationText}>{emailError}</Text>
    ) : null}
    
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            setLoginError(''); // Clear login error on password input change
          }}          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <Text style={{fontSize: 18}}>{showPassword ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>
      {loginError ? (
      <Text style={styles.errorText}>{loginError}</Text>
    ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loginLoading}>
        {loginLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowForgotModal(true)}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Forgot Password Modal */}
      <Modal visible={showForgotModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>
            <Text style={styles.infoText}>
              Forgot your password? No worries! Enter your registered email, and
              we'll send you an OTP to reset it. 😊
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            {emailError ? (
              <Text style={styles.validationText}>{emailError}</Text>
            ) : null}

            {otpVisible && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  value={otp}
                  onChangeText={text => {
                    setOtp(text);
                    setOtpError('');
                  }}
                  keyboardType="number-pad"
                  placeholderTextColor="#999"
                />
                {otpError ? (
                  <Text style={styles.validationText}>{otpError}</Text>
                ) : null}
              </>
            )}

            {!otpVisible && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendOtp}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </TouchableOpacity>
            )}

            {otpVisible && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOtp}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Verify OTP</Text>
                )}
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setShowForgotModal(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Reset Password Modal */}
      <Modal visible={showResetModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  setPasswordError('');
                  setConfirmPasswordMessage('');
                }}
                secureTextEntry={!showNewPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}>
                <Text style={{fontSize: 18}}>
                  {showNewPassword ? '👁️' : '🙈'}
                </Text>
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.validationText}>{passwordError}</Text>
            ) : null}

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  if (text !== newPassword) {
                    setConfirmPasswordMessage('Passwords do not match! ');
                  }else{
                    setConfirmPasswordMessage('Password Matched!')
                  }
                }}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={{fontSize: 18}}>
                  {showConfirmPassword ? '👁️' : '🙈'}
                </Text>
              </TouchableOpacity>
            </View>
            {confirmPasswordMessage ? (
              <Text
                style={[
                  styles.validationText,
                  confirmPasswordMessage === 'Password Matched!'
                    ? styles.successText
                    : null,
                ]}>
                {confirmPasswordMessage}
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Confirm</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setShowResetModal(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    marginBottom: 10,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    paddingRight: 40, // Space for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15, // Align with input padding
  },
  validationText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  successText: {
    color: 'green',
  },
  infoText: {
    fontSize: 14,
    color: '#373737',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
