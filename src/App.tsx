import React from 'react';
import { View, Text } from 'react-native';
import Main from './pages/main';
import PrototypeMain from './pages/main/prototype2';
import PrototypeGrafik from './pages/main/prototype1';
import Authentication from './pages/auth';

const App = () => {
  return (
    <View>
      {/* <Main /> */}
      {/* <PrototypeMain /> */}
      {/* <PrototypeGrafik /> */}
      <Authentication />
    </View>
  );
};

export default App;
