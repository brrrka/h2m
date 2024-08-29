import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Logo from '../../assets/logo.svg'

const AuthenticationPage = () => {
    return (
        <View>
            <Welcome />
            <AuthenticationOptions />
        </View>
    )
}

const Welcome = () => {
    return (
        <View style={styles.welcome}>
            <Logo />
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeDesc}>Silahkan Pilih Metode Untuk Masuk</Text>
        </View>
    )
}

const AuthenticationOptions = () => {
    return (
        <View style={styles.authenticationOption}>
            <OptionButton title='Sudah Punya Akun?' mainTitle=' Login Disini!' icon={null} />
            <OptionButton title='Belum Punya Akun?' mainTitle=' Daftar Disini!' icon={null} />
            <OtherMethodButton title='Login Dengan' mainTitle=' Google' icon={null} />
        </View>
    )
}

const OptionButton = ({ title, mainTitle, icon }) => {
    return (
        <View style={styles.optionButtonContainer}>
            <TouchableOpacity style={styles.optionButton}>
                {icon ? <Image source={icon} style={styles.icon} /> : null}
                <Text style={styles.optionButtonText}>
                    {title}
                    <Text style={styles.mainOptionButtonText}>
                        {mainTitle}
                    </Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const OtherMethodButton = ({ title, mainTitle, icon }) => {
    return (
        <View style={styles.otherMethodButtonContainer}>
            <TouchableOpacity style={styles.otherMethodButton}>
                {icon ? <Image source={icon} style={styles.icon} /> : null}
                <Text style={styles.otherMehodButtonText}>
                    {title}
                    <Text style={styles.otherMethodButtonMainText}>
                        {mainTitle}
                    </Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthenticationPage

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
    authenticationOption: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: '90%',
    },
    optionButtonContainer: {
        width: '100%', // Ukuran kontainer selebar AuthenticationOptions
        marginVertical: 10, // Spasi vertikal di antara tombol
    },
    optionButton: {
        flexDirection: 'row', // Membuat ikon dan teks sejajar
        alignItems: 'center', // Menyelaraskan item di tengah secara vertikal
        backgroundColor: '#F3816C',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
    },
    optionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
    },
    mainOptionButtonText: {
        fontFamily: 'Nunito-ExtraBold',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    otherMethodButtonContainer: {
        width: '100%', // Ukuran kontainer selebar AuthenticationOptions
        marginVertical: 50, // Spasi vertikal di antara tombol
    },
    otherMethodButton: {
        flexDirection: 'row', // Membuat ikon dan teks sejajar
        alignItems: 'center', // Menyelaraskan item di tengah secara vertikal
        backgroundColor: '#FFFF',
        padding: 12,
        borderWidth: 0.5,
        borderColor: 'lighter',
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
    },
    otherMehodButtonText: {
        color: '#F3816C',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
    },
    otherMethodButtonMainText: {
        fontFamily: 'Nunito-ExtraBold'
    }
})