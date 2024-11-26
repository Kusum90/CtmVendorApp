import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../redux/Product/ProductSlice';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import { useFocusEffect } from '@react-navigation/native';
import Category from '../../assets/svg/Productsvg/Category';
import Products from '../../assets/svg/Productsvg/Products';
import Sales from '../../assets/svg/Productsvg/Sales';
import LowStocks from '../../assets/svg/Productsvg/LowStocks';
import NotInStock from '../../assets/svg/Productsvg/NotInStock';
import TopSelling from '../../assets/svg/Productsvg/TopSelling';

const DashboardCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.mainValue}>{item.value}</Text>
        <View style={styles.iconContainer}>{item.icon}</View>
      </View>
      <Text style={styles.additionalInfo}>{item.additionalInfo}</Text>
    </View>
  );
};

const Product = () => {
  const dispatch = useDispatch();
  const { products: dashboardData, loading, error } = useSelector((state) => state.products);

  const fetchDashboard = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchDashboard();
    }, [fetchDashboard])
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

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
    { id: '1', label: 'Category', value: dashboardData.totalCategories || 0, additionalInfo: 'Draft (3)', icon: <Category /> },
    { id: '2', label: 'Products', value: dashboardData.totalProducts || 0, additionalInfo: 'Archived (3)', icon: <Products /> },
    { id: '3', label: 'Sales', value: dashboardData.totalSales?.totalOrders || 0, additionalInfo: '+28%', icon: <Sales /> },
    { id: '4', label: 'Top Selling', value: dashboardData.totalSales?.totalRevenue || 0, additionalInfo: '+13%', icon: <TopSelling /> },
    { id: '5', label: 'Low Stocks', value: dashboardData.lowStockProducts?.length || 0, additionalInfo: 'Ordered', icon: <LowStocks /> },
    { id: '6', label: 'Not In Stock', value: dashboardData.outOfStockProducts?.length || 0, additionalInfo: 'Archived (3)', icon: <NotInStock /> },
  ];

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={formattedData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DashboardCard item={item} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3),
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wp(3),
    margin: wp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(1) },
    shadowOpacity: 0.2,
    shadowRadius: wp(3),
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.2),
    marginLeft: wp(1),
  },
  label: {
    fontSize: FontSize(16),
    color: '#666',
    fontWeight: '500',
    marginLeft: wp(1),
  },
  mainValue: {
    fontSize: FontSize(26),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(1),
  },
  iconContainer: {
    borderRadius: wp(10),
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
});

export default Product;
