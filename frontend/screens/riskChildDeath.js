// import React, { useContext, useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { HealthContext } from '../context/HealthContext';

// export default function riskChildDeath({ navigation }) {
//   const [state] = useContext(AuthContext);
//   const [healthData, setHealthData] = useContext(HealthContext);

//   const [childDeath, setChildDeath] = useState('');

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get('/ques/details', {
//           headers: { Authorization: `Bearer ${state.token}` }
//         });
//         const user = response.data;
//         setHealthData({
//           ...healthData,
//           childDeath: user.childDeath.toString(),
//         });
//         setChildDeath(user.childDeath.toString());
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   const handleNext = async () => {
//     try {
//       await axios.put('/ques/update-details', {
//         childDeath,
//       }, {
//         headers: { Authorization: `Bearer ${state.token}` }
//       });
//       setHealthData({ ...healthData, childDeath });
      
//       navigation.navigate('RiskRBS'); 
//     } catch (error) {
//       console.error('Error updating user details:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Number of Child Deaths:</Text>
//       <TextInput
//         value={childDeath}
//         onChangeText={setChildDeath}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <Button title="Submit" onPress={handleNext} />
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
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { HealthContext } from '../context/HealthContext';
import { AuthContext } from '../context/authContext';

export default function Question5Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [state] = useContext(AuthContext);
  const [childDeath, setChildDeath] = useState(healthData.childDeath || '');

  const handleSubmit = async () => {
    // Update the HealthContext with the deliveries value
    setHealthData({ ...healthData, childDeath });

    try {
      // Store the updated values in the database
      await axios.put('/ques/update-details', {
        numConceived: healthData.numConceived,
        liveBirth: healthData.liveBirth,
        abortion: healthData.abortion,
        childDeath,
        deliveries: healthData.deliveries,
      }, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });

      alert('All questions answered and data submitted!');
      navigation.navigate('RiskRBS'); // Navigate to the HomeScreen after submission
    } catch (error) {
      console.error('Error submitting data:', error.response ? error.response.data : error.message);
      alert('Error submitting data');
    }
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
      <Button title="Next" onPress={handleSubmit} />
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
