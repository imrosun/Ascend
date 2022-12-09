import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import PushNotification from "react-native-push-notification";

const Notification = () => {

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: "test-channel",
      title: "Hi, Merry Christmas and Happy New Year",
      message: "Thanks for using Ascend",
    })
  }

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Text>Notification</Text>
        <TouchableOpacity
          style={styles.roundButton}
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    marginTop: 500,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 20,
  },
})

export default Notification;
