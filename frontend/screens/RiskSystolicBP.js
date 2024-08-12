import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskSystolicBP({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [SystolicBP, setSystolicBP] = useState(healthData.SystolicBP || '');

  const handleNext = async () => {
    setHealthData({ ...healthData, SystolicBP });
    navigation.navigate('RiskDiastolicBP');
  };

  return (
    <View style={styles.container}>
      <Text>Systolic Blood Pressure:</Text>
      <TextInput
        value={SystolicBP}
        onChangeText={setSystolicBP}
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
