import React,{useEffect} from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView,ActivityIndicator } from 'react-native';
import Category from '../../assets/svg/Productsvg/Category';
import Products from '../../assets/svg/Productsvg/Products';
import LowStocks from '../../assets/svg/Productsvg/LowStocks';
import NotInStock from '../../assets/svg/Productsvg/NotInStock';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';
import { useDispatch,useSelector } from 'react-redux';
import { fetchOrders, fetchDashboardData, selectOrders, selectDashboard, selectLoading, selectError } from '../../redux/Order/OrderSlice'

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


const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const dashboard = useSelector(selectDashboard);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
      dispatch(fetchOrders());
      dispatch(fetchDashboardData());
  }, [dispatch]);

  const dashboardData = [
    { id: '1', label: 'Completed', value: dashboard.grossSales, additionalInfo: 'Total Sales', icon: <Category /> },  // Emoji for box
    { id: '2', label: 'Processing', value: dashboard.itemsSold, additionalInfo: 'Total Items', icon: <Products/> },  // Emoji for store
    { id: '5', label: 'Refunded', value: dashboard.ordersReceived, additionalInfo: 'Total Orders', icon: <LowStocks/> },  // Emoji for warning
    { id: '6', label: 'Cancelled', value: '0', additionalInfo: 'Archived (3)', icon: <NotInStock/> },  // Emoji for blocked
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
            {/* Render orders or additional components as needed */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4), // Responsive padding
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    fontSize: FontSize(23), // Responsive font size
    color: '#333',
    marginBottom: hp(2), // Responsive margin
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2), // Responsive margin
  },
  checkboxLabel: {
    marginLeft: wp(2), // Responsive margin
    fontSize: FontSize(21), // Responsive font size
    color: '#333',
  },
  textarea: {
    height: hp(10), // Responsive height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: hp(2), // Responsive margin
    paddingHorizontal: wp(2), // Responsive padding
    paddingVertical: wp(2), // Responsive padding
    textAlignVertical: 'top', // Ensures text starts at the top in multiline input
    fontSize: FontSize(19),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2), // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19), // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19), // Responsive font size
    color: '#fff',
  },
  
  // Newly Added Card Styles
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: wp(2), // Responsive margin
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
    marginTop: hp(2.5), // Responsive margin top
    marginLeft: wp(1), // Responsive margin left
  },
  label: {
    fontSize: FontSize(16), // Responsive font size
    color: '#666',
    fontWeight: '500',
    marginLeft: wp(1), // Responsive margin
  },
  mainValue: {
    fontSize: FontSize(26), // Responsive font size
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(1), // Responsive margin
  },
  iconContainer: {
    borderRadius: 50,
    // Responsive padding can be added if necessary
  },
  icon: {
    fontSize: FontSize(24), // Responsive font size
    marginRight: wp(1), // Responsive margin
  },
  additionalInfo: {
    fontSize: FontSize(12), // Responsive font size
    color: '#373737',
    marginTop: hp(0.5), // Responsive margin top
    marginLeft: wp(2), // Responsive margin left
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
export default Dashboard;
