import React from 'react';
import { View, Text } from 'react-native';
import Main from './pages/main';
import PrototypeMain from './pages/main/prototype2';
import PrototypeGrafik from './pages/main/prototype1';
import ProfileForm from './pages/profile';
import Communication from './pages/latihan/communication';
import AuthPage from './pages/auth';

const App = () => {
  return (
    <View>
      {/* <Main /> */}
      <AuthPage />
      {/* <ProfileForm /> */}
      {/* <PrototypeMain /> */}
      {/* <PrototypeGrafik /> */}

      {/* <Communication /> */}
    </View>
  );
};

export default App;
