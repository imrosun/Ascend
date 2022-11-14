import React from 'react';
import {View, Image} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import Splash from '../../../assets/images/login1.jpg';

const Stack = createNativeStackNavigator();

function SplashScreen({navigation}){
    setTimeout(() => {
        navigation.replace('SignIn');
    }, 3000);
    return(
        <View style={styles.root}>
        <Image source={Splash}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"  
        />
        </View>
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashSc' screenOptions={{headerShown: false}}>
                <Stack.Screen name="SplashSc" component={SplashScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
      },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
    },
});
export default Navigation;