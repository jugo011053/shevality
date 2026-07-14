import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedStackParamList, EntdeckenStackParamList, SicherStackParamList, RootTabParamList } from './types';
import { FeedScreen } from '../screens/FeedScreen';
import { StoryDetailScreen } from '../screens/StoryDetailScreen';
import { EntdeckenScreen } from '../screens/EntdeckenScreen';
import { MapScreen } from '../screens/MapScreen';
import { BusinessDetailScreen } from '../screens/BusinessDetailScreen';
import { SicherScreen } from '../screens/SicherScreen';
import { CustomTabBar } from '../components/CustomTabBar';

const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const EntdeckenStack = createNativeStackNavigator<EntdeckenStackParamList>();
const SicherStack = createNativeStackNavigator<SicherStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function FeedStackNavigator() {
  return (
    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name="FeedHome" component={FeedScreen} />
      <FeedStack.Screen name="StoryDetail" component={StoryDetailScreen} />
    </FeedStack.Navigator>
  );
}

function EntdeckenStackNavigator() {
  return (
    <EntdeckenStack.Navigator screenOptions={{ headerShown: false }}>
      <EntdeckenStack.Screen name="EntdeckenHome" component={EntdeckenScreen} />
      <EntdeckenStack.Screen name="EntdeckenMap" component={MapScreen} />
      <EntdeckenStack.Screen name="BusinessDetail" component={BusinessDetailScreen} />
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

export function RootNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={FeedStackNavigator} />
      <Tab.Screen name="Entdecken" component={EntdeckenStackNavigator} />
      <Tab.Screen name="Sicher" component={SicherStackNavigator} />
    </Tab.Navigator>
  );
}
