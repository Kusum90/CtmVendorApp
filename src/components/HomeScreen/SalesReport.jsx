import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';

const SalesReport = () => {
  const screenWidth = Dimensions.get("window").width;
  const [selectedData, setSelectedData] = useState(null);
  const [dataPoints, setDataPoints] = useState([250, 300, 280, 320, 400, 450, 600, 500, 550, 800, 1000]);

  const data = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: dataPoints, // Dynamic data for Forecast
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // blue line (Forecast)
        strokeWidth: 2, // optional
      },
      {
        data: [200, 230, 240, 200, 220, 230, 250, 250, 300, 350, 370], // Static data for Demand
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange line (Demand)
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Demand", "Forecast"],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const handleDataPointClick = (data) => {
    const { value, dataset, index } = data;
    setSelectedData({
      label: data.label,
      value,
      datasetIndex: dataset,
    });
    Alert.alert(`Clicked on ${data.label}`, `Value: ${value}`, [{ text: 'OK' }]);
  };

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live updates by changing the data points
      setDataPoints((prevData) => prevData.map((point) => point + Math.round(Math.random() * 10 - 5)));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* The Chart */}
        <LineChart
          data={data}
          width={screenWidth - 60} // Subtracting extra padding to ensure the chart fits well
          height={320}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          animated={true}
          animationDuration={1000}
          onDataPointClick={handleDataPointClick}
        />

        {selectedData && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Selected: {selectedData.label} - {selectedData.value}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SalesReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',  // Light background behind the card
  },
  card: {
    
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 1,  // Ensure it is layered above other elements
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  infoContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
