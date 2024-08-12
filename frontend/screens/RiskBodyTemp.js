import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskBodyTemp({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [BodyTemp, setBodyTemp] = useState(healthData.BodyTemp || '');

  const handleSubmit = async () => {
    setHealthData({ ...healthData, BodyTemp });
    navigation.navigate('Prediction');
  };

  return (
    <View style={styles.container}>
      <Text>Body Temperature:</Text>
      <TextInput
        value={BodyTemp}
        onChangeText={setBodyTemp}
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
