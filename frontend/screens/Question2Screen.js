import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function Question2Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [liveBirth, setLiveBirth] = useState(healthData.liveBirth || '');

  const handleNext = () => {
    setHealthData({ ...healthData, liveBirth });
    navigation.navigate('Question3');
  };

  return (
    <View style={styles.container}>
      <Text>Number of live births:</Text>
      <TextInput
        value={liveBirth}
        onChangeText={setLiveBirth}
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
