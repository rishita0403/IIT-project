import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
const { width, height } = Dimensions.get('window');

export default function MaternalGuideScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Maternal Guide</Text>

      <TouchableOpacity 
        style={[styles.card, styles.cardDiet]} 
        onPress={() => navigation.navigate('DietPlan')}
      >
        <Text style={styles.cardText}>Diet Plan</Text>
        <Image source={require('../assets/diet.png')} style={styles.cardImage} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, styles.cardYoga]} 
        onPress={() => navigation.navigate('YogaExercise')}
      >
        <View>
          <Text style={styles.cardText}>Yoga</Text>
          <Text style={styles.cardText}>and Exercises</Text>
        </View>
        <Image source={require('../assets/yoga.png')} style={styles.cardImage} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, styles.cardDosDonts]} 
        onPress={() => navigation.navigate('DosDonts')}
      >
        <Text style={styles.cardText}>Do’s and Don’ts</Text>
        <Image source={require('../assets/do.png')} style={styles.cardImage} />
      </TouchableOpacity>

      {/* Footer with icons */}
      <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="home-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('riskNumConceived')}>
        <Ionicons name="heart-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MaternalGuide')}>
        <Ionicons name="book-outline" size={25} color="black" />
        </TouchableOpacity>
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    height: 175,
  },
  cardDiet: {
    backgroundColor: '#FAB6CE', // Pink for Diet Plan
  },
  cardYoga: {
    backgroundColor: '#FFD4B3', // Orange for Yoga and Exercises
  },
  cardDosDonts: {
    backgroundColor: '#C4ECF6', // Light blue for Do’s and Don’ts
  },
  cardImage: {
    width: 170,
    height: 150,
    marginLeft: 'auto', // Pushes the image to the right
    borderRadius: 10,
  },
  cardText: {
    fontSize: 22,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    position: 'absolute',
    bottom: 8,
    width: width,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }
});
