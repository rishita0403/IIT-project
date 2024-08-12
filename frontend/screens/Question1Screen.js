import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function Question1Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [numConceived, setNumConceived] = useState(healthData.numConceived || '');

  const handleNext = () => {
    setHealthData({ ...healthData, numConceived });
    navigation.navigate('Question2');
  };

  return (
    <View style={styles.container}>
      <Text>Number of times conceived:</Text>
      <TextInput
        value={numConceived}
        onChangeText={setNumConceived}
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
