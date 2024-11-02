import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData, selectDashboard, selectLoading, selectError } from '../../redux/Home/HomeSlice';
import Active from '../../assets/svg/Couponsvg/Active';
import Expire from '../../assets/svg/Couponsvg/Expire';
import Pushed from '../../assets/svg/Couponsvg/Paushed';
import Recieved from '../../assets/svg/Couponsvg/Recieved';

const DashboardCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{item.label}</Text>
    <View style={styles.cardContent}>
      <Text style={styles.mainValue}>{item.value}</Text>
      <View style={styles.iconContainer}>{item.icon}</View>
    </View>
  </View>
);

const HomeScreenDashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectDashboard);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const dashboardData = [
    { id: '1', label: 'Gross Sales', value: dashboard.grossSales, icon: <Active /> },
    { id: '2', label: 'Admin Fees', value: '0', icon: <Pushed /> },
    { id: '3', label: 'Item Sold', value:  dashboard.itemsSold, icon: <Expire /> },
    { id: '4', label: 'Order Received', value:  dashboard.ordersReceived, icon: <Recieved /> },
  ];

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
    padding: wp(4),
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: wp(2),
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
    marginTop: hp(2.5),
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
    borderRadius: 50,
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

export default HomeScreenDashboard;
