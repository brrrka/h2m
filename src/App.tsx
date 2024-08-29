import React from 'react';
import { View, Text } from 'react-native';
import Main from './pages/main';
import PrototypeMain from './pages/main/prototype2';
import PrototypeGrafik from './pages/main/prototype1';
import ProfileForm from './pages/profile';
import Communication from './pages/latihan/communication';
import AuthPage from './pages/auth';
import LoginPage from './pages/auth/registerPage';
import RegisterPage from './pages/auth/loginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <View>
    //   {/* <Main /> */}
    <AuthPage />
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
