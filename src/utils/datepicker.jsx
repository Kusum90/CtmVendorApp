import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

// Get screen width for responsive design
const { width } = Dimensions.get('window');

const CommonCalendar = ({ onDateChange, selectedStartDate, selectedEndDate }) => {
  const [startDate, setStartDate] = useState(selectedStartDate || null);
  const [endDate, setEndDate] = useState(selectedEndDate || null);

  // Format date to 'yyyy-mm-dd'
  const formatDate = (date) => {
    return date ? date.toISOString().split('T')[0] : 'None';
  };

  const handleDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
      onDateChange && onDateChange(formatDate(date), 'END_DATE');
    } else {
      setStartDate(date);
      setEndDate(null);
      onDateChange && onDateChange(formatDate(date), 'START_DATE');
    }
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={new Date(2020, 1, 1)}
        maxDate={new Date(2050, 6, 3)}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={handleDateChange}
        selectedStartDate={startDate}
        selectedEndDate={endDate}
        width={width * 0.9} // Adjust width based on screen size for responsiveness
      />
      <View style={styles.selectedDates}>
        <Text>Start Date: {startDate ? formatDate(startDate) : 'None'}</Text>
        <Text>End Date: {endDate ? formatDate(endDate) : 'None'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: width * 0.95,
    alignSelf: 'center',
  },
  selectedDates: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default CommonCalendar;
