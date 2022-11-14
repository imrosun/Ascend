import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {SafeAreaView,  StyleSheet} from 'react-native';
import Navigation1 from '../../Navigation/Home';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View>
      <View>
        <Text style={{fontSize: 24, alignSelf: 'center', marginBottom: 1}}>Home, sweet home</Text>
      </View>
      <SafeAreaView style={styles.root}>
        <Navigation1 />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    
    backgroundColor: '#F9FbFC',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
});

export default HomeScreen;