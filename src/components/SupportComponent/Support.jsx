import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Download from '../../assets/svg/Productsvg/Download';
import Plus from '../../assets/svg/Productsvg/Plus';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';
import BackArrow from '../../assets/svg/Couponsvg/BackArrow';
import { useNavigation } from '@react-navigation/native';

const Support = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Screen</Text>
      </View>
      </View>
      {/* Inventory Title */}
      <Text style={styles.title}>Support</Text>

      {/* Filter and Search Section */}
      <View style={styles.filterContainer}>
        {/* Date Filter */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Last 30 days</Text>
        </TouchableOpacity>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: wp(4), // Responsive padding
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      title: {
        fontSize: FontSize(25), // Responsive font size
        fontWeight: 'bold',
        marginBottom: hp(1), // Responsive margin
        color: '#373737',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: hp(2), // Responsive margin
      },
      iconButton: {
        width: wp(10), // Responsive width
        height: wp(10), // Responsive height
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp(2), // Responsive margin
      },
      iconText: {
        fontSize: FontSize(18), // Responsive font size
        color: '#fff',
      },
      filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      filterButton: {
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        padding: hp(1.5), // Responsive padding
        marginHorizontal: wp(2), // Responsive margin
      },
      filterText: {
        color: '#666',
        fontSize: FontSize(14), // Responsive font size
      },
      searchInput: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: wp(3), // Responsive horizontal padding
        marginLeft: wp(2), // Responsive margin
        fontSize: FontSize(14), // Responsive font size
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
export default Support;

