import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function RiskRBS({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [RBS, setRBS] = useState(healthData.RBS || ''); // Retrieve from context or initialize
  const [HB, setHB] = useState(healthData.HB || '');
  const [HBA1C, setHBA1C] = useState(healthData.HBA1C || '');
  const [RR, setRR] = useState(healthData.RR || '');
  const [SystolicBP, setSystolicBP] = useState(healthData.SystolicBP || '');
  const [DiastolicBP, setDiastolicBP] = useState(healthData.DiastolicBP || '');
  const [HeartRate, setHeartRate] = useState(healthData.HeartRate || '');
  const [BodyTemp, setBodyTemp] = useState(healthData.BodyTemp || '');

  const handleNext = async () => {
    // Constraints for validation (you can adjust these values as needed)
    const constraints = {
      RBS: { min: 40, max: 200 },           // Random Blood Sugar range
      HB: { min: 5, max: 23 },             // Hemoglobin range
      HBA1C: { min: 2, max: 10 },            // Glycated Hemoglobin range
      RR: { min: 0, max: 32 },             // Respiratory Rate range
      SystolicBP: { min: 60, max: 150 },    // Systolic Blood Pressure range
      DiastolicBP: { min: 40, max: 100 },    // Diastolic Blood Pressure range
      HeartRate: { min: 40, max: 120 },     // Heart Rate range
      BodyTemp: { min: 95, max: 104 },       // Body Temperature range (in °C)
    };

    // Function to check if a value is within a valid range
    const isValid = (value, min, max) => value >= min && value <= max;

    // Validation logic
    if (
      !RBS.trim() || !HB.trim() || !HBA1C.trim() || !RR.trim() ||
      !SystolicBP.trim() || !DiastolicBP.trim() || !HeartRate.trim() || !BodyTemp.trim()
    ) {
      Alert.alert('All Fields Required', 'Please fill in all the fields before proceeding.');
      return;
    }

    if (
      !isValid(RBS, constraints.RBS.min, constraints.RBS.max) ||
      !isValid(HB, constraints.HB.min, constraints.HB.max) ||
      !isValid(HBA1C, constraints.HBA1C.min, constraints.HBA1C.max) ||
      !isValid(RR, constraints.RR.min, constraints.RR.max) ||
      !isValid(SystolicBP, constraints.SystolicBP.min, constraints.SystolicBP.max) ||
      !isValid(DiastolicBP, constraints.DiastolicBP.min, constraints.DiastolicBP.max) ||
      !isValid(HeartRate, constraints.HeartRate.min, constraints.HeartRate.max) ||
      !isValid(BodyTemp, constraints.BodyTemp.min, constraints.BodyTemp.max)
    ) {
      Alert.alert('Invalid Input', 'Please ensure all values are within their valid ranges.');
      return;
    }

    setHealthData({ ...healthData, RBS, HB, HBA1C, RR, SystolicBP, DiastolicBP, HeartRate, BodyTemp });
    navigation.navigate('Prediction');
  };

  const handleBack = () => {
    setHealthData({ ...healthData, RBS, HB, HBA1C, RR, SystolicBP, DiastolicBP, HeartRate, BodyTemp });
    navigation.goBack(); // Navigate to the previous screen
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.headerText}>
            Enter values from <Text style={styles.headerTextBold}>your report</Text>
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.labelText}>Random Blood Sugar:</Text>
          <TextInput
            value={RBS}
            onChangeText={setRBS}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.labelText}>Hemoglobin:</Text>
          <TextInput
            value={HB}
            onChangeText={setHB}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.labelText}>Glycated Hemoglobin:</Text>
          <TextInput
            value={HBA1C}
            onChangeText={setHBA1C}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.labelText}>Respiratory Rate:</Text>
          <TextInput
            value={RR}
            onChangeText={setRR}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.labelText}>Systolic Blood Pressure:</Text>
          <TextInput
            value={SystolicBP}
            onChangeText={setSystolicBP}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.labelText}>Diastolic Blood Pressure:</Text>
          <TextInput
            value={DiastolicBP}
            onChangeText={setDiastolicBP}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.labelText}>Heart Rate:</Text>
          <TextInput
            value={HeartRate}
            onChangeText={setHeartRate}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.labelText}>Body Temperature:</Text>
          <TextInput
            value={BodyTemp}
            onChangeText={setBodyTemp}
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe', // Light background color for the whole page
  },
  topContainer: {
    height: '19.2%',  // Take up the top part of the screen
    backgroundColor: '#fcd8df',  // Pastel pink color
    borderBottomLeftRadius: 40,  // Curved bottom edges
    borderBottomRightRadius: 40,  // Curved bottom edges
    justifyContent: 'center',  // Center the text vertically
    alignItems: 'center',  // Center the text horizontally
    paddingHorizontal: 20,  // Padding for the text
  },
  headerText: {
    fontSize: 35,
    color: '#333',
    textAlign: 'center',
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginBottom: 150,
    marginTop: 20,
  },
  labelText: {
    marginBottom: 8,
    color: '#555',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,  // Rounded edges for the input
    backgroundColor: '#fff',  // White background for input
    shadowColor: '#000',  // Shadow for input box
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,  // Android shadow effect
  },
  buttonContainer: {
    flexDirection: 'row',  // Align buttons side by side
    justifyContent: 'space-between',  // Space between buttons
  },
  backButton: {
    backgroundColor: '#ff6f61',  // Red color for the back button
    borderRadius: 20,  // Rounded edges for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',  // Shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,  // Android shadow effect
  },
  nextButton: {
    backgroundColor: '#3cb371',  // Green color for the next button
    borderRadius: 20,  // Rounded edges for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',  // Shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,  // Android shadow effect
  },
  buttonText: {
    color: '#fff',  // White text color for the buttons
    fontSize: 16,
    textAlign: 'center',
  },
});
