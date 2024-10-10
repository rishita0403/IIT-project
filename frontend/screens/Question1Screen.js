// import React, { useContext, useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { HealthContext } from '../context/HealthContext';

// export default function Question1Screen({ navigation }) {
//   const [healthData, setHealthData] = useContext(HealthContext);
//   const [numConceived, setNumConceived] = useState(healthData.numConceived || '');

//   const handleNext = () => {
//     setHealthData({ ...healthData, numConceived });
//     navigation.navigate('Question2');
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Number of times conceived:</Text>
//       <TextInput
//         value={numConceived}
//         onChangeText={setNumConceived}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <Button title="Next" onPress={handleNext} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 35,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,
//   },
// });
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { HealthContext } from '../context/HealthContext';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

export default function Question1Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [numConceived, setNumConceived] = useState('');
  const [deliveries, setDeliveries] = useState('');
  const [liveBirth, setLiveBirth] = useState('');
  const [abortion, setAbortion] = useState('');
  const [childDeath, setChildDeath] = useState('');
  const [state] = useContext(AuthContext);


  const handleSubmit = async () => {
    if (!numConceived || !deliveries || !liveBirth || !abortion || !childDeath) {
      Alert.alert('Missing Information', 'Please fill in all fields before proceeding.');
      return; // Exit the function if validation fails
    }
    // Update the HealthContext with the deliveries value
    setHealthData({ ...healthData, numConceived, deliveries, liveBirth, abortion, childDeath });

    try {
      // Store the updated values in the database
      await axios.put('/ques/update-details', {
        numConceived: numConceived,
        liveBirth: liveBirth,
        abortion: abortion,
        childDeath: childDeath,
        deliveries: deliveries,
      }, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });

      alert('All questions answered and data submitted!');
      navigation.navigate('HomeScreen'); // Navigate to the HomeScreen after submission
    } catch (error) {
      console.error('Error submitting data:', error.response ? error.response.data : error.message);
      alert('Error submitting data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>
          Enter values from <Text style={styles.headerTextBold}>your report</Text>
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelText}>Number of times conceived:</Text>
        <TextInput
          value={numConceived}
          onChangeText={setNumConceived}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of deliveries:</Text>
        <TextInput
          value={deliveries}
          onChangeText={setDeliveries}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of live births:</Text>
        <TextInput
          value={liveBirth}
          onChangeText={setLiveBirth}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of abortions:</Text>
        <TextInput
          value={abortion}
          onChangeText={setAbortion}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.labelText}>Number of child deaths:</Text>
        <TextInput
          value={childDeath}
          onChangeText={setChildDeath}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
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
    height: '23%',  // Take up the top part of the screen
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
    marginBottom: 100,
    marginTop: 40,
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
    alignItems: 'center',
    marginTop: 20,
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
    backgroundColor: '#a0d468',  // Green color for the next button
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
    color: '#000',  // Black text color for the button
    fontWeight: 'bold',
  },
});
