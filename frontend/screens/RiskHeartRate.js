import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskHeartRate({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [HeartRate, setHeartRate] = useState(healthData.HeartRate || '');

  const handleNext = async () => {
    setHealthData({ ...healthData, HeartRate });
    navigation.navigate('RiskBodyTemp');
  };

  return (
    <View style={styles.container}>
      <Text>Heart Rate:</Text>
      <TextInput
        value={HeartRate}
        onChangeText={setHeartRate}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Next" onPress={handleNext} />
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
