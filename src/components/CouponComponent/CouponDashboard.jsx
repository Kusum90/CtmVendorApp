import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import Axios
import { useNavigation } from '@react-navigation/native';
import Active from '../../assets/svg/Couponsvg/Active';
import Paused from '../../assets/svg/Couponsvg/Paushed';
import Expire from '../../assets/svg/Couponsvg/Expire';
import BackArrow from '../../assets/svg/Couponsvg/BackArrow';

const DashboardCard = ({ item }) => {
  const isExpired = item.label === 'Expired'; // Check if it's the "Expired" card

  return (
    <View style={[styles.card, isExpired && styles.expiredCard]}>
      {/* Display label at the top */}
      <Text style={styles.label}>{item.label}</Text>

      {/* Display the main value and additional info */}
      <View style={styles.cardContent}>
        <Text style={styles.mainValue}>{item.value}</Text>

        {/* Display icon */}
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
  const [dashboardData, setDashboardData] = useState([]); // State to store dashboard data
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch coupon counts from API when component mounts
    axios.get('https://cm-backend-yk2y.onrender.com/user/coupon-counts')
      .then((response) => {
        const data = response.data.counts;
        // Prepare the data for rendering
        const updatedData = [
          { id: '1', label: 'Active', value: data.active.toString(), additionalInfo: 'Draft (3)', icon: <Active /> },
          { id: '2', label: 'Paused', value: data.paused.toString(), additionalInfo: 'Archived (3)', icon: <Paused /> },
          { id: '3', label: 'Expired', value: data.expired.toString(), additionalInfo: '+28%', icon: <Expire /> },
        ];
        setDashboardData(updatedData);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading even if there’s an error
      });
  }, []);

  // Show a loading spinner while the data is being fetched
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coupon</Text>
      </View>

      <ScrollView style={styles.container}>
        <FlatList
          data={dashboardData}
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
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  expiredCard: {
    flex: 0.5, // Smaller flex for the expired card
    backgroundColor: '#f8f8f8',
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
    marginLeft: 10,
    color:'#373737'
  },
});

export default CouponDashboard;
