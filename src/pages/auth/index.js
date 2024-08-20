import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Logo from '../../assets/logo.svg'

const Authentication = () => {
    return (
        <View style={styles.logo}>
            <ScrollView>
                <Welcome />
                <AuthForm />
                <TeraphyButton />
            </ScrollView>
        </View>
    )
}

const Welcome = () => {
    return (
        <View style={styles.welcome}>
            <Logo />
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeDesc}>Silahkan lengkapi data anda</Text>
        </View>
    )
}

const AuthForm = () => {
    return (
        <View style={styles.authForm}>
            <View style={styles.authBar}>
                <TextInput style={styles.inputBar} placeholder='Ketikkan nama anda' placeholderTextColor={'#F5BFB5'} />
                <Text style={styles.inputLabel}>Nama</Text>
            </View>
            <View>
                <TextInput style={styles.inputBar} placeholder='Ketik L untuk laki-laki dan P untuk perempuan' placeholderTextColor={'#F5BFB5'} />
            </View>
            <View>
                <TextInput style={styles.inputBar} placeholder='Ketik umur, misal: 20' placeholderTextColor={'#F5BFB5'} />
            </View>
        </View>
    )
}

const TeraphyButton = () => {
    return (
        <View>
            <Pressable style={styles.teraphyButton}>
                <Text style={styles.buttonText}>Mulai Terapi</Text>
            </Pressable>
        </View>
    )
}

export default Authentication

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
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
    },
    authForm: {
        marginTop: 80,
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    authBar: {
        position: 'relative',
    },
    inputBar: {
        borderWidth: 1,
        height: 46,
        width: 340,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 20,
        borderColor: '#D15B46',
        fontSize: 14,
        color: '#D15B46',
        borderRadius: 40,
        marginBottom: 40,
        fontFamily: 'Nunito-Medium'
    },
    teraphyButton: {
        height: 46,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 40,
        backgroundColor: '#D15B46',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputLabel: {
        position: 'absolute',

    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Nunito-ExtraBold',
        color: '#FFFFFF',
    }

})