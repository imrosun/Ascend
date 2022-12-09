// Import React and Component
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from "@react-native-firebase/auth";

let email = '';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log("user", JSON.stringify(user));
      setUser(user);
    });
    return subscriber;
  }, []);

  useEffect(() => {
    getUserId();
    getData();
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    email = await AsyncStorage.getItem('EMAIL');
    console.log("EmailFirst", email);
  };

  const getUserId = async () => {
    name = await AsyncStorage.getItem('NAME');
    console.log("Email in Notification", name)
  };

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

  const getData = () => {
    let tempData = [];
    
    const subscriber = firestore()
      .collection('Images')
      // .where("EMAIL", '==', email)
      .get()
      .then(querySnapshot => {
        console.log('Total photos: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
          console.log(
            'User ID: ' ,
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
        setViewData(tempData);
      });
      return () => subscriber();
  };

  return (
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
          <Text style={{ color: "black" }}>
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
      <View style={{flex: 1}}>
        <Text style={{color: 'black', textAlign: 'center', fontWeight: '400',
          alignItems: 'center', 
          borderBottomWidth: 0.3,
          width: '100%',
          color: "green",
          fontSize: 20,
          height: 30, 
          }}
          >Uploaded Image with their Text</Text>
        {viewData.length > 0 ? (
            <FlatList data={viewData}
                renderItem={({item, index}) => {
                    return (
                    <View
                        style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                        height: 250,
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        }}>
                            
                            <Text
                    style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                    color: 'black',
                  }}>
                  {item.caption}
                </Text>
                <Image source={{uri:item.image}} style={{width: '90%',
                    height: 200,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginBottom: 20,}}/>
                    </View>
                    );
                }}
                />
        ):(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>No Images Found</Text>
            </View>
        )}
    </View>
    </View>
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