import React from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView } from 'react-native';
import {wp,hp,FontSize} from '../../utils/responsiveUtils'
import Category from '../../assets/svg/Productsvg/Category';
import Products from '../../assets/svg/Productsvg/Products'
import Sales from '../../assets/svg/Productsvg/Sales';
import TopSelling from '../../assets/svg/Productsvg/TopSelling';
import LowStocks from '../../assets/svg/Productsvg/LowStocks';
import NotInStock from '../../assets/svg/Productsvg/NotInStock';

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
    // { id: '3', label: 'Sales', value: '134.5k', additionalInfo: '+28%', icon: <Sales/> },  // Emoji for graph
    // { id: '4', label: 'Top Selling', value: '5', additionalInfo: '+13%', icon: <TopSelling/> },  // Emoji for trophy
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
    padding: wp(3),            // Responsive padding
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wp(3),        // Responsive border radius
    margin: wp(2),              // Responsive margin
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(1) }, // Responsive shadow offset
    shadowOpacity: 0.2,
    shadowRadius: wp(3),        // Responsive shadow radius
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.2),         // Responsive margin top
    marginLeft: wp(1),          // Responsive margin left
  },
  label: {
    fontSize: FontSize(16),     // Responsive font size
    color: '#666',
    fontWeight: '500',
    marginLeft: wp(1),          // Responsive margin left
  },
  mainValue: {
    fontSize: FontSize(26),     // Responsive font size
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(1),          // Responsive margin left
  },
  iconContainer: {
    borderRadius: wp(10),       // Responsive border radius
    // padding: wp(2),          // Uncomment if padding is needed
  },
  icon: {
    fontSize: FontSize(24),     // Responsive font size
    marginRight: wp(1),         // Responsive margin right
  },
  additionalInfo: {
    fontSize: FontSize(12),     // Responsive font size
    color: '#373737',
    marginTop: hp(0.3),         // Responsive margin top
    marginLeft: wp(2),          // Responsive margin left
  }
});

export default Product;
