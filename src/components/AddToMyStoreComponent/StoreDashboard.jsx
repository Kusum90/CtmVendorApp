import React from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView } from 'react-native';
import Category from '../../assets/svg/Productsvg/Category';

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
    padding: 5,
    backgroundColor: '#F5F5F5',
  },
  card: {
    // flex: 1,
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
    // alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft:2
  },
  iconContainer: {
    borderRadius: 50,
    marginBottom:8,
    // padding: 10,
  },
  icon: {
    fontSize: 15,
    marginRight:10,
    marginLeft:20,
    marginBottom:5,
    
  },
  additionalInfo: {
    fontSize: 12,
    color: '#373737',
    marginTop: 1,
    marginLeft:7
  },
});

export default StoreDashboard;
