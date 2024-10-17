import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';  // Import PaperProvider

import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/loginScreen';
import Question1Screen from './screens/Question1Screen';
import HomeScreen from './screens/HomeScreen';
import PredictionScreen from './screens/PredictionScreen';
import RiskNumConceived from './screens/RiskNumConceived';
import RiskRBS from './screens/RiskRBS';
import PredictionHistoryScreen from './screens/PredictionHistoryScreen';
import MaternalGuideScreen from './screens/MaternalGuideScreen';
import DosDontsScreen from './screens/DosDontsScreen';
import YogaExerciseScreen from './screens/YogaExerciseScreen';
import DietPlanScreen from './screens/DietPlanScreen';
import RiskHistoryScreen from './screens/RiskHistoryScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import HealthParametersScreen from './screens/HealthParametersScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import { AuthProvider } from './context/authContext';
import { HealthProvider } from './context/HealthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <PaperProvider>
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
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="riskNumConceived" component={RiskNumConceived} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="RiskRBS" component={RiskRBS} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="Prediction" component={PredictionScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="History" component={PredictionHistoryScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="MaternalGuide" component={MaternalGuideScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="DietPlan" component={DietPlanScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="YogaExercise" component={YogaExerciseScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="DosDonts" component={DosDontsScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="RiskHistoryScreen" component={RiskHistoryScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="HealthParametersScreen" component={HealthParametersScreen} options={{ title: 'Matri Care' }} />
              <Stack.Screen name="chatbot" component={ChatbotScreen} options={{ title: 'Matri Care' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </HealthProvider>
    </AuthProvider>
  );
}
