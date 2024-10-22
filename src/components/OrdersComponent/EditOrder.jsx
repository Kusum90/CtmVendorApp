import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EditOrder = ({ route }) => {
  const { order } = route.params;

  if (!order || !order.products || order.products.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No order details available.</Text>
      </View>
    );
  }

  const product = order.products[0].product || {}; // Fallback to empty object if product is undefined
  const initialQuantity = order.products[0].quantity || 1; // Default to 1 if quantity is missing
  const costPerItem = product.price || 0; // Default to 0 if price is undefined

  const [quantity, setQuantity] = useState(initialQuantity);
  const [total, setTotal] = useState(initialQuantity * costPerItem);

  // Update total when quantity changes
  const updateTotal = (qty) => {
    if (qty >= 1) {
      setTotal(qty * costPerItem);
      setQuantity(qty);
    } else {
      Alert.alert('Invalid Quantity', 'Quantity cannot be less than 1.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Product Section */}
      <View style={styles.productSection}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.productImage} />
        ) : (
          <Text>No Image Available</Text>
        )}
        <View>
          <Text style={styles.productName}>{product.title || 'Product Name'}</Text>
          <Text>Store: <Text style={styles.boldText}>{product.store || 'Unknown Store'}</Text></Text>
          <Text>SKU: <Text style={styles.boldText}>{product.sku || 'N/A'}</Text></Text>
          <Text>Cost: <Text style={styles.boldText}>₹{costPerItem.toFixed(1)}</Text></Text>

          {/* Quantity and Total */}
          <View style={styles.quantityContainer}>
            <Text>QTY: </Text>
            <TouchableOpacity onPress={() => updateTotal(quantity - 1)} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => updateTotal(quantity + 1)} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text>Total: <Text style={styles.boldText}>₹{total.toFixed(1)}</Text></Text>
        </View>
      </View>

      {/* Apply Discount */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Apply Discount</Text>
        <TextInput style={styles.input} placeholder="Enter Discount" keyboardType="numeric" />
      </View>

      {/* Note to Customer */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Note to Customer</Text>
        <TextInput style={styles.input} placeholder="Add a note" />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  productSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputSection: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditOrder;
