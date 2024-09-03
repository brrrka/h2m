import React from 'react';
import { View, Text } from 'react-native';
import Main from './pages/main';
import PrototypeMain from './pages/main/prototype2';
import PrototypeGrafik from './pages/main/prototype1';
import ProfileForm from './pages/profile';
import Communication from './pages/latihan/communication';
import AuthPage from './pages/auth';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './pages/auth/landing';

const Stack = createNativeStackNavigator();

const App = () => {
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
      </Stack.Navigator>
    </NavigationContainer>

    // <View>
    // <LandingPage />
    //   {/* <Main /> */}
    // <AuthPage />
    //   {/* <LoginPage /> */}
    //   <RegisterPage />
    //   {/* <ProfileForm /> */}
    //   {/* <PrototypeMain /> */}
    //   {/* <PrototypeGrafik /> */}
    //   {/* <Communication /> */}
    // </View>
  );
};

export default App;
