import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
       <Navigation/> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FbFC',
  },
});

export default App;
