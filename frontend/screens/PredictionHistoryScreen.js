import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function PredictionHistoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
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

  const renderCard = (label, labelsForChart, dataForChart, normalRange, chartWidth) => {
    const determineStatusColor = (value) => {
      if (value < normalRange[0]) {
        return 'red'; // Color for low
      } else if (value > normalRange[1]) {
        return 'red'; // Color for high
      }
      return 'green'; // Color for normal
    };
  
    const data = dataForChart();
    const labels = labelsForChart();
  
    const minData = Math.min(...data);
    const maxData = Math.max(...data);
    const chartHeight = 200; // Set the chart height
    const scaleFactor = maxData !== minData ? (151) / (maxData - minData) : 1; // Scale factor with safeguard
    const maxDataPoints = Math.min(data.length, 10); // Limit data points to a max of 10
    const spacingFactor = 1.16 * maxDataPoints; // Multiply the spacingFactor by the number of data points
    
    return (
      <View style={styles.card} key={label}>
        <Text style={styles.chartLabel}>{label}</Text>
        <ScrollView horizontal={true} style={styles.chartScrollView}>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels,
                datasets: [{
                  data,
                }],
              }}
              width={chartWidth}
              height={chartHeight}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
              }}
              style={styles.chart}
            />
            {data.map((value, index) => {
              const dotColor = determineStatusColor(value);
              const positionX = index * (chartWidth / (spacingFactor)); // Adjusted by spacingFactor multiplied by data points
              const positionY = maxData !== minData ? (value - minData) * scaleFactor : 0; // Handle uniform data
  
              return (
                <View
                  key={index}
                  style={{
                    position: 'absolute',
                    left: positionX + 58, // Center the dot horizontally (12 / 2)
                    bottom: positionY + 28, // Adjust height with safeguard
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: dotColor,
                    borderWidth: 2,
                    borderColor: '#fff',
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const chartWidth = Dimensions.get('window').width * 1.2;

  return (
    <View style={styles.wrapper}>
      {/* Buttons for navigation */}
      <View style={styles.topNavButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={[
            styles.navButton,
            route.name === 'History' && styles.activeButton,
          ]}
        >
          <Ionicons name="analytics-outline" size={25} color={'black'} />
          <Text style={styles.navButtonText}>Prediction History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RiskHistoryScreen')}
          style={[
            styles.navButton,
            route.name === 'RiskHistoryScreen' && styles.activeButton,
          ]}
        >
          <Ionicons name="alert-circle-outline" size={25} color={'black'} />
          <Text style={styles.navButtonText}>Risk History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          predictions.length === 0 ? (
            <Text style={styles.noPredictionsText}>No predictions found</Text>
          ) : (
            <>
              {renderCard("Systolic Blood Pressure", formatLabelsForChart, () => formatDataForChart('SystolicBP'), [90, 120], chartWidth)}
              {renderCard("Diastolic Blood Pressure", formatLabelsForChart, () => formatDataForChart('DiastolicBP'), [60, 80], chartWidth)}
              {renderCard("Glucose (RBS)", formatLabelsForChart, () => formatDataForChart('RBS'), [70, 140], chartWidth)}
              {renderCard("Respiration Rate", formatLabelsForChart, () => formatDataForChart('RR'), [12, 20], chartWidth)}
              {renderCard("Body Temperature", formatLabelsForChart, () => formatDataForChart('BodyTemp'), [97, 99], chartWidth)}
              {renderCard("Heart Rate", formatLabelsForChart, () => formatDataForChart('HeartRate'), [60, 100], chartWidth)}
              {renderCard("Hemoglobin (HB)", formatLabelsForChart, () => formatDataForChart('HB'), [12, 16], chartWidth)}
              {renderCard("HBA1C Level", formatLabelsForChart, () => formatDataForChart('HBA1C'), [4, 5.6], chartWidth)}
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
    fontWeight: 'bold'
  },
  noPredictionsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerButton: {
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 12,
    color: 'black',
  },
  card: {
    backgroundColor: '#FFF',
    marginVertical: 8,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  topNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  navButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  activeButton: {
    backgroundColor: '#E6EFF8', // Active button color
    borderColor: 'black',
  },
  activeButtonText: {
    color: 'white', // Active text color
  },
});

