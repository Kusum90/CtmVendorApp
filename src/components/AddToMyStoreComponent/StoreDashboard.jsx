import React from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView } from 'react-native';
import Category from '../../assets/svg/Productsvg/Category';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

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
    </View>
  );
};

const StoreDashboard = () => {
  const dashboardData = [
    { id: '1', label: 'Total Product', value: '47', icon: <Category/> },  // Emoji for box
   
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
    padding: wp(2), // Responsive padding
    backgroundColor: '#F5F5F5',
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
    marginTop: hp(1.5), // Responsive marginTop
    marginLeft: wp(0.5), // Responsive marginLeft
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
    marginLeft: wp(0.5), // Responsive marginLeft
  },
  iconContainer: {
    borderRadius: wp(12.5), // Responsive borderRadius (50 as a percentage of the width for a circular shape)
    marginBottom: hp(1), // Responsive marginBottom
  },
  icon: {
    fontSize: FontSize(15), // Responsive font size
    marginRight: wp(2.5), // Responsive marginRight
    marginLeft: wp(5), // Responsive marginLeft
    marginBottom: hp(0.5), // Responsive marginBottom
  },
  additionalInfo: {
    fontSize: FontSize(12), // Responsive font size
    color: '#373737',
    marginTop: hp(0.1), // Responsive marginTop
    marginLeft: wp(1.5), // Responsive marginLeft
  },
});

export default StoreDashboard;
