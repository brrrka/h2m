import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import mila from './src/clearoff.jpeg'

const Fungsi = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bingkai}>
        <Image source={mila} style={styles.fotomila}></Image>
      </View>
        <Text>Kak Mila</Text>
    </View>
  )
}

export default Fungsi;

const styles = StyleSheet.create({
    wrapper: {padding: 20, alignItems: 'center'},
    fotomila: {width: 100, height: 100,borderRadius: 50},
    bingkai: {
        borderWidth: 2,
        borderColor: 'black',
        width: 140,
        height:140,
        borderRadius: 140 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'blue'
    }
});