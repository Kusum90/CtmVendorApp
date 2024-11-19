// CustomToast.js
import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const CustomToast = ({ message, visible, onClose }) => {
  if (!visible) return null;

  return (
    <Animated.View style={styles.toastContainer}>
      <View style={styles.toast}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
  },
  toast: {
    backgroundColor: '#0EAB3D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    maxWidth: '80%',
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomToast;
