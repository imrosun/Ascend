import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const Home = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
           
        >
        <Tab.Screen name="SignIn" component={SignInScreen} />
            <Tab.Screen name="SignUp" component={SignUpScreen} />
        </Tab.Navigator>
    )
}
export default Home;