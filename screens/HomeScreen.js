// Import React and Component
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationTab from './Notification';
import UploadTab from './Upload';
import TextTab from './TextTab';
import CalculateTab from './Calculate';

import auth from "@react-native-firebase/auth";
import PushNotification from "react-native-push-notification";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log("user", JSON.stringify(user));
      setUser(user);
    });

    return subscriber;
  }, []);

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

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.replace("Auth"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("Auth");
                else alert(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "green",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Firebase Auth
          </Text>
          {user ? (
            <Text style={{color: "black"}}>
              Welcome{" "}
              {user.displayName ? user.displayName : user.email}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'HomeScreen') {
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
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Notification" component={NotificationTab} />
        <Tab.Screen name="Upload" component={UploadTab} />
        <Tab.Screen name="Text" component={TextTab} />
        <Tab.Screen name="Calculate" component={CalculateTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});