import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function PersonalInfoScreen({ navigation }) {
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    phone: '',
    dob: '',
  });
  const [loading, setLoading] = useState(true);
  const [state] = useContext(AuthContext); // Access token and user data from context

  // Helper function to format date from YYYY-MM-DD to DD-MM-YY
  const formatDateToDisplay = (dob) => {
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  // Helper function to format date from DD-MM-YY to YYYY-MM-DD (for updating purposes)
  const formatDateToBackend = (dob) => {
    const [day, month, year] = dob.split('-');
    return `${year}-${month}-${day}`; // Assuming the year is 20XX
  };

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(`/ques/details`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setPersonalDetails({
          name: response.data.name,
          phone: response.data.phone,
          dob: formatDateToDisplay(response.data.dob),
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching personal details:', error);
        Alert.alert('Error', 'Could not fetch personal details');
      }
    };

    fetchPersonalDetails();
  }, [state.user._id, state.token]);

  const handleUpdate = async () => {
    try {
      const updatedDetails = {
        ...personalDetails,
        dob: formatDateToBackend(personalDetails.dob),
      };

      await axios.put(`/auth/user/${state.user._id}`, updatedDetails, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      Alert.alert('Success', 'Personal details updated successfully');
      navigation.goBack(); // Navigate back after updating
    } catch (error) {
      console.error('Error updating personal details:', error);
      Alert.alert('Error', 'Could not update personal details');
    }
  };

  const handleChange = (field, value) => {
    setPersonalDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>Update <Text style={styles.headerBold}>Personal Information</Text></Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={personalDetails.name}
          onChangeText={(text) => handleChange('name', text)}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={personalDetails.phone}
          onChangeText={(text) => handleChange('phone', text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Date of Birth (DD-MM-YY)</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD-MM-YY)"
          value={personalDetails.dob}
          onChangeText={(text) => handleChange('dob', text)}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe', // Light background color for the whole page
  },
  topContainer: {
    height: 190, // Adjusted height for the top container
    backgroundColor: '#fcd8df', // Light teal color
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  headerBold: {
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  label: {
    marginBottom: 8,
    color: '#555',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: '#a0d468', // Light coral color for the button
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
