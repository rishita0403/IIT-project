import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { HealthContext } from '../context/HealthContext';

export default function PredictionScreen({ navigation }) {
  const [state] = useContext(AuthContext);
  const [healthData] = useContext(HealthContext);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to calculate age based on dob
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const getPrediction = async () => {
      try {
        // Calculate age from DOB
        const age = calculateAge(state.user.dob);

        const response = await axios.post('https://471c-103-240-237-181.ngrok-free.app/predict', {
          RBS: healthData.RBS,
          abortion: healthData.abortion,
          HB: healthData.HB,
          numConceived: healthData.numConceived,
          HBA1C: healthData.HBA1C,
          RR: healthData.RR,
          Age: age,
          deliveries: healthData.deliveries,
          liveBirth: healthData.liveBirth,
          SystolicBP: healthData.SystolicBP,
          DiastolicBP: healthData.DiastolicBP,
          childDeath: healthData.childDeath,
          HeartRate: healthData.HeartRate,
          BodyTemp: healthData.BodyTemp,
        }, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        // Update the risk state with the prediction result
        setRisk(response.data.risk);

        // Store the risk parameters and prediction result in the database
        await axios.post('/risk/store-risk-check', {
          userId: state.user._id,
          RBS: healthData.RBS,
          HB: healthData.HB,
          HBA1C: healthData.HBA1C,
          RR: healthData.RR,
          SystolicBP: healthData.SystolicBP,
          DiastolicBP: healthData.DiastolicBP,
          HeartRate: healthData.HeartRate,
          BodyTemp: healthData.BodyTemp,
          risk: response.data.risk,
        }, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

      } catch (error) {
        console.error('Error fetching prediction:', error);
        alert('Error fetching prediction');
      } finally {
        setLoading(false);
      }
    };

    getPrediction();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : risk !== null ? (
        <Text style={styles.resultText}>
          Risk Level: {risk === 0 ? 'No Risk' : 'High Risk'}
        </Text>
      ) : (
        <Text style={styles.errorText}>Error fetching prediction result</Text>
      )}
      <Button title="Back to Home" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
});
