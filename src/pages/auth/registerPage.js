import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Welcome from '../../component/welcomeComponent'

const RegisterPage = () => {
    return (
        <View>
            <Welcome title="Register" desc="Silahkan masukkan data-data yang diperlukan" />
        </View>
    )
}

export default RegisterPage

const styles = StyleSheet.create({})