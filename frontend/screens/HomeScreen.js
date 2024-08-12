import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext';

const HomeScreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://example.com/your-image-url.jpg' }} 
          style={styles.profileImage} 
        />
        <View style={styles.iconsContainer}>
          <Ionicons name="happy-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" style={{ marginLeft: 10 }} />
        </View>
      </View>
      <Text style={styles.greeting}>Good Morning,</Text>
      <Text style={styles.username}>{state.user ? state.user.name : ''}!</Text>
      
      <View style={styles.grid}>
        <TouchableOpacity 
          style={[styles.card, styles.card1]}
          onPress={() => navigation.navigate('riskNumConceived')}
        >
          <Text style={styles.cardText}>Track your health with AI</Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.card2]}>
          <Text style={styles.cardText}>Community</Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.card3]}>
          <Text style={styles.cardText}>Refer the Maternal Guide</Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.card, styles.card4]}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Text style={styles.cardText}>Ask MomBuddy anything!</Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Ionicons name="heart-outline" size={24} color="black" />
        <Ionicons name="people-outline" size={24} color="black" />
        <Ionicons name="book-outline" size={24} color="black" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EFF8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 150,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  card1: {
    backgroundColor: '#D0E1FF',
  },
  card2: {
    backgroundColor: '#FFECB3',
  },
  card3: {
    backgroundColor: '#D1F2EB',
  },
  card4: {
    backgroundColor: '#FDEDEC',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    backgroundColor: '#D0E1FF',
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default HomeScreen;
