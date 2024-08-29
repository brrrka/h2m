import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Welcome from '../../component/welcomeComponent'

const LoginPage = () => {
    return (
        <View>
            <Welcome title="Login" desc="Silahkan Masukkan Kredensial" />
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({})