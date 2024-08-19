import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Bar from '../../assets/bar.svg'
import BottomBar from '../../assets/bottombar.svg'
import Sentiment from '../../assets/sentiment_satisfied.svg'
import SatisfiedSentiment from '../../assets/sentiment_very_satisfied.svg'
import PinkSatisfiedSentiment from '../../assets/sentiment_very_satisfied_pink.svg'
import Grafik1 from '../../assets/grafik1.svg'
import Grafik2 from '../../assets/grafik2.svg'

const Main = () => {
    return (
        <View>
            <Bar width={400} height={270} />
            <Text style={styles.monitoringStatus}>Monitoring Status: On</Text>
            <Heartbeat />
            <Brainwave />
            <StressLevel />
            <BottomNavBar />
        </View >
    );
};

const Heartbeat = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.sectionTitle}>Heartbeat</Text>
            <View style={styles.kolomGrafik}>
                <Text style={styles.statusText}>
                    <Grafik1 />
                </Text>
            </View>
        </View>
    );
};

const Brainwave = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.sectionTitle}>Brainwave</Text>
            <View style={styles.kolomGrafik}>
                <Text style={styles.statusText}>
                    <Grafik2 />
                </Text>
            </View>
        </View>
    );
};

const StressLevel = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.kolomLevel}>
                <Text style={styles.statusLevelText}>
                    Level Stress : Rileks
                </Text>
            </View>
        </View>
    );
};

const BottomNavBar = () => {
    return (
        <View style={styles.bottomBar}>
            <BottomBar width={395} height={160} />
            <View style={styles.middleButton} />
            <View style={styles.mainMiddleButton} />
            <PinkSatisfiedSentiment width={44} height={44} style={styles.sentiment} />
            <View style={styles.notification}></View>
        </View>
    )
}

export default Main;

const styles = StyleSheet.create({
    monitoringStatus: {
        textAlign: 'right',
        marginRight: 20,
        marginTop: 15,
        fontSize: 16,
        fontFamily: 'Nunito-ExtraBold',
        color: '#f3816c',
    },
    wrapper: { marginTop: 20, marginLeft: 20, marginRight: 20 },
    sectionTitle: { fontSize: 16, color: '#ffb970', fontFamily: 'Nunito-ExtraBold' },
    kolomGrafik: {
        height: 106,
        backgroundColor: '#F9DCC4',
        borderRadius: 46 / 2,
        elevation: 6,
        justifyContent: 'center',
    },
    kolomStatus: {
        height: 46,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#fabd7d',
        borderRadius: 46 / 2,
        justifyContent: 'center',
    },
    kolomLevel: {
        height: 46,
        marginTop: 10,
        backgroundColor: '#f5d7cf',
        borderRadius: 46 / 2,
        justifyContent: 'center',
    },
    bottomBar: {
        position: 'relative',
        alignItems: 'center'
    },
    middleButton: {
        marginTop: 10,
        backgroundColor: '#ffffff',
        width: 80,
        height: 80,
        position: 'absolute',
        borderRadius: 70,
    },
    mainMiddleButton: {
        marginTop: 20,
        position: 'absolute',
        backgroundColor: '#ffffff',
        width: 64,
        height: 64,
        borderRadius: 64 / 2,
        elevation: 8,
    },
    sentiment: {
        marginTop: 30,
        position: 'absolute',
        elevation: 9
    },
    statusText: {
        color: '#F18C23',
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'Nunito-Regular',
    },
    statusLevelText: {
        color: '#F3816C',
        fontSize: 16,
        fontFamily: 'Nunito-ExtraBold',
        marginLeft: 30,
    },
    notification: {
        position: 'absolute',
        backgroundColor: '#3BE400',
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        top: 20,
        right: 170,
        elevation: 9,
        shadowColor: 'transparent',
    }
});