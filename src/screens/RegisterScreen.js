import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { wp,hp,FontSize } from '../utils/responsiveUtils';


const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterDetails')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('DrawerNavigation')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(5),
      },
      title: {
        fontSize: FontSize(28),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: hp(4),
      },
      button: {
        width: wp(80),
        paddingVertical: hp(2),
        backgroundColor: '#4CAF50',
        borderRadius: wp(3),
        alignItems: 'center',
        marginVertical: hp(1.5),
      },
      buttonText: {
        color: '#fff',
        fontSize: FontSize(18),
        fontWeight: 'bold',
      },
      orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1.5),
      },
      line: {
        flex: 1,
        height: 1,
        backgroundColor: '#888',
        marginHorizontal: wp(2),
      },
      orText: {
        fontSize: FontSize(16),
        color: '#373737',
        fontWeight: '600',
      },
      skipButton: {
        position: 'absolute',
        bottom: hp(2.5),
        right: wp(5),
      },
      skipText: {
        color: '#4a90e2',
        fontSize: FontSize(16),
      },
});

export default RegisterScreen;
