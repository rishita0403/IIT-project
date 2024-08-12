import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskHB({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [HB, setHB] = useState(healthData.HB || '');

  const handleNext = async () => {
    setHealthData({ ...healthData, HB });
    navigation.navigate('RiskHBA1C');
  };

  return (
    <View style={styles.container}>
      <Text>HB (Hemoglobin):</Text>
      <TextInput
        value={HB}
        onChangeText={setHB}
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
