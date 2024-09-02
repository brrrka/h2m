import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Welcome from '../../component/welcomeComponent';
import GoogleLogin from '../../component/googleLoginComponent'

const LoginPage = () => {
    return (
        <View style={styles.mainContainer}>
            <Welcome title="Masuk" desc="Silahkan Masukkan Akun Anda" />
            <View style={styles.formContainer}>
                <InputForm title='Email' desc='Ketikkan Email Anda' hide={false} />
                <InputForm title='Kata Sandi' desc='Ketikkan kata sandi Anda' hide={true} />
                <InputForm title='Konfirmasi Kata Sandi' desc='Konfirmasi kata sandi anda' hide={true} />
            </View>
            <Button />
            <View style={styles.googleLogin}>
                <GoogleLogin bgcolor={'#FFE1DB'} />
            </View>
            <RegisterRoute />
        </View>
    );
}

const InputForm = ({ title, desc, hide }) => {
    return (
        <View style={styles.inputForms}>
            <TextInput style={styles.inputForm} placeholder={desc} placeholderTextColor={'#FFB6A9'} secureTextEntry={hide} />
            <Text style={styles.titleText}>
                {title}
            </Text>
        </View>
    );
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

const RegisterRoute = () => {
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
                Belum Punya Akun?
            </Text>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}> Daftar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginPage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, // Ensures the container takes up the full screen height
        backgroundColor: '#FFE1DB',
        paddingHorizontal: 20,
    },
    formContainer: {
        marginTop: 60
    },
    inputForms: {
        alignItems: 'center',
        marginBottom: 20,
    },
    inputForm: {
        borderWidth: 1,
        borderColor: '#F9A144',
        width: '90%',
        height: 46,
        borderRadius: 40,
        paddingLeft: 20,
        color: '#D9998D',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
    },
    titleText: {
        position: 'absolute',
        color: '#BF3218',
        top: -10,
        backgroundColor: '#FFE1DB',
        left: 50,
        paddingVertical: 0,
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
    },
    buttonSection: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        marginBottom: 40,
        backgroundColor: '#D15B46',
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 40
    },
    buttonText: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#fffff'
    },
    googleLogin: {
        marginBottom: 100
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: '#D15B46',
        bottom: 80
    },
    loginButton: {
        color: '#D15B46',
        bottom: 81
    },
    loginButtonText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: '#D15B46',
    }
});
