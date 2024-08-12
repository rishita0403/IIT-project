import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskRR({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [RR, setRR] = useState(healthData.RR || '');

  const handleNext = async () => {
    setHealthData({ ...healthData, RR });
    navigation.navigate('RiskSystolicBP');
  };

  return (
    <View style={styles.container}>
      <Text>RR (Respiratory Rate):</Text>
      <TextInput
        value={RR}
        onChangeText={setRR}
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
