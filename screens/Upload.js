import { View, Text, Button, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native'
import { Link } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

let name = '';
let email = '';

const Upload = ({navigation}) => {
  const [imageData, setImageData] = useState(null);
  const [caption, setCaption] = useState('');
  
  useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    name = await AsyncStorage.getItem('NAME');
    email = await AsyncStorage.getItem('EMAIL');

    console.log("EmailFirst", email, name);
  };

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };

  const uploadImage = async () => {
    // setModalVisible(true);
    // let id = uuid.v4();
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    const userId = await AsyncStorage.getItem('USERID');
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    firestore()
      .collection('Images')
      // .doc(id)
      .add({
        image: url,
        caption: caption,
        email: email,
        name: name,
        userId: userId,
        
      })
      .then(() => {
        console.log('Image added');
        alert("Image added, Please check your home");
        // navigation.goBack();
        // getAllTokens();
      })
      // .catch(error => {
      //   setModalVisible(false);
      // });
  };

  return (
    <ScrollView scrollEnabled={true}>
    <View style={{ alignItems: 'center'}}>
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
        {imageData !== null ? (
          
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={{flex: 1, width: '80%', height: 130, borderRadius: 10, margin: 10}}
          />
        ) : (
          <Image
            source={require('../images/image_icon.png')}
            style={{width: 50, height: 50, borderRadius: 10, margin: 10}}
          />
        )}
        <TextInput
          value={caption}
          onChangeText={txt => {
            setCaption(txt);
          }}
          placeholder="type Text here..."
          placeholderTextColor= "black"
          style={{width: '70%'}}
          color= "black"
          
        />
        
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          marginTop: 30,
          height: 50,
          borderBottomWidth: 0.2,
          borderBottomColor: '#8e8e8e',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          openCamera();
        }}>
        <Image
          source={require('../images/camera.png')}
          style={{width: 24, height: 24, marginLeft: 20}}
        />
        <Text style={{marginLeft: 20, color: 'black'}}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '100%',
          marginTop: 30,
          height: 50,
          borderBottomWidth: 0.2,
          borderBottomColor: '#8e8e8e',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          openGallery();
        }}>
        <Image
          source={require('../images/gallery.png')}
          style={{width: 24, height: 24, marginLeft: 20}}
        />
        <Text style={{marginLeft: 20, color: 'black'}}>Open Gallery</Text>
      </TouchableOpacity>
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
          backgroundColor: imageData !== null ? '#ff6666' : 'gray',
          }} onPress={() => {
            if(imageData !== null || caption !== ''){
              uploadImage();
            } else {
              alert("Please select an Image and Text")
            }
          }}>
        <Text style={{color: "#FFFFFF",
            paddingVertical: 10,
            fontSize: 16,
          }}>Upload Image</Text>
          
      </TouchableOpacity>
      
    </View>    
    </ScrollView>
    
  );
};

export default Upload