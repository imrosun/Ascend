import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignButtons from '../../components/SocialSignInButtons';
import { NavigationContainerRefContext, useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const onConfirmPressed = data => {
        console.warn(data);
        navigation.navigate('Home');
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    const onResendPress = () => {
        console.warn('onResendPress');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>  
           <Text style={styles.title}>Confirm your email</Text>
           <CustomInput            
                placeholder={"Enter your confirmation code"} 
                value={code} 
                setValue={setCode}
            /> 
            <CustomButton text="Confirm" onPress={onConfirmPressed}/>

            <CustomButton text="Resend code" onPress={onSignInPressed} type="TERTIARY"/>
            <CustomButton text="Back to Sign In" onPress={onSignInPressed} type="TERTIARY"/>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
})
export default ConfirmEmailScreen;