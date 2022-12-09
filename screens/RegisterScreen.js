// Import React and Component
import React, { useEffect, useState, createRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import uuid from 'react-native-uuid';

const RegisterScreen = ({ navigation }) => {

  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = async () => {
    token = await messaging().getToken();
    console.log(token);
  };
  
  state = {
    isValid: null,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUserName] = useState("");
  const [errortext, setErrortext] = useState("");

  const emailInputRef = createRef();

  const saveData = () => {
    let id = uuid.v4();
    setErrortext("");
    if (!name) return alert("Please fill Name");
    if (!email) return alert("Please fill Email");
    var strongRegx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (password.length < 8 ) {
        return alert("Password should be atleast of 8 characters");
    }
    if(!strongRegx.test(password)) {
          alert("Password should contain atleast one number, one special character and one uppercase");
          return false;
      }
    if (!password) return alert("Please fill Address");
    firestore()
      .collection('Users')
      .doc(id)
      .set({
        email: email,
        password: password,
        name: name, 
        userId: id,       
      })
      .then(() => {
        console.log('User added!');
        navigation.goBack();
        saveLocalData();
      });
      auth()
      .createUserWithEmailAndPassword(
        email,
        password
      )
      .then((user) => {
        console.log(
          "Registration Successful. Please Login to proceed"
        );
        console.log(user);
        if (user) {
          auth()
            .currentUser.updateProfile({
              displayName: name,
              
            })
            .then(() => navigation.replace("HomeScreen"))
            .catch((error) => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrortext(
            "That email address is already in use!"
          );
        } else {
          setErrortext(error.message);
        }
      });
  };
  
  const saveLocalData = async () => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#307ecc" }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../images/register.png")}
            style={{
              width: "50%",
              height: 100,
              resizeMode: "contain",
              marginTop: 40,
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
        <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={name}
            onChangeText={txt => {
              setUserName(txt);
            }}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

        <View style={styles.sectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    value={email}
                    onChangeText={txt => {
                      setEmail(txt);
                    }}
                    underlineColorAndroid="#f000"
                    placeholder="Email"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      emailInputRef.current &&
                      emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
            </View>
            <View style={styles.sectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    value={password}
                    onChangeText={txt => {
                      setPassword(txt);
                    }}
                    underlineColorAndroid="#f000"
                    placeholder="Password"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      emailInputRef.current &&
                      emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    
                />
            </View>

          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext}{" "}
            </Text>
          ) : null} 
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={saveData}
          >
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
          
};
export default RegisterScreen;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#46D49A",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    height: 48,
    width: '80%',
    padding: 8,
    margin: 16,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
});