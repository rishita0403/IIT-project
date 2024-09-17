import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/loginScreen';
import Question1Screen from './screens/Question1Screen';
import Question2Screen from './screens/Question2Screen';
import Question3Screen from './screens/Question3Screen';
import Question4Screen from './screens/Question4Screen';
import Question5Screen from './screens/Question5Screen';
import HomeScreen from './screens/HomeScreen';
import PredictionScreen from './screens/PredictionScreen';
import RiskAbortion from './screens/riskAbortion';
import RiskChildDeath from './screens/riskChildDeath';
import RiskDeliveries from './screens/riskDeliveries';
import RiskLiveBirth from './screens/riskLiveBirth';
import RiskNumConceived from './screens/riskNumConceived';
import RiskBodyTemp from './screens/RiskBodyTemp';
import RiskDiastolicBP from './screens/RiskDiastolicBP';
import RiskHB from './screens/RiskHB';
import RiskHBA1C from './screens/RiskHBA1C';
import RiskHeartRate from './screens/RiskHeartRate';
import RiskRBS from './screens/RiskRBS';
import RiskRR from './screens/RiskRR';
import RiskSystolicBP from './screens/RiskSystolicBP';
import PredictionHistoryScreen from './screens/PredictionHistoryScreen';
import MaternalGuideScreen from './screens/MaternalGuideScreen';
import DosDontsScreen from './screens/DosDontsScreen';
import YogaExerciseScreen from './screens/YogaExerciseScreen';
import DietPlanScreen from './screens/DietPlanScreen';
import { AuthProvider } from './context/authContext';
import { HealthProvider } from './context/HealthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{  
              headerStyle: { 
                backgroundColor: 'white', // Change to match your background color
              },  
              headerTintColor: '#333',  // Text color in the header
              headerTitleStyle: { fontWeight: 'bold' },  // Title styling
              headerTitleAlign: 'center', // Center the title
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="Question1" component={Question1Screen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="Question2" component={Question2Screen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="Question3" component={Question3Screen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="Question4" component={Question4Screen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="Question5" component={Question5Screen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="riskAbortion" component={RiskAbortion} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="riskChildDeath" component={RiskChildDeath} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="riskDeliveries" component={RiskDeliveries} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="riskLiveBirth" component={RiskLiveBirth} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="riskNumConceived" component={RiskNumConceived} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskBodyTemp" component={RiskBodyTemp} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskDiastolicBP" component={RiskDiastolicBP} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskHB" component={RiskHB} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskHBA1C" component={RiskHBA1C} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskHeartRate" component={RiskHeartRate} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskRBS" component={RiskRBS} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskRR" component={RiskRR} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="RiskSystolicBP" component={RiskSystolicBP} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="Prediction" component={PredictionScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="History" component={PredictionHistoryScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="MaternalGuide" component={MaternalGuideScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="DietPlan" component={DietPlanScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="YogaExercise" component={YogaExerciseScreen} options={{ title: 'Matri Care' }} />
            <Stack.Screen name="DosDonts" component={DosDontsScreen} options={{ title: 'Matri Care' }} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </HealthProvider>
    </AuthProvider>
  );
}
