# AuthenticationReference
Authentication app using react native cli

Installation of Dependencies
To install the dependencies open the terminal and jump into your project using
- cd ProjectName

For the React Native Firebase we need to install and setup the app module
-npm install @react-native-firebase/app --save

Now install the authentication module
-npm install @react-native-firebase/auth --save

That is enough for the Firebase Authentication but in this example we will also use React Navigation as we are going to switch the screens so install the following react-navigation dependencies also
- npm install @react-navigation/native --save

Other supporting libraries for react-navigation
-npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view --save
-npm install @react-navigation/stack --save

To Run the React Native App
Open the terminal again and jump into your project using.
-cd ProjectName

To run the project on an Android Virtual Device or on real debugging device
- react-native run-android
