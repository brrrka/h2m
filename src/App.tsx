import React from 'react';
import { View, Text } from 'react-native';
import Main from './pages/main';
import PrototypeMain from './pages/main/prototype2';
import PrototypeGrafik from './pages/main/prototype1';

const App = () => {
  return (
    <View>
      {/* <Main /> */}
      {/* <PrototypeMain /> */}
      <PrototypeGrafik />
    </View>
  );
};

export default App;
