import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskRBS({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [RBS, setRBS] = useState(healthData.RBS || '');

  const handleNext = async () => {
    setHealthData({ ...healthData, RBS });
    navigation.navigate('RiskHB');
  };

  return (
    <View style={styles.container}>
      <Text>RBS (Random Blood Sugar):</Text>
      <TextInput
        value={RBS}
        onChangeText={setRBS}
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