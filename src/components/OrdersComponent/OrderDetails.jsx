import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const OrderDetails = ({ route }) => {
  const { order } = route.params; // Extract the order object from route.params
  const navigation = useNavigation(); // Initialize navigation

  // Function to handle navigation on Edit Order button click
  const handleEditOrder = () => {
    // Navigate to the EditOrder screen, passing the order object as params
    navigation.navigate('EditOrder', { order });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order {order._id} details</Text>
        <Text style={styles.orderDate}>Order date: {new Date(order.createdAt).toLocaleDateString()}</Text>
        <View style={styles.row}>
          <Text style={styles.orderStatus}>Order status: {order.paymentMethod}</Text>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Billing Detail:</Text>
        <Text style={styles.billingText}>Name: {order.billing?.name || "N/A"}</Text>
        <Text style={styles.billingText}>Email: {order.billing?.email || "N/A"}</Text>
        <Text style={styles.billingText}>Phone: {order.billing?.phone || "N/A"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Details:</Text>
        <Text style={styles.shippingText}>{order.shipping || "No shipping address set."}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Products</Text>
        {order.products.map((product, index) => (
          <View key={index} style={styles.productRow}>
            <Image source={{ uri: product.product.image }} style={styles.productImage} />
            <View>
              <Text style={styles.productName}>{product.product.title}</Text>
              <Text>Store: {product.product.store}</Text>
              <Text>SKU: {product.product.sku}</Text>
              <Text>QTY: {product.quantity}</Text>
              <Text>Total: {(order.shippingCost + order.discountAmount).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.pricingSection}>
        <Text style={styles.pricingText}>Subtotal: {order.pricing?.subtotal}</Text>
        <Text style={styles.pricingText}>Tax: {order.pricing?.tax || "N/A"}</Text>
        <Text style={styles.pricingText}>Gross Total: {order.pricing?.grossTotal}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditOrder}>
        <Text style={styles.editButtonText}>Edit Quatation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  billingText: {
    fontSize: 14,
  },
  shippingText: {
    fontSize: 14,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pricingSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  pricingText: {
    fontSize: 16,
    marginVertical: 5,
  },
  editButton: {
    marginBottom: 20,
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderDetails;
