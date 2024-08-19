import React, {Component} from "react";
import {View, Text, TextInput, Image} from "react-native";

const SampleComponent = () => {
    return (
      <View>
        <View style={{width: 80, height: 40, backgroundColor: 'red'}} />
        <Text>Berka</Text>
        <Ganteng></Ganteng>
        <Photo />
        <TextInput style={{borderWidth: 1}} />
        <BoxPink />
      </View>
    );
  };
  
  const Ganteng = () => {
    return <Text>Ganteng Banget Sekali</Text>;
  };
  
  const Photo = () => {
    return (
      <Image
        source={{
          uri: 'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw',
        }}
        style={{width: 100, height: 100}}
      />
    );
  };
  
  class BoxPink extends Component {
    render() {
      return <Text>Ini component dari class</Text>;
    }
  }

  export default SampleComponent;