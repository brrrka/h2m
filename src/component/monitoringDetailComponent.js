import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MonitoringDetail = ({ record }) => {
    const { filename, createdAt, heartbeat, brainwave, levelHeartbeat, levelBrainwave, stressStatus } = record;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{filename}</Text>
                <Text style={styles.date}>Tanggal: {new Date(createdAt.seconds * 1000).toLocaleDateString()}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bubble}>
                    <Text style={styles.subtitle}>Heartbeat</Text>
                    <Text style={styles.desc}>{heartbeat} dpm</Text>
                    <Text style={styles.desc}>Level: {levelHeartbeat}</Text>
                </View>
                <View style={styles.bubble}>
                    <Text style={styles.subtitle}>Meditation</Text>
                    <Text style={styles.desc}>{brainwave}</Text>
                    <Text style={styles.desc}>Level: {levelBrainwave} </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.summary}>Status: {stressStatus}</Text>
            </View>
        </View>
    );
};

export default MonitoringDetail;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: '#FFF7F6',
        borderRadius: 20,
    },
    header: {
        marginTop: 15,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        color: '#BF3218',
        fontFamily: 'Nunito-Bold',
    },
    date: {
        color: '#D15B46',
        fontFamily: 'Nunito-Regular',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    bubble: {
        backgroundColor: '#FFE7E4',
        paddingVertical: 15,
        width: '45%',
        alignItems: 'center',
        borderRadius: 30,
    },
    subtitle: {
        color: '#BF3218',
        fontFamily: 'Nunito-Bold',
        marginBottom: 4,
    },
    desc: {
        color: '#D15B46',
        fontFamily: 'Nunito-Regular',
        fontSize: 12,
        marginBottom: 2,
    },
    footer: {
        marginBottom: 30,
        backgroundColor: '#FFE7E4',
        width: '90%',
        alignSelf: 'center',
        height: 37,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    summary: {
        color: '#D15B46',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 12,
    },
});
