import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import logo from '../../../assets/images/login1.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        console.warn('Sign in');
        // validate user
        navigation.navigate('Home');
    };

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>  
           <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>

           <CustomInput            
                placeholder="Username" 
                value={username} 
                setValue={setUsername}
            />
           <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}
            />

            <CustomButton text="Sign In" onPress={onSignInPressed} />
            <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
            
            <SocialSignButtons/>

            <CustomButton text="Don't have an account? Create one" onPress={onSignUpPressed} type="TERTIARY"/>
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
    },
    logo :{
        width: '60%',
        maxWidth: 300,
        maxHeight: 100,    
    },
})
export default SignInScreen;