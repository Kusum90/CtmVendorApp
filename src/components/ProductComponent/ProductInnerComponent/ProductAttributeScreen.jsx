import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const AttributeDropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        <Text style={styles.dropdownLabel}>
          {selectedOption ? selectedOption : label}
        </Text>
        <Text style={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <TouchableOpacity key={option} onPress={() => selectOption(option)}>
              <Text
                style={[
                  styles.dropdownOption,
                  selectedOption === option && styles.selectedOption,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const ProductAttributeScreen = () => {
  const attributeOptions = [
    ['Brand', ['Nike', 'Adidas', 'Puma']],
    ['Color', ['Red', 'Blue', 'Green']],
    ['Shape', ['Circle', 'Square', 'Triangle']],
    ['Size', ['Small', 'Medium', 'Large']],
    ['Watts', ['10W', '20W', '30W']],
    ['Weight', ['1kg', '2kg', '3kg']],
    ['Power', ['Low', 'Medium', 'High']],
    ['Material', ['Plastic', 'Metal', 'Wood']],
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation(); // Initialize navigation hook

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>Attributes</Text>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        {attributeOptions.map(([label, options]) => (
          <AttributeDropdown key={label} label={label} options={options} />
        ))}

        {/* Button at the Right Side */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.buttonText}>Add Attributes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigation}>
          {/* Previous Button */}
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={() => navigation.goBack()} // Go back to the previous screen
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={() => navigation.navigate('ProductLinkedScreen')} // Navigate to ProductLinkedScreen
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Adding Attributes */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Attribute</Text>
            {/* You can add form elements here to add a new attribute */}
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),                    // Responsive padding
    backgroundColor: '#fff',           // Light background for contrast
  },
  headerCard: {
    backgroundColor: '#f0f0f0',        // Light gray background for header
    borderRadius: 8,
    padding: wp(4),                    // Responsive padding
    marginBottom: hp(2.5),             // Responsive margin
  },
  headerText: {
    fontSize: FontSize(23),             // Responsive font size
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  dropdownContainer: {
    marginBottom: hp(2),                // Responsive margin
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(3),                     // Responsive padding
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',         // Light gray for dropdown
  },
  dropdownLabel: {
    fontSize: FontSize(19),             // Responsive font size
  },
  dropdownIcon: {
    fontSize: FontSize(16),             // Responsive font size
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: -1,                      // Adjust for overlapping border
    backgroundColor: 'white',           // White background for options
  },
  dropdownOption: {
    padding: wp(3),                     // Responsive padding
    fontSize: FontSize(19),             // Responsive font size
  },
  selectedOption: {
    backgroundColor: '#d1e7dd',         // Highlight color for selected option
  },
  buttonContainer: {
    paddingVertical: hp(4),             // Responsive vertical padding
    alignItems: 'flex-end',             // Align the button to the right
  },
  button: {
    backgroundColor: '#4CAF50',         // Green for the button
    padding: hp(2),                     // Responsive padding
    borderRadius: 4,
    width: '40%',                       // Adjust button width
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(19),             // Responsive font size
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(4),             // Responsive vertical padding
  },
  navButton: {
    flex: 1,
    padding: hp(2),                     // Responsive padding
    borderRadius: 4,
    marginHorizontal: wp(2),            // Responsive horizontal margin
  },
  previousButton: {
    backgroundColor: '#4CAF50',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: wp(5),                     // Responsive padding
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: FontSize(18),             // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(2.5),              // Responsive margin
  },
});
export default ProductAttributeScreen;
