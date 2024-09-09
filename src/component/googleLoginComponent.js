import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import GoogleLogo from '../assets/icons/googleLogo.svg';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const GoogleLoginComponent = ({ bgcolor }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '902748784452-t0ur39o4hefamglbuilvpglue4c249mk.apps.googleusercontent.com', // Sesuaikan dengan webClientId Anda
        });
    }, []);

    async function signOut() {
        try {
            // Sign out from Firebase
            await auth().signOut();
            console.log('Signed out from Firebase');

            // Sign out from Google
            await GoogleSignin.signOut();
            console.log('Signed out from Google');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('Sign out was cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign out is in progress already');
            } else {
                console.error('Error signing out:', error);
            }
        }
    }

    async function onGoogleButtonPress() {
        setLoading(true);
        try {
            await signOut(); // Pastikan untuk sign out terlebih dahulu

            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the user's ID token
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info:', userInfo);

            const { idToken } = userInfo;
            if (!idToken) {
                throw new Error('No idToken returned from Google Sign-In');
            }

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const userCredential = await auth().signInWithCredential(googleCredential);
            console.log('Signed in with Google!', userCredential);

            // Navigate to the next screen or update state as needed
            navigation.navigate('HomePage'); // Ganti dengan nama layar yang sesuai
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign in is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available or outdated');
            } else {
                console.error('Error signing in:', error);
                Alert.alert('Error', 'Terjadi kesalahan saat mencoba login dengan Google. Pastikan Anda memiliki koneksi internet dan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <View>
            <View style={styles.container}>
                <View style={styles.horizontalLine} />
                <Text style={[styles.text, { backgroundColor: bgcolor }]}>
                    Atau Daftar Dengan
                </Text>
            </View>
            <GoogleButton
                onPress={() => onGoogleButtonPress()}
                loading={loading}
            />
        </View>
    );
};

const GoogleButton = ({ onPress, loading }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                    <GoogleLogo style={{ height: 50, width: 50 }} />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default GoogleLoginComponent;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    horizontalLine: {
        height: 2,
        backgroundColor: '#F5BFB5',
        width: '60%',
    },
    text: {
        color: '#F5BFB5',
        position: 'absolute',
        top: -10,
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        paddingHorizontal: 2,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#F5F5F5',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 0.1,
        elevation: 2,
    },
});
