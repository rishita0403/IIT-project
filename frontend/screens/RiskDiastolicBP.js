import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskDiastolicBP({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [DiastolicBP, setDiastolicBP] = useState(healthData.DiastolicBP || '');

  const handleNext = async () => {
    setHealthData({ ...healthData, DiastolicBP });
    navigation.navigate('RiskHeartRate');
  };

  return (
    <View style={styles.container}>
      <Text>Diastolic Blood Pressure:</Text>
      <TextInput
        value={DiastolicBP}
        onChangeText={setDiastolicBP}
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
