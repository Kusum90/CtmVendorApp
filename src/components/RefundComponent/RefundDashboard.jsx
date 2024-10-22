import React from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView ,TouchableOpacity} from 'react-native';
import Active from '../../assets/svg/Couponsvg/Active';
import Paushed from '../../assets/svg/Couponsvg/Paushed'
import { wp,hp,FontSize } from '../../utils/responsiveUtils';
import BackArrow from '../../assets/svg/Couponsvg/BackArrow';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
  const dashboardData = [
    { id: '1', label: 'Total Refund Item', value: '250', icon: <Active/> },  // Emoji for box
    { id: '2', label: 'Total Refunds Amount', value: '34.4k', icon: <Paushed/> },  // Emoji for store
   
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refund</Text>
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
    padding: wp(2.5), // Responsive padding
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wp(3), // Responsive border radius
    margin: wp(2), // Responsive margin
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) }, // Responsive shadow offset
    shadowOpacity: 0.2,
    shadowRadius: wp(1.25), // Responsive shadow radius
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.25), // Responsive margin top
    marginLeft: wp(0.5), // Responsive margin left
  },
  label: {
    fontSize: FontSize(16), // Responsive font size
    color: '#666',
    fontWeight: '500',
    marginLeft: wp(0.5), // Responsive margin left
  },
  mainValue: {
    fontSize: FontSize(26), // Responsive font size
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(0.5), // Responsive margin left
  },
  iconContainer: {
    borderRadius: wp(12.5), // Responsive border radius
    // padding: wp(2.5), // Optionally add responsive padding
  },
  icon: {
    fontSize: FontSize(24), // Responsive font size
    marginRight: wp(0.75), // Responsive margin right
  },
  additionalInfo: {
    fontSize: FontSize(12), // Responsive font size
    color: '#373737',
    // marginTop: hp(0.25), // Optional: Responsive margin top
    marginLeft: wp(1.75), // Responsive margin left
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

export default RefundDashboard;
