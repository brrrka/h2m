import { StyleSheet, Text, View, Button } from 'react-native'
import React, { Component, useState } from 'react'


const Counter = () => {
    const [number, setNumber] = useState(0);
    return (
        <View>
            <Text>{number}</Text>
            <Button title="Tambah" onPress={() => setNumber(number + 1)} />
        </View>
    )
}



const dinamis = () => {
    return (
        <View>
            <Text></Text>
            <Counter />
            <Counter />
        </View>
    )
}

export default dinamis

const styles = StyleSheet.create({})