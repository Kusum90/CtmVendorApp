import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomDropdown = ({ options, selectedValue, onValueChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <Text style={styles.dropdownText}>
          {selectedValue || 'Select an option'}
        </Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={() => handleSelect(option.name)}
            >
              <Text style={styles.optionText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative', // Ensure the container is positioned relatively
  },
  dropdown: {
    height: 40,
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom:10,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    color: '#6B6B6B',
  },
  optionsContainer: {
    position: 'absolute', // Position absolutely to overlay directly below the dropdown button
    top: 40, // Set to match the height of the dropdown button
    width: '100%',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 1000, // Ensure the dropdown is above other components
  },
  option: {
    padding: 10,
  },
  optionText: {
    color: '#333333',
  },
});

export default CustomDropdown;
