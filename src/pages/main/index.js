import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Logo from '../../assets/logo.svg'
import Bar from '../../assets/bar.svg';
import BottomBar from '../../assets/bottombar.svg'
import Sentiment from '../../assets/sentiment_satisfied.svg'

const Main = () => {
  return (
    <View>
      <TopBar />
      <Text style={styles.monitoringStatus}>Monitoring Status: Off</Text>
      <Heartbeat />
      <Brainwave />
      <StressLevel />
      <BottomNavBar />
    </View >
  );
};

const TopBar = () => {
  return (
    <View>
      <Bar width={400} height={270} />
      <View style={styles.title}>
        <View style={styles.navText}>
          <Text style={styles.titleText}>Heart to Mind Monitor</Text>
          <Text style={styles.navDesc}>Stress therapy from your</Text>
          <Text style={styles.navDesc}>Heart to your mind</Text>
        </View>
        <View style={styles.mainLogo}>
          <Logo />
        </View>
      </View>
    </View>
  )
}

const Heartbeat = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Heartbeat</Text>
      <View style={styles.kolomGrafik}>
        <Text style={styles.statusText}>
          -
        </Text>
      </View>
      <View style={styles.kolomStatus}>
        <Text style={styles.statusText}>
          Status : -
        </Text>
      </View>
    </View>
  );
};

const Brainwave = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Meditation</Text>
      <View style={styles.kolomGrafik}>
        <Text style={styles.statusText}>
          -
        </Text>
      </View>
      <View style={styles.kolomStatus}>
        <Text style={styles.statusText}>
          Status : -
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
          Level Stress : -
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
      <Sentiment width={44} height={44} style={styles.sentiment} />
    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 40,
    flexDirection: 'row'
  },
  navText: {
    top: 20,
    left: 30
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Nunito-ExtraBold',
    color: '#D15B46'
  },
  navDesc: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    color: '#ffffff'
  },
  mainLogo: {
    right: 60,
    top: 40
  },
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
    height: 46,
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
    marginLeft: 30,
    fontFamily: 'Nunito-Regular',
  },
  statusLevelText: {
    color: '#F3816C',
    fontSize: 16,
    fontFamily: 'Nunito-ExtraBold',
    marginLeft: 30,
  }
});