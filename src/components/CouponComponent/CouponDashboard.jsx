import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Active from '../../assets/svg/Couponsvg/Active';
import Paushed from '../../assets/svg/Couponsvg/Paushed'
import Expire from '../../assets/svg/Couponsvg/Expire';


const DashboardCard = ({ item }) => {
  const isExpired = item.label === 'Expired';  // Check if it's the "Expired" card

  return (
    <View style={[styles.card, isExpired && styles.expiredCard]}>
      {/* Display label at the top */}
      <Text style={styles.label}>{item.label}</Text>

      {/* Display the main value and additional info */}
      <View style={styles.cardContent}>
        <Text style={styles.mainValue}>{item.value}</Text>

        {/* Display icon using emoji */}
        <View style={styles.iconContainer}>
          {item.icon}
        </View>
      </View>

      {/* Additional Info below */}
      <Text style={styles.additionalInfo}>{item.additionalInfo}</Text>
    </View>
  );
};

const CouponDashboard = () => {
  const dashboardData = [
    { id: '1', label: 'Active', value: '47', additionalInfo: 'Draft (3)', icon: <Active /> },
    { id: '2', label: 'Paushed', value: '352', additionalInfo: 'Archived (3)', icon: <Paushed /> },
    { id: '3', label: 'Expired', value: '134.5k', additionalInfo: '+28%', icon: <Expire /> },
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
    margin: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  // Style for the "Expired" card to make it smaller or different
  expiredCard: {
    flex: 0.5,  // You can reduce the flex to make it smaller
    backgroundColor: '#f8f8f8',  // You can also change its background color to differentiate
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 2,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginLeft: 2,
  },
  mainValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 2,
  },
  iconContainer: {
    borderRadius: 50,
  },
  additionalInfo: {
    fontSize: 12,
    color: '#373737',
    marginTop: 1,
    marginLeft: 7,
  },
});

export default CouponDashboard;