import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedStackParamList, EntdeckenStackParamList, SicherStackParamList, RootTabParamList } from './types';
import { FeedScreen } from '../screens/FeedScreen';
import { GemerktScreen } from '../screens/GemerktScreen';
import { EntdeckenScreen } from '../screens/EntdeckenScreen';
import { MapScreen } from '../screens/MapScreen';
import { BusinessDetailScreen } from '../screens/BusinessDetailScreen';
import { SuggestScreen } from '../screens/SuggestScreen';
import { SicherScreen } from '../screens/SicherScreen';
import { NetworksScreen } from '../screens/NetworksScreen';
import { CustomTabBar } from '../components/CustomTabBar';
import { FLAGS } from '../config/flags';

const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const EntdeckenStack = createNativeStackNavigator<EntdeckenStackParamList>();
const SicherStack = createNativeStackNavigator<SicherStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function FeedStackNavigator() {
  return (
    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name="FeedHome" component={FeedScreen} />
      <FeedStack.Screen name="Gemerkt" component={GemerktScreen} />
    </FeedStack.Navigator>
  );
}

function EntdeckenStackNavigator() {
  return (
    <EntdeckenStack.Navigator screenOptions={{ headerShown: false }}>
      <EntdeckenStack.Screen name="EntdeckenHome" component={MapScreen} />
      <EntdeckenStack.Screen name="EntdeckenList" component={EntdeckenScreen} />
      <EntdeckenStack.Screen name="BusinessDetail" component={BusinessDetailScreen} />
      <EntdeckenStack.Screen name="Suggest" component={SuggestScreen} />
    </EntdeckenStack.Navigator>
  );
}

function SicherStackNavigator() {
  return (
    <SicherStack.Navigator screenOptions={{ headerShown: false }}>
      <SicherStack.Screen name="SicherHome" component={SicherScreen} />
    </SicherStack.Navigator>
  );
}

// Die eigentliche "drin"-App: Feed + Sicher sind immer da. Entdecken (Karte)
// und Netzwerke hängen hinter den Feature-Flags in src/config/flags.ts.
export function RootNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={FeedStackNavigator} />
      <Tab.Screen name="Sicher" component={SicherStackNavigator} />
      {FLAGS.SHOW_MAP && <Tab.Screen name="Entdecken" component={EntdeckenStackNavigator} />}
      {FLAGS.SHOW_NETWORKS && <Tab.Screen name="Netzwerke" component={NetworksScreen} />}
    </Tab.Navigator>
  );
}
