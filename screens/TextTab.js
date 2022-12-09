import {View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
let email=" ";
let name=" ";

const TextTab = () => {
  const [caption, setCaption] = useState('');

  useEffect(() => {
    getFcmToken();
  
  }, []);

  const getFcmToken = async () => {
    name = await AsyncStorage.getItem('NAME');
    email = await AsyncStorage.getItem('EMAIL');
    console.log(email, name);
  };

  const saveText = async() => {
    firestore()
      .collection('Texts')
      .add({
        caption: caption,
        email: email,
        name: name,
      })
      .then(() => {
        console.log('Text added!');
        alert("Text added!");
      });
  }

  return (
    <ScrollView>
    <View style={{flex: 1, alignItems: 'center'}}>
    <View
    style={{
      width: '90%',
      alignSelf: 'center',
      marginTop: 20,
      borderColor: '#8e8e8e',
      borderRadius: 10,
      height: 150,
      borderWidth: 0.2,
      flexDirection: 'row',
    }}>
    <TextInput
      value={caption}
      onChangeText={txt => {
        setCaption(txt);
      }}
      placeholder="Your thoughts here..."
      placeholderTextColor="#8b9cb5"
      color="black"
      style={{width: '70%'}}
    />
    </View>
    <TouchableOpacity 
        style={{minWidth: 300,
          backgroundColor: "#7DE24E",
          borderWidth: 0,
          color: "#FFFFFF",
          height: 40,
          alignItems: "center",
          borderRadius: 30,
          marginLeft: 35,
          marginRight: 35,
          marginTop: 40,
          marginBottom: 25,
          backgroundColor: caption !== null ? '#ff6666' : 'gray',
          }} onPress={() => {
            if(caption !== ''){
              saveText();
            } else {
              alert("Please fill in with your thoughts")
            }
          }}>
        <Text style={{color: "#FFFFFF",
            paddingVertical: 10,
            fontSize: 16,
          }}>Save Text</Text>
      </TouchableOpacity>

      
  </View>
  
  </ScrollView>
  )
}

export default TextTab;