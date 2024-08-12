import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function Question3Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [abortion, setAbortion] = useState(healthData.abortion || '');

  const handleNext = () => {
    setHealthData({ ...healthData, abortion });
    navigation.navigate('Question4');
  };

  return (
    <View style={styles.container}>
      <Text>Number of abortions:</Text>
      <TextInput
        value={abortion}
        onChangeText={setAbortion}
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
