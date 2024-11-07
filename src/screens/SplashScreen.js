import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/responsiveUtils';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('RegisterScreen');
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/SplashScreen/CleanTechMartLogo.png')}
          style={styles.logo}
        />
        <Image
          source={require('../assets/images/SplashScreen/splashImage.png')}
          style={styles.animation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scaleWidth(350),
    height: scaleHeight(165),
    resizeMode: 'contain',
  },
  animation: {
    width: scaleWidth(225),
    height: scaleHeight(325),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
