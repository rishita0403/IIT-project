import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskHBA1C({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [HBA1C, setHBA1C] = useState(healthData.HBA1C || '');

  const handleNext = async () => {
    setHealthData({ ...healthData, HBA1C });
    navigation.navigate('RiskRR');
  };

  return (
    <View style={styles.container}>
      <Text>HBA1C (Glycated Hemoglobin):</Text>
      <TextInput
        value={HBA1C}
        onChangeText={setHBA1C}
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
