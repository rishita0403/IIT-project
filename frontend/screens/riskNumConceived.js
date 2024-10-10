import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { HealthContext } from '../context/HealthContext';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

export default function RiskNumConceived({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [state] = useContext(AuthContext);
  const [numConceived, setNumConceived] = useState('');
  const [deliveries, setDeliveries] = useState('');
  const [liveBirth, setLiveBirth] = useState('');
  const [abortion, setAbortion] = useState('');
  const [childDeath, setChildDeath] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/ques/details', {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        const user = response.data;
        setHealthData({
          ...healthData,
          numConceived: user.numConceived.toString(),
          deliveries: user.deliveries.toString(),
          liveBirth: user.liveBirth.toString(),
          abortion: user.abortion.toString(),
          childDeath: user.childDeath.toString()
        });
        setNumConceived(user.numConceived.toString());
        setDeliveries(user.deliveries.toString());
        setLiveBirth(user.liveBirth.toString());
        setAbortion(user.abortion.toString());
        setChildDeath(user.childDeath.toString());
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleNext = () => {
    setHealthData({ ...healthData, numConceived, deliveries, liveBirth, abortion, childDeath });
    navigation.navigate('RiskRBS');
  };

  const handleBack = () => {
    navigation.goBack();  // Navigate to the previous screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>
          Enter values from <Text style={styles.headerTextBold}>your report</Text>
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelText}>Number of times conceived:</Text>
        <TextInput
          value={numConceived}
          onChangeText={setNumConceived}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of deliveries:</Text>
        <TextInput
          value={deliveries}
          onChangeText={setDeliveries}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of live births:</Text>
        <TextInput
          value={liveBirth}
          onChangeText={setLiveBirth}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of abortions:</Text>
        <TextInput
          value={abortion}
          onChangeText={setAbortion}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of child deaths:</Text>
        <TextInput
          value={childDeath}
          onChangeText={setChildDeath}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe', // Light background color for the whole page
  },
  topContainer: {
    height: '25%',  // Take up the top part of the screen
    backgroundColor: '#fcd8df',  // Pastel pink color
    borderBottomLeftRadius: 40,  // Curved bottom edges
    borderBottomRightRadius: 40,  // Curved bottom edges
    justifyContent: 'center',  // Center the text vertically
    alignItems: 'center',  // Center the text horizontally
    paddingHorizontal: 20,  // Padding for the text
  },
  headerText: {
    fontSize: 35,
    color: '#333',
    textAlign: 'center',
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginBottom: 200,
    marginTop: 200,
  },
  labelText: {
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
    borderRadius: 20,  // Rounded edges for the input
    backgroundColor: '#fff',  // White background for input
    shadowColor: '#000',  // Shadow for input box
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,  // Android shadow effect
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#ff6f61',  // Red color for the back button
    borderRadius: 20,  // Rounded edges for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',  // Shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,  // Android shadow effect
  },
  nextButton: {
    backgroundColor: '#a0d468',  // Green color for the next button
    borderRadius: 20,  // Rounded edges for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',  // Shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,  // Android shadow effect
  },
  buttonText: {
    color: '#000',  // Black text color for the button
    fontWeight: 'bold',
  },
});
