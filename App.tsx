import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import mila from './src/clearoff.jpeg';
import SampleComponent from './SampleComponent';
import Flexbox from './Flexbox'
import Function from './Function'

const App = () => {
  return(
    <View>
      <ScrollView>
      {/* <SampleComponent/>
      <StylingReactNativeComponent/> */}
      {/* <Flexbox/> */}
      <Function/>

      </ScrollView>
    </View>
  );
};

const StylingReactNativeComponent = () => {
  return (
    <View>
      <Text style={styles.text}>Test Hot Reaload</Text>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          borderWidth: 2,
          borderColor: 'red',
          marginTop: 20,
          marginLeft: 20,
        }}
      />
      <View style={{ height : 400, width: 200, borderColor:'yellow', backgroundColor: 'black', borderRadius:10, padding:60 }}>
        <Image source={ mila } style={{ width:80, height:100 }}/>
        <Text style={{ fontSize: 20, color: 'blue', fontWeight:100  }}>Kak Mila Cantik</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 20,
    marginTop: 40,
},
})

export default App;
