import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAttribute } from '../../../../redux/Product/ProductAttribute/CreateAttribute';

const AddAttribute = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAttribute, setNewAttribute] = useState({
    attribute_name: '',
    values: [], // Update to array
    active: false,
    visibleOnProductPage: false,
    useAsVariation: false,
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.attributes);

  const handleAddAttributeClick = () => {
    setModalVisible(true);
  };

  const handleSubmitNewAttribute = () => {
    if (!newAttribute.attribute_name || newAttribute.values.length === 0) {
      Alert.alert('Error', 'Attribute name and value are required.');
      return;
    }

    // Log the new attribute before sending
    console.log('Submitting new attribute:', newAttribute);

    // Dispatch the createAttribute action
    dispatch(createAttribute(newAttribute))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Attribute added successfully');
        setModalVisible(false);
        setNewAttribute({
          attribute_name: '',
          values: [], // Reset values to array
          active: false,
          visibleOnProductPage: false,
          useAsVariation: false,
        });
      })
      .catch((err) => {
        console.log('Error adding attribute:', err);
        Alert.alert('Error', err || 'Failed to add attribute');
      });
  };

  const CustomCheckBox = ({ isChecked, onPress, label }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {isChecked && <View style={styles.checked} />}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addAttributeButton}
        onPress={handleAddAttributeClick}
      >
        <Text style={styles.addButtonText}>Add Attribute</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Add New Attribute</Text>

                <CustomCheckBox
                  isChecked={newAttribute.active}
                  onPress={() =>
                    setNewAttribute((prev) => ({ ...prev, active: !prev.active }))
                  }
                  label="Active?"
                />

                <Text style={styles.modalLabel}>Attribute Name</Text>
                <TextInput
                  style={styles.modalInput}
                  value={newAttribute.attribute_name}
                  onChangeText={(text) =>
                    setNewAttribute((prev) => ({ ...prev, attribute_name: text }))
                  }
                  placeholder="Enter Attribute Name"
                />

                <Text style={styles.modalLabel}>Value</Text>
                <TextInput
                  style={styles.modalInput}
                  value={newAttribute.values[0] || ''}
                  onChangeText={(text) => setNewAttribute((prev) => ({ ...prev, values: [text] }))} // Store value as an array
                  placeholder="Enter Value"
                />

                <CustomCheckBox
                  isChecked={newAttribute.visibleOnProductPage}
                  onPress={() =>
                    setNewAttribute((prev) => ({
                      ...prev,
                      visibleOnProductPage: !prev.visibleOnProductPage,
                    }))
                  }
                  label="Visible on Product Page"
                />
                <CustomCheckBox
                  isChecked={newAttribute.useAsVariation}
                  onPress={() =>
                    setNewAttribute((prev) => ({
                      ...prev,
                      useAsVariation: !prev.useAsVariation,
                    }))
                  }
                  label="Use as Variation"
                />

                <TouchableOpacity
                  style={styles.modalSubmitButton}
                  onPress={handleSubmitNewAttribute}
                  disabled={loading}
                >
                  <Text style={styles.modalSubmitButtonText}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </Text>
                </TouchableOpacity>

                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addAttributeButton: {
    backgroundColor: '#0EAB3D',
    padding: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#0EAB3D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#0EAB3D',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  modalSubmitButton: {
    backgroundColor: '#0EAB3D',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  modalSubmitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AddAttribute;
