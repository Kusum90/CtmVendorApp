import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {GetCountries, GetState, GetCity} from 'react-country-state-city';

const LocationPicker = ({country, state, city, onChange}) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    GetCountries().then(setCountryList);
  }, []);

  useEffect(() => {
    if (country) GetState(country).then(setStateList);
  }, [country]);

  useEffect(() => {
    if (state) GetCity(country, state).then(setCityList);
  }, [state]);

  return (
    <View>
      <Text style={styles.label}>Country</Text>
      <Picker
        selectedValue={country}
        onValueChange={(value) => {
          onChange('country', value);
          onChange('state_country', '');
          onChange('city_town', '');
        }}
        style={styles.picker}>
        <Picker.Item label="Select Country" value="" />
        {countryList.map((country) => (
          <Picker.Item key={country.id} label={country.name} value={country.name} />
        ))}
      </Picker>

      <Text style={styles.label}>State</Text>
      <Picker
        selectedValue={state}
        onValueChange={(value) => {
          onChange('state_country', value);
          onChange('city_town', '');
        }}
        style={styles.picker}>
        <Picker.Item label="Select State" value="" />
        {stateList.map((state) => (
          <Picker.Item key={state.id} label={state.name} value={state.name} />
        ))}
      </Picker>

      <Text style={styles.label}>City</Text>
      <Picker
        selectedValue={city}
        onValueChange={(value) => onChange('city_town', value)}
        style={styles.picker}>
        <Picker.Item label="Select City" value="" />
        {cityList.map((city) => (
          <Picker.Item key={city.id} label={city.name} value={city.name} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {fontSize: 16, fontWeight: '600', marginBottom: 5},
  picker: {height: 50, backgroundColor: '#fff', borderRadius: 5, marginBottom: 10},
});

export default LocationPicker;
