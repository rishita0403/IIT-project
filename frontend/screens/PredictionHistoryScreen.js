import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function PredictionHistoryScreen() {
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        console.log('Requesting predictions for user:', state.user._id);
        const response = await axios.get(`/risk/predictions/${state.user._id}`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        console.log('Predictions fetched successfully:', response.data);

        // Sort predictions by date in descending order
        const sortedPredictions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPredictions(sortedPredictions);
      } catch (error) {
        console.error('Error fetching predictions:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [state.user._id, state.token]);

  const formatDataForChart = (parameter) => {
    return predictions.slice(0, 10).map(prediction => prediction[parameter]);
  };

  const formatLabelsForChart = () => {
    return predictions.slice(0, 10).map(prediction =>
      new Date(prediction.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
    );
  };

  const chartWidth = Dimensions.get('window').width * 1.2 - 40;

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Prediction History</Text>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          predictions.length === 0 ? (
            <Text>No predictions found</Text>
          ) : (
            <>
              {renderCard("Systolic Blood Pressure", formatLabelsForChart, formatDataForChart('SystolicBP'), chartWidth)}
              {renderCard("Diastolic Blood Pressure", formatLabelsForChart, formatDataForChart('DiastolicBP'), chartWidth)}
              {renderCard("Glucose (RBS)", formatLabelsForChart, formatDataForChart('RBS'), chartWidth)}
              {renderCard("Respiration Rate", formatLabelsForChart, formatDataForChart('RR'), chartWidth)}
              {renderCard("Body Temperature", formatLabelsForChart, formatDataForChart('BodyTemp'), chartWidth)}
              {renderCard("Heart Rate", formatLabelsForChart, formatDataForChart('HeartRate'), chartWidth)}
              {renderCard("Hemoglobin (HB)", formatLabelsForChart, formatDataForChart('HB'), chartWidth)}
              {renderCard("HBA1C Level", formatLabelsForChart, formatDataForChart('HBA1C'), chartWidth)}
            </>
          )
        )}
      </ScrollView>

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

const renderCard = (label, labelsForChart, dataForChart, chartWidth) => (
  <View style={styles.card} key={label}>
    <Text style={styles.chartLabel}>{label}</Text>
    <ScrollView horizontal={true} style={styles.chartScrollView}>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: labelsForChart(),
            datasets: [{ data: dataForChart }],
          }}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  </View>
);

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E6EFF8',
  },
  scrollViewContent: {
    paddingBottom: 10, // Adjust to leave space for the footer
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginVertical: 10,
    marginLeft: -16, // Move chart towards the left
  },
  chart: {
    borderRadius: 16,

  },
  chartLabel: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight:'bold'
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    position: 'relative',
    bottom: 0,
    width: width,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  chartScrollView: {
    marginBottom: 20,
  },
});
