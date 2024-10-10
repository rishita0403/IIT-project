import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import BarIndicator from '../components/BarIndicator'; // Import the BarIndicator component
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RiskHistoryScreen({ userId }) {
  const navigation = useNavigation();
  const route = useRoute();
  const [riskPredictions, setRiskPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [state] = useContext(AuthContext);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`/risk/predictions/${state.user._id}`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setRiskPredictions(response.data.slice(0, 10)); // Limit to the last 10 records
        setLoading(false);
      } catch (error) {
        console.error('Error fetching risk predictions:', error);
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [userId]);

  const togglePredictionDetails = (id) => {
    if (selectedPrediction === id) {
      setSelectedPrediction(null);
    } else {
      setSelectedPrediction(id);
    }
  };

  const renderPredictionItem = ({ item }) => {
    // Abnormal and normal parameters arrays
    const abnormalParameters = [];
    const normalParameters = [];

    // Systolic BP: Normal ≤ 120 mmHg
    if (item.SystolicBP > 120 || item.SystolicBP < 90) {
      abnormalParameters.push(
        <BarIndicator
          key="systolic"
          label="Systolic BP"
          currentValue={item.SystolicBP}
          minAcceptable={90}
          maxAcceptable={120}
          minValue={60}
          maxValue={150}
        />
      );
    } else {
      normalParameters.push(`Systolic BP: ${item.SystolicBP} mmHg`);
    }

    // Diastolic BP: Normal ≤ 80 mmHg
    if (item.DiastolicBP > 80 || item.DiastolicBP < 60) {
      abnormalParameters.push(
        <BarIndicator
          key="diastolic"
          label="Diastolic BP"
          currentValue={item.DiastolicBP}
          minAcceptable={60}
          maxAcceptable={80}
          minValue={40}
          maxValue={100}
        />
      );
    } else {
      normalParameters.push(`Diastolic BP: ${item.DiastolicBP} mmHg`);
    }

    // RBS: Normal ≤ 140 mg/dL
    if (item.RBS > 140 || item.RBS < 70) {
      abnormalParameters.push(
        <BarIndicator
          key="rbs"
          label="RBS"
          currentValue={item.RBS}
          minAcceptable={70}
          maxAcceptable={140}
          minValue={40}
          maxValue={170}
        />
      );
    } else {
      normalParameters.push(`RBS: ${item.RBS} mg/dL`);
    }

    // HBA1C: Normal ≤ 6.5%
    if (item.HBA1C > 5.6 || item.HBA1C < 4.0) {
      abnormalParameters.push(
        <BarIndicator
          key="hba1c"
          label="HbA1C"
          currentValue={item.HBA1C}
          minAcceptable={4.0}
          maxAcceptable={5.6}
          minValue={2.0}
          maxValue={10.0}
        />
      );
    } else {
      normalParameters.push(`HbA1C: ${item.HBA1C}%`);
    }

    // Heart Rate: Normal 60-100 bpm
    if (item.HeartRate < 60 || item.HeartRate > 100) {
      abnormalParameters.push(
        <BarIndicator
          key="heartRate"
          label="Heart Rate"
          currentValue={item.HeartRate}
          minAcceptable={60}
          maxAcceptable={100}
          minValue={40}
          maxValue={120}
        />
      );
    } else {
      normalParameters.push(`Heart Rate: ${item.HeartRate} bpm`);
    }

    // Body Temperature: Normal 36.5°C - 37.5°C
    if (item.BodyTemp < 97 || item.BodyTemp > 99) {
      abnormalParameters.push(
        <BarIndicator
          key="bodyTemp"
          label="Body Temperature"
          currentValue={item.BodyTemp}
          minAcceptable={97}
          maxAcceptable={99}
          minValue={95}
          maxValue={104}
        />
      );
    } else {
      normalParameters.push(`Body Temperature: ${item.BodyTemp}°C`);
    }

    // Respiratory Rate: Normal 12-20 breaths per minute
    if (item.RR < 12 || item.RR > 20) {
      abnormalParameters.push(
        <BarIndicator
          key="respRate"
          label="Respiratory Rate"
          currentValue={item.RR}
          minAcceptable={12}
          maxAcceptable={20}
          minValue={0}
          maxValue={32}
        />
      );
    } else {
      normalParameters.push(`Respiratory Rate: ${item.RR} breaths/min`);
    }

    // Hemoglobin: Normal 13.5 - 17.5 g/dL for men, 12 - 15.5 g/dL for women
    if (item.HB < 12 || item.HB > 16) {
      abnormalParameters.push(
        <BarIndicator
          key="hemoglobin"
          label="Hemoglobin"
          currentValue={item.HB}
          minAcceptable={12}
          maxAcceptable={16}
          minValue={5}
          maxValue={23}
        />
      );
    } else {
      normalParameters.push(`Hemoglobin: ${item.HB} g/dL`);
    }

    const isHighRisk = String(item.risk).toLowerCase() === 'high' || item.risk === 1;

    // Render the prediction card
    return (
      <TouchableOpacity onPress={() => togglePredictionDetails(item._id)} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          <Text style={[styles.riskText, isHighRisk ? styles.highRisk : styles.lowRisk]}>
            {isHighRisk ? 'High Risk' : 'No Risk'}
          </Text>
        </View>

        {/* Display Abnormal Parameters */}
        {selectedPrediction === item._id && (
          <View style={styles.details}>
            {/* Display Normal Parameters */}
            {normalParameters.length > 0 && (
              <>
                <Text style={styles.detailsHeader}>Normal Parameters:</Text>
                {normalParameters.map((param, index) => (
                  <Text key={index} style={styles.detailText}>
                    {param}
                  </Text>
                ))}
              </>
            )}
            {abnormalParameters.length > 0 && (
              <>
                <Text style={styles.detailsHeader}>Abnormal Parameters:</Text>
                {abnormalParameters}
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Buttons for navigation */}
      <View style={styles.topNavButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={[styles.navButton, route.name === 'History' && styles.activeButton]}>
          <Ionicons name="analytics-outline" size={25} color={'black'} />
          <Text style={styles.navButtonText}>Prediction History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RiskHistoryScreen')}
          style={[styles.navButton, route.name === 'RiskHistoryScreen' && styles.activeButton]}>
          <Ionicons name="alert-circle-outline" size={25} color={'black'} />
          <Text style={styles.navButtonText}>Risk History</Text>
        </TouchableOpacity>
      </View>

      {riskPredictions.length === 0 ? (
        <Text style={styles.noPredictionsText}>No predictions available.</Text>
      ) : (
        <FlatList
          data={riskPredictions}
          renderItem={renderPredictionItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EFF8',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPredictionsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPredictionsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
    marginHorizontal:10,
    
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  riskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  highRisk: {
    color: 'red',
  },
  lowRisk: {
    color: 'green',
  },
  details: {
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: 'red',
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 3,
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
