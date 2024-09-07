import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import GoogleLogo from '../assets/icons/googleLogo.svg'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import CustomModal from './modal/mainModalComponent'

async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    console.log(idToken)

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

const GoogleLoginComponent = ({ bgcolor }) => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '902748784452-imm5bna1bn8jisqukmmt5qqlbtim1hch.apps.googleusercontent.com',
        });
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.horizontalLine} />
                <Text style={[styles.text, { backgroundColor: bgcolor }]}>
                    Atau Daftar Dengan
                </Text>
            </View>
            <GoogleButton OnPress={onGoogleButtonPress} />
        </View>
    )
}

const GoogleButton = ({ OnPress }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={OnPress}>
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