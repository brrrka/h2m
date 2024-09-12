import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import TopBar from '../../component/simpleTopBar';
import firestore from '@react-native-firebase/firestore';
import MonitoringDetail from '../../component/monitoringDetailComponent';

const DetailRiwayatPage = ({ navigation, route }) => {
    const { recordId } = route.params; // Ambil recordId dari parameter navigasi
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecordDetail = async () => {
            try {
                // Query Firestore untuk mendapatkan dokumen berdasarkan recordId
                const doc = await firestore()
                    .collection('monitoring_records')
                    .doc(recordId)
                    .get();

                if (doc.exists) {
                    setRecord({ id: doc.id, ...doc.data() });
                } else {
                    console.error('No record found');
                }
            } catch (error) {
                console.error('Error fetching record detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecordDetail();
    }, [recordId]);

    if (loading) {
        return (
            <View style={styles.LoadingContainer}>
                <ActivityIndicator size="large" color="#D15B46" />
            </View>
        );
    }

    if (!record) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Detail tidak ditemukan</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TopBar title="Detail Riwayat" navigation={navigation} route={'RiwayatPage'} />
            <View style={styles.monitoringDetailContainer}>
                <MonitoringDetail record={record} />
            </View>
        </View>
    );
};

export default DetailRiwayatPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    LoadingContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    monitoringDetailContainer: {
        marginTop: 50,
        width: '90%',
        alignItems: 'center',
    },
    errorText: {
        fontFamily: 'Nunito-Regular',
        color: '#D15B46',
        fontSize: 16,
    },
});
