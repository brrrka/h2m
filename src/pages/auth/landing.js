import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TopBar from '../../svg/whiteblobtop.svg'
import Circle from '../../svg/circle.svg'
import Logo from '../../assets/logo.svg'
import BottomBar from '../../svg/whiteblobbot.svg'


const LandingPage = ({ navigation }) => {
    return (
        <View style={styles.landingPage}>
            <TopBar />
            <View style={styles.circle}>
                <Circle />
                <Logo style={styles.logo} />
            </View>
            <View style={styles.buttonSection}>
                <Button title='Daftar' navigation={navigation} route='RegisterPage' />
                <Button title='Login' navigation={navigation} route='LoginPage' />
            </View>
            <BottomBar style={styles.bottomBar} />
        </View>
    )
}

const Button = ({ title, navigation, route }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(route)}>
            <Text style={styles.buttonText} >{title}</Text>
        </TouchableOpacity>
    )
}

export default LandingPage

const styles = StyleSheet.create({
    landingPage: {
        backgroundColor: '#F4B8AD',
        flex: 1,
        alignItems: 'center',
    },
    circle: {
        marginTop: 40,
        position: 'relative',
        alignItems: 'center',
    },
    logo: {
        position: 'absolute',
        top: 70,
    },
    buttonSection: {
        marginTop: 75,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#fff',
        width: '70%',
        alignItems: 'center',
        borderRadius: 70,
        marginTop: 20,
    },
    buttonText: {
        color: '#F3816C',
        fontFamily: 'Nunito-SemiBold',
        paddingVertical: 10,
        fontSize: 20,
        letterSpacing: 0.3
    },
    bottomBar: {
        bottom: 0,
        position: 'absolute'
    }
})