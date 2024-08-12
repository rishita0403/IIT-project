import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function riskNumConceived({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [deliveries, setDeliveries] = useState(healthData.deliveries || '');

  const handleNext = () => {
    setHealthData({ ...healthData, deliveries });
    navigation.navigate('riskLiveBirth');
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

