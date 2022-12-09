// Import React and Component
import React, { useEffect, useState } from "react";
import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import NotificationTab from './Notification';    
import UploadTab from './Upload';
import TextTab from './TextTab';
import CalculateTab from './Calculate';

// import auth from "@react-native-firebase/auth";
import PushNotification from "react-native-push-notification";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {

  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Channel"
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#307ecc',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require('../images/home.png')}
                style={{ width: 30, height: 30 }} />
            ),
            tabBarLabel: () => { return null },
          }} />
        <Tab.Screen name="Notification" component={NotificationTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../images/bell.png')}
                style={{ width: 30, height: 30 }} />
            ),
            tabBarLabel: () => { return null },
          }} />
        <Tab.Screen name="Upload" component={UploadTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../images/upload.png')}
                style={{ width: 30, height: 30 }} />
            ),
            tabBarLabel: () => { return null },
          }} />
        <Tab.Screen name="Text" component={TextTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../images/upload1.png')}
                style={{ width: 30, height: 30 }} />
            ),
            tabBarLabel: () => { return null },
          }} />
        <Tab.Screen name="Calculate" component={CalculateTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../images/math.png')}
                style={{ width: 30, height: 30 }} />
            ),
            tabBarLabel: () => { return null },
          }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;