import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GoogleLogo from '../assets/icons/googleLogo.svg'

const GoogleLoginComponent = ({ bgcolor }) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.horizontalLine} />
                <Text style={[styles.text, { backgroundColor: bgcolor }]}>
                    Atau Daftar Dengan
                </Text>
            </View>
            <GoogleButton />
        </View>
    )
}

const GoogleButton = () => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <GoogleLogo style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
        </View>
    )
}

export default GoogleLoginComponent

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    horizontalLine: {
        height: 2,
        backgroundColor: '#F5BFB5',
        width: '60%'
    },
    text: {
        color: '#F5BFB5',
        position: 'absolute',
        top: -10,
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        paddingHorizontal: 2
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#F5F5F5',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35 / 2,
        borderWidth: 0.1,
        elevation: 2
    }
})