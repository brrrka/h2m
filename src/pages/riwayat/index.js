import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../../component/simpleTopBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RiwayatPage = ({ navigation }) => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchMonitoringRecords = async () => {
            try {
                // Dapatkan UID dari pengguna yang sedang login
                const currentUser = auth().currentUser;

                // Pastikan pengguna sudah login
                if (currentUser) {
                    const { uid } = currentUser;

                    // Query untuk mengambil dokumen yang userId-nya sesuai dengan UID pengguna yang login
                    const snapshot = await firestore()
                        .collection('monitoring_records')
                        .where('userId', '==', uid)
                        .get();

                    // Mapping hasil snapshot ke dalam array
                    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setRecords(data);
                } else {
                    console.error('User not logged in');
                }
            } catch (error) {
                console.error("Error fetching monitoring records: ", error);
            }
        };

        fetchMonitoringRecords();
    }, []);

    return (
        <View style={styles.container}>
            <TopBar title="Riwayat" navigation={navigation} route={'MainPage'} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.riwayatList}>
                    {records.map(record => (
                        <RiwayatListButton key={record.id} record={record} navigation={navigation} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const RiwayatListButton = ({ record, navigation }) => {
    const { filename, createdAt } = record;

    return (
        <TouchableOpacity
            style={styles.riwayatButton}
            onPress={() => navigation.navigate('DetailRiwayatPage', { recordId: record.id })}
            activeOpacity={0.9}
        >
            <Text style={styles.titleText}>{filename}</Text>
            <Text style={styles.dateText}>Tanggal: {new Date(createdAt.seconds * 1000).toLocaleDateString()}</Text>
        </TouchableOpacity>
    );
};

export default RiwayatPage;

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
        width: '100%',
        paddingHorizontal: '5%',
        alignItems: 'center',
    },
    riwayatButton: {
        width: '100%',
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
});
