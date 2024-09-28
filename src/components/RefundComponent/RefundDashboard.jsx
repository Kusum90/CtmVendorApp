import React from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView } from 'react-native';
import Active from '../../assets/svg/Couponsvg/Active';
import Paushed from '../../assets/svg/Couponsvg/Paushed'

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

const RefundDashboard = () => {
  const dashboardData = [
    { id: '1', label: 'Total Refund Item', value: '250', icon: <Active/> },  // Emoji for box
    { id: '2', label: 'Total Refunds Amount', value: '34.4k', icon: <Paushed/> },  // Emoji for store
   
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
    // marginTop: 1,
    marginLeft:7
  },
});

export default RefundDashboard;
