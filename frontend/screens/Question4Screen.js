import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function Question4Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [childDeath, setChildDeath] = useState(healthData.childDeath || '');

  const handleNext = () => {
    setHealthData({ ...healthData, childDeath });
    navigation.navigate('Question5');
  };

  return (
    <View style={styles.container}>
      <Text>Number of child deaths:</Text>
      <TextInput
        value={childDeath}
        onChangeText={setChildDeath}
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
