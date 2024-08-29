import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logo from '../assets/logo.svg';

const welcomeComponent = ({ title, desc }) => {
    return (
        <View style={styles.welcome}>
            <Logo />
            <Text style={styles.welcomeText}>{title}</Text>
            <Text style={styles.welcomeDesc}>{desc}</Text>
        </View>
    );
}

export default welcomeComponent

const styles = StyleSheet.create({
    welcome: {
        alignItems: 'center',
        marginTop: 98,
    },
    welcomeText: {
        marginTop: 18,
        fontSize: 32,
        fontFamily: 'Nunito-ExtraBold',
        color: '#D15B46'
    },
    welcomeDesc: {
        color: '#F3816C',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
    },
})