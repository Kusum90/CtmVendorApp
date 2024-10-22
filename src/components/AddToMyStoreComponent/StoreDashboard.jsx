import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../redux/Product/ProductSlice';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import Category from '../../assets/svg/Productsvg/Category';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../../assets/svg/Couponsvg/BackArrow';

const DashboardCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.mainValue}>{item.value}</Text>
        <View style={styles.iconContainer}>
          {item.icon}
        </View>
      </View>
      <Text style={styles.additionalInfo}>{item.additionalInfo}</Text>
    </View>
  );
};

const Product = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products: dashboardData, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Check for loading or error state
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const formattedData = [
   
    { id: '2', label: ' Total Product', value: dashboardData.totalProducts || 0, additionalInfo: 'Draft (3)', icon: <Category /> },
   
  ];

  return (
    <View style={{ flex: 1 }}>
    {/* Header with back arrow and title */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackArrow name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add to Store</Text>
    </View>
    <ScrollView style={styles.container}>
      <FlatList
        data={formattedData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DashboardCard item={item} />}
      />
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3),
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(3), // Responsive borderRadius
    margin: wp(2), // Responsive margin
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.5) }, // Responsive shadowOffset
    shadowOpacity: 0.2,
    shadowRadius: wp(2), // Responsive shadowRadius
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1.0), // Responsive marginTop
    marginLeft: wp(1), // Responsive marginLeft
  },
  label: {
    fontSize: FontSize(16), // Responsive font size
    color: '#666',
    fontWeight: '500',
    marginLeft: wp(0.5), // Responsive marginLeft
  },
  mainValue: {
    fontSize: FontSize(20), // Responsive font size
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(0.7), // Responsive marginLeft
  },
  iconContainer: {
    borderRadius: wp(12.5), // Responsive borderRadius (50 as a percentage of the width for a circular shape)
    marginBottom: hp(1), // Responsive marginBottom
  },
  additionalInfo: {
    fontSize: FontSize(12),
    color: '#373737',
    marginTop: hp(0.3),
    marginLeft: wp(2),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FontSize(16),
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 80,
    color:'#373737',
  },
});

export default Product;
