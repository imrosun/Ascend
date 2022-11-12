// import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView,  StyleSheet} from 'react-native';

import Navigation from './src/Navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      {/* <SignInScreen />   */}
      {/* <SignUpScreen/> */}
      {/* <ConfirmEmailScreen/> */}
      {/* <ForgotPasswordScreen/> */}
      {/* <NewPasswordScreen/> */}
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
