// screens/SignupScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobText, setDobText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      await axios.post('/auth/signup', { name, phone, password, dob });
      alert('User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowPicker(false);
    setDob(currentDate);
    setDobText(currentDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <View style={styles.datePickerContainer}>
        <TextInput
          placeholder="Date of Birth"
          value={dobText}
          style={styles.dateInput}
          editable={false}
        />
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
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
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
});
