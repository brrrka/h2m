import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'

const LogOutButton = ({ navigation }) => {
    const LogOut = async () => {
        try {
            await auth().signOut();
            console.log('User signed out!');
            navigation.navigate("LandingPage");
        }
        catch (error) {
            console.error('Error signing out', error)
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={LogOut} style={styles.button} >
                <Text style={styles.buttonText}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default LogOutButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        width: '20%',
        paddingVertical: 5
    },
    buttonText: {
        color: '#F9A144',
        fontFamily: 'Nunito-ExtraBold',
        fontSize: 16
    }
})