import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Welcome from '../../component/welcomeComponent';
import GoogleLogin from '../../component/googleLoginComponent';

const RegisterPage = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <Welcome title="Daftar" desc="Silahkan daftarkan akun anda" />
            <View style={styles.formContainer}>
                <InputForm title='Email' desc='Ketikkan Email Anda' hide={false} />
                <InputForm title='Kata Sandi' desc='Ketikkan kata sandi Anda' hide={true} />
                <InputForm title='Konfirmasi Kata Sandi' desc='Konfirmasi kata sandi anda' hide={true} />
            </View>
            <Button />
            <View style={styles.googleLogin}>
                <GoogleLogin bgcolor={'#F5F5F5'} />
            </View>
            <LoginRoute navigation={navigation} />
        </View>
    );
};

const InputForm = ({ title, desc, hide }) => {
    return (
        <View style={styles.inputForms}>
            <TextInput style={styles.inputForm} placeholder={desc} placeholderTextColor={'#FFB6A9'} secureTextEntry={hide} />
            <Text style={styles.titleText}>
                {title}
            </Text>
        </View>
    );
};

const Button = () => {
    return (
        <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
        </View>
    );
};

const LoginRoute = ({ navigation }) => {
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
                Sudah Punya Akun?
            </Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("LoginPage")}>
                <Text style={styles.loginButtonText}> Masuk</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterPage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5', // Menjaga warna latar belakang
    },
    formContainer: {
        marginTop: 60,
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
        color: '#D15B46',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
    },
    titleText: {
        position: 'absolute',
        color: '#D15B46',
        top: -10,
        backgroundColor: '#F5F5F5', // Menjaga warna latar belakang
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
        backgroundColor: '#D15B46',
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 40,
        marginBottom: 40, // Disesuaikan dengan layout LoginPage
    },
    buttonText: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#ffffff', // Memastikan warna teks tetap putih
    },
    googleLogin: {
        marginBottom: 100, // Disesuaikan dengan layout LoginPage
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: '#D15B46',
        bottom: 80, // Disesuaikan dengan layout LoginPage
    },
    loginButton: {
        color: '#D15B46',
        bottom: 81, // Disesuaikan dengan layout LoginPage
    },
    loginButtonText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: '#D15B46',
    },
});
