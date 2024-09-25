import React from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView } from 'react-native';
import Category from '../assets/svg/Productsvg/category';
import Products from '../assets/svg/Productsvg/Products';
import Sales from '../assets/svg/Productsvg/Sales';
import TopSelling from '../assets/svg/Productsvg/TopSelling';
import LowStocks from '../assets/svg/Productsvg/LowStocks';
import NotInStock from '../assets/svg/Productsvg/NotInStock';

const DashboardCard = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* Display label at the top */}
      <Text style={styles.label}>{item.label}</Text>

      {/* Display the main value and additional info */}
      <View style={styles.cardContent}>
        <Text style={styles.mainValue}>{item.value}</Text>

        {/* Display icon using emoji */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
      </View>

      {/* Additional Info below */}
      <Text style={styles.additionalInfo}>{item.additionalInfo}</Text>
    </View>
  );
};

const Product = () => {
  const dashboardData = [
    { id: '1', label: 'Category', value: '47', additionalInfo: 'Draft (3)', icon: <Category /> },  // Emoji for box
    { id: '2', label: 'Products', value: '352', additionalInfo: 'Archived (3)', icon: <Products/> },  // Emoji for store
    { id: '3', label: 'Sales', value: '134.5k', additionalInfo: '+28%', icon: <Sales/> },  // Emoji for graph
    { id: '4', label: 'Top Selling', value: '5', additionalInfo: '+13%', icon: <TopSelling/> },  // Emoji for trophy
    { id: '5', label: 'Low Stocks', value: '47', additionalInfo: 'Ordered', icon: <LowStocks/> },  // Emoji for warning
    { id: '6', label: 'Not In Stock', value: '352', additionalInfo: 'Archived (3)', icon: <NotInStock/> },  // Emoji for blocked
  ];

  return (
    <ScrollView style={styles.container}>

    
      <FlatList
        data={dashboardData}
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
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    // padding: 3,
    margin: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:2
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginLeft:2
  },
  mainValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginLeft:2
  },
  iconContainer: {
    borderRadius: 50,
    // padding: 10,
  },
  icon: {
    fontSize: 24,
    marginRight:3
    
  },
  additionalInfo: {
    fontSize: 12,
    color: '#373737',
    marginTop: 1,
    marginLeft:7
  },
});

export default Product;
