import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TopBar from '../../component/simpleTopBar'

const RiwayatPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TopBar title="Riwayat" navigation={navigation} route={'MainPage'} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.riwayatList}>
                    <RiwayatListButton navigation={navigation} />
                    <RiwayatListButton navigation={navigation} />
                    <RiwayatListButton navigation={navigation} />
                </View>
            </ScrollView>
        </View>
    )
}

const RiwayatListButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.riwayatButton}
            onPress={() => navigation.navigate('DetailRiwayatPage')}
            activeOpacity={0.9}
        >
            <Text style={styles.titleText}>Judul Monitoring</Text>
            <Text style={styles.dateText}>Tanggal Monitoring</Text>
        </TouchableOpacity>
    )
}

export default RiwayatPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF'
    },
    scrollContainer: {
        alignItems: 'center',
        width: '100%',
    },
    riwayatList: {
        marginTop: 50,
        width: '100%', // Menggunakan seluruh lebar layar
        paddingHorizontal: '5%', // Memberikan padding 5% di kiri dan kanan
        alignItems: 'center',
    },
    riwayatButton: {
        width: '100%', // Memastikan tombol mengambil lebar penuh elemen pembungkus
        height: 46,
        backgroundColor: '#FFF7F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30
    },
    titleText: {
        fontFamily: 'Nunito-Bold',
        color: '#D15B46'
    },
    dateText: {
        fontFamily: 'Nunito-Regular',
        color: '#D15B46'
    }
})
