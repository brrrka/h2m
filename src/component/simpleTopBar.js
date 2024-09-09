import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackArrow from '../assets/icons/line_start_arrow_notch.svg'

const TopBar = ({ title, navigation, route }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(route)}>
                <BackArrow />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.barText}>{title}</Text>
            </View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        position: 'relative',
        marginBottom: '100'
    },
    button: {
        position: 'absolute',
        left: 20,
        top: 35
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
    },
    barText: {
        alignSelf: 'center',
        color: '#D15B46',
        fontSize: 24,
        fontFamily: 'Nunito-Bold'
    }
})