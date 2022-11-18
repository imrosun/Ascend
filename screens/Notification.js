import { View, Text,  StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import PushNotification from "react-native-push-notification";

const Notification = () => {

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: "test-channel",
      title: "Hi, have a great day",
      message: "Thanks for using Bazinga!",
    })
  }

  return (
    <SafeAreaView>
    <View>
      <Text>Notification</Text>
      <TouchableOpacity 
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleNotification}
        >
       <Text style={styles.buttonTextStyle}>
          Click here to notify
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: "red",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "red",
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
})   

export default Notification;
