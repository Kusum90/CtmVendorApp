import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 4, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft:265,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
});

export default SocialScreen;