import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { LandingScreen } from '../screens/onboarding/LandingScreen';
import { ConsentScreen } from '../screens/onboarding/ConsentScreen';
import { QuestionnaireScreen } from '../screens/onboarding/QuestionnaireScreen';
import { ResultScreen } from '../screens/onboarding/ResultScreen';
import { RegisterScreen } from '../screens/onboarding/RegisterScreen';
import { RootNavigator } from './RootNavigator';
import { useOnboarding } from '../state/OnboardingState';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Gate vor der eigentlichen App: Landing → Consent → Fragebogen → Ergebnis →
// Registrierung → MainTabs. Wer die App schon einmal durchlaufen hat
// (completedOnboarding, lokal gespeichert), startet beim nächsten Öffnen
// direkt bei MainTabs.
export function AppRoot() {
  const { hydrated, completedOnboarding } = useOnboarding();
  if (!hydrated) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={completedOnboarding ? 'MainTabs' : 'Landing'}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={RootNavigator} />
    </Stack.Navigator>
  );
}
