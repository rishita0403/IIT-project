import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { HealthContext } from '../context/HealthContext';
import { AuthContext } from '../context/authContext';

export default function Question5Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [state] = useContext(AuthContext);
  const [deliveries, setDeliveries] = useState(healthData.deliveries || '');

  const handleSubmit = async () => {
    // Update the HealthContext with the deliveries value
    setHealthData({ ...healthData, deliveries });

    try {
      // Store the updated values in the database
      await axios.put('/ques/update-details', {
        numConceived: healthData.numConceived,
        liveBirth: healthData.liveBirth,
        abortion: healthData.abortion,
        childDeath: healthData.childDeath,
        deliveries,
      }, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });

      alert('All questions answered and data submitted!');
      navigation.navigate('HomeScreen'); // Navigate to the HomeScreen after submission
    } catch (error) {
      console.error('Error submitting data:', error.response ? error.response.data : error.message);
      alert('Error submitting data');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Number of deliveries:</Text>
      <TextInput
        value={deliveries}
        onChangeText={setDeliveries}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
