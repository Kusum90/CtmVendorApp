import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';

const LocationPicker = ({ country, state, city, onChange }) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(country || '');
  const [selectedState, setSelectedState] = useState(state || '');
  const [selectedCity, setSelectedCity] = useState(city || '');

  // Fetch countries when the component mounts
  useEffect(() => {
    GetCountries()
      .then((countries) => {
        setCountryList(countries);
        // Set default country (India) if available
        const defaultCountry = countries.find((c) => c.name === 'India');
        if (defaultCountry) {
          setSelectedCountry(defaultCountry.id);
          onChange('country', defaultCountry.name); // Send name to parent
        }
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      GetState(selectedCountry)
        .then((states) => {
          setStateList(states);
          setSelectedState('');
          setCityList([]); // Clear cities when the country changes
          onChange('state', ''); // Reset state in parent
          onChange('city_town', ''); // Reset city in parent
        })
        .catch((error) => console.error('Error fetching states:', error));
    } else {
      setStateList([]);
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      GetCity(selectedCountry, selectedState)
        .then((cities) => {
          setCityList(cities);
          setSelectedCity('');
          onChange('city_town', ''); // Reset city in parent
        })
        .catch((error) => console.error('Error fetching cities:', error));
    } else {
      setCityList([]);
    }
  }, [selectedState]);

  return (
    <View>
      {/* Country Picker */}
      <Text style={styles.label}>Country</Text>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={(value) => {
          setSelectedCountry(value);
          const countryObj = countryList.find((c) => c.id === value);
          onChange('country', countryObj?.name || ''); // Send name to parent
        }}
        style={styles.picker}>
        <Picker.Item label="Select Country" value="" />
        {countryList.map((country) => (
          <Picker.Item key={country.id} label={country.name} value={country.id} />
        ))}
      </Picker>

      {/* State Picker */}
      <Text style={styles.label}>State</Text>
      <Picker
        selectedValue={selectedState}
        onValueChange={(value) => {
          setSelectedState(value);
          const stateObj = stateList.find((s) => s.id === value);
          onChange('state', stateObj?.name || ''); // Send name to parent
        }}
        style={styles.picker}>
        <Picker.Item label="Select State" value="" />
        {stateList.length > 0 ? (
          stateList.map((state) => (
            <Picker.Item key={state.id} label={state.name} value={state.id} />
          ))
        ) : (
          <Picker.Item label="No States Available" value="" />
        )}
      </Picker>

      {/* City Picker */}
      <Text style={styles.label}>City</Text>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(value) => {
          setSelectedCity(value);
          const cityObj = cityList.find((c) => c.id === value);
          onChange('city_town', cityObj?.name || ''); // Send name to parent
        }}
        style={styles.picker}>
        <Picker.Item label="Select City" value="" />
        {cityList.length > 0 ? (
          cityList.map((city) => (
            <Picker.Item key={city.id} label={city.name} value={city.id} />
          ))
        ) : (
          <Picker.Item label="No Cities Available" value="" />
        )}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default LocationPicker;
