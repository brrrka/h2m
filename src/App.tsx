import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import Main from './pages/main';
import PrototypeMain from './pages/main/prototype2';
import PrototypeGrafik from './pages/main/prototype1';
import ProfileForm from './pages/profile';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './pages/auth/landing';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

const App = () => {
  // Request permission for notifications
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('User denied notification permissions');
    }
  };

  // Get FCM Token
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };

  // Handle permissions for Android 13 or higher
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      // Android 13 or higher
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Handle foreground messages
  const handleForegroundMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Handle the foreground notification here
    });

    return unsubscribe;
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
    requestNotificationPermission();

    // Handle messages when the app is in the foreground
    const unsubscribeForegroundMessages = handleForegroundMessages();

    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // Handle the background notification here
    });

    return () => {
      // Clean up the foreground message listener on unmount
      unsubscribeForegroundMessages();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileFormPage"
          component={ProfileForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainPage"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
