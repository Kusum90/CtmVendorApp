import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

const SocialScreen = () => {
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [googlePlus, setGooglePlus] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [pinterest, setPinterest] = useState('');

  const handleSave = () => {
    console.log('Saved Social Info', {
      twitter,
      facebook,
      instagram,
      youtube,
      linkedin,
      googlePlus,
      snapchat,
      pinterest,
    });
    // Implement saving logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Social</Text>
      </View>

      {/* Card for Form */}
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Twitter</Text>
          <TextInput
            style={styles.input}
            placeholder="Twitter Handler"
            value={twitter}
            onChangeText={setTwitter}
          />

          <Text style={styles.label}>Facebook</Text>
          <TextInput
            style={styles.input}
            placeholder="Facebook Handler"
            value={facebook}
            onChangeText={setFacebook}
          />

          <Text style={styles.label}>Instagram</Text>
          <TextInput
            style={styles.input}
            placeholder="Instagram Username"
            value={instagram}
            onChangeText={setInstagram}
          />

          <Text style={styles.label}>YouTube</Text>
          <TextInput
            style={styles.input}
            placeholder="YouTube Channel Name"
            value={youtube}
            onChangeText={setYoutube}
          />

          <Text style={styles.label}>LinkedIn</Text>
          <TextInput
            style={styles.input}
            placeholder="LinkedIn Username"
            value={linkedin}
            onChangeText={setLinkedin}
          />

          <Text style={styles.label}>Google Plus</Text>
          <TextInput
            style={styles.input}
            placeholder="Google Plus Profile ID"
            value={googlePlus}
            onChangeText={setGooglePlus}
          />

          <Text style={styles.label}>Snapchat</Text>
          <TextInput
            style={styles.input}
            placeholder="Snapchat ID"
            value={snapchat}
            onChangeText={setSnapchat}
          />

          <Text style={styles.label}>Pinterest</Text>
          <TextInput
            style={styles.input}
            placeholder="Pinterest Username"
            value={pinterest}
            onChangeText={setPinterest}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wp(4), // Responsive padding
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(4), // Responsive padding
    borderRadius: wp(2.5), // Responsive borderRadius
    elevation: 4, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: hp(0.25) }, // Responsive shadowOffset
    shadowOpacity: 0.25,
    shadowRadius: wp(1), // Responsive shadowRadius
    marginBottom: hp(2.5), // Responsive marginBottom
  },
  heading: {
    fontSize: FontSize(18), // Responsive font size
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    marginBottom: hp(2.5), // Responsive marginBottom
  },
  label: {
    fontSize: FontSize(14), // Responsive font size
    color: '#000',
    marginBottom: hp(0.6), // Responsive marginBottom
  },
  input: {
    borderWidth: wp(0.3), // Responsive borderWidth
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(2.5), // Responsive padding
    marginBottom: hp(2), // Responsive marginBottom
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5), // Responsive padding
    borderRadius: wp(2), // Responsive borderRadius
    alignItems: 'center',
    marginLeft: wp(65), // Responsive marginLeft
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FontSize(16), // Responsive font size
  },
});

export default SocialScreen;