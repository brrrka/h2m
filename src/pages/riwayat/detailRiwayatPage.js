import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopBar from '../../component/simpleTopBar'
import MonitoringDetail from '../../component/monitoringDetailComponent'

const DetailRiwayat = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TopBar title="Riwayat" navigation={navigation} route={'RiwayatPage'} />
            <View style={styles.monitoringDetailContainer}>
                <MonitoringDetail />
            </View>
        </View>
    )
}

export default DetailRiwayat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    monitoringDetailContainer: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center'
    }
})