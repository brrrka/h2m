import { Appearance, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Welcome from '../../component/welcomeComponent'
import GoogleLogin from '../../component/googleLoginComponent'

const RegisterPage = () => {
    return (
        <View style={styles.mainContainer}>
            <Welcome title="Daftar" desc="Silahkan daftarkan akun anda" />
            <View>
                <InputForm title='Email' desc='Ketikkan Email Anda' hide={false} />
                <InputForm title='Kata Sandi' desc='Ketikkan kata sandi Anda' hide={true} />
                <InputForm title='Konfirmasi Kata Sandi' desc='Konfirmasi kata sandi anda' hide={true} />
            </View>
            <Button />
            <View style={styles.googleLogin}>
                <GoogleLogin bgcolor={'#F5F5F5'} />
            </View>
            <LoginRoute />
        </View>
    )
}

const InputForm = ({ title, desc, hide }) => {
    return (
        <View style={styles.inputForms}>
            <TextInput style={styles.inputForm} placeholder={desc} placeholderTextColor={'#FFB6A9'} secureTextEntry={hide} />
            <Text style={styles.titleText}>
                {title}
            </Text>
        </View>
    )
}

const Button = () => {
    return (
        <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
        </View>
    )
}

const LoginRoute = () => {
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
                Sudah Punya Akun?
            </Text>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}> Masuk</Text>
            </TouchableOpacity>
        </View>
    )
}


export default RegisterPage

const styles = StyleSheet.create({
    mainContainer: {
        top: -40
    },
    inputForms: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 20
    },
    inputForm: {
        borderWidth: 1,
        borderColor: '#F9A144',
        width: '90%',
        height: 46,
        borderRadius: 40,
        paddingLeft: 20,
        color: '#D15B46',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
    },
    titleText: {
        position: 'absolute',
        color: '#D15B46',
        top: -10,
        backgroundColor: '#F5F5F5',
        left: 50,
        paddingVertical: 0,
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
    },
    buttonSection: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        top: 70
    },
    button: {
        backgroundColor: '#D15B46',
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 40
    },
    buttonText: {
        fontFamily: 'Nunito-ExtraBold',
        fontColor: '#fffff'
    },
    googleLogin: {
        top: 100,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    loginText: {
        top: 120,
        color: '#D15B46',
    },
    loginButton: {
        color: '#D15B46',
        top: 119,
    },
    loginButtonText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: '#D15B46',
    }
})