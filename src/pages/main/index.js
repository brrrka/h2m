import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import Bar from '../../assets/bar.svg';
import BottomBar from '../../assets/bottombar.svg';
import Sentiment from '../../assets/sentiment_satisfied.svg';
import Burger from '../../component/modal/burgerModalComponent';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {}
});

const Main = ({ navigation }) => {
  const [distance, setDistance] = useState('Menunggu Koneksi...');
  const [mqttClient, setMqttClient] = useState(null);
  const [monitoringStatus, setMonitoringStatus] = useState('Off')

  useEffect(() => {
    const client = new Paho.MQTT.Client('192.168.1.107', 9001, 'react_native_client');
    setMqttClient(client);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
      onSuccess: () => onConnect(client),
      useSSL: false,
      onFailure: (e) => console.log('Connect failed: ', e),
    });

    return () => {
      if (client && client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  const onConnect = (client) => {
    console.log('Connected to MQTT broker');
    setDistance("Terhubung, menunggu data...");
    setMonitoringStatus("On")

    if (client) {
      client.subscribe('sensor/distance');
    }
  };

  const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:', responseObject.errorMessage);
      setDistance("Koneksi terputus, mencoba menghubungkan kembali...");

      setTimeout(() => {
        if (mqttClient) {
          mqttClient.connect({
            onSuccess: () => onConnect(mqttClient),
            useSSL: false,
            onFailure: (e) => {
              console.log('Reconnect Failed', e);
              setDistance("Gagal menghubungkan ulang, menghubungkan kembali...");
            }
          });
        }
      }, 5000);
    }
  };

  const onMessageArrived = (message) => {
    console.log('onMessageArrived:', message.payloadString);
    setDistance(message.payloadString); // Update state dengan data jarak
  };


  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.burger}>
        <Burger navigation={navigation} />
      </View>
      <Text style={styles.monitoringStatus}>Monitoring Status: {monitoringStatus}</Text>
      <Heartbeat distance={distance} />
      <Brainwave />
      <StressLevel />
      <BottomNavBar />
    </View>
  );
};

const TopBar = () => {
  return (
    <View style={styles.topBarContainer}>
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
  );
};

const Heartbeat = ({ distance }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Jarak</Text>
      <View style={styles.kolomGrafik}>
        <Text style={styles.statusText}>{distance} cm</Text>
      </View>
      <View style={styles.kolomStatus}>
        <Text style={styles.statusText}>Status : {distance !== '-' ? 'Received' : '-'}</Text>
      </View>
    </View>
  );
};

const Brainwave = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Meditation</Text>
      <View style={styles.kolomGrafik}>
        <Text style={styles.statusText}>-</Text>
      </View>
      <View style={styles.kolomStatus}>
        <Text style={styles.statusText}>Status : -</Text>
      </View>
    </View>
  );
};

const StressLevel = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.kolomLevel}>
        <Text style={styles.statusLevelText}>Level Stress : -</Text>
      </View>
    </View>
  );
};

const BottomNavBar = () => {
  return (
    <View style={styles.bottomBar}>
      <BottomBar width={395} height={160} />
      <View style={styles.middleButton}>
        <TouchableHighlight style={styles.middleButtonTouch} onPress={() => console.log("Tombol Ditekan")} underlayColor="transparent" >
          <View style={styles.mainMiddleButton}>
            <Sentiment width={44} height={44} style={styles.sentiment} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    position: 'absolute',
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    top: 20,
    left: 30,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Nunito-ExtraBold',
    color: '#D15B46',
  },
  navDesc: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    color: '#ffffff',
  },
  mainLogo: {
    right: 60,
    top: 40,
  },
  burger: {
    position: 'absolute',
    marginTop: 210,
    marginLeft: 25,
  },
  monitoringStatus: {
    textAlign: 'right',
    marginRight: 20,
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Nunito-ExtraBold',
    color: '#f3816c',
  },
  wrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#ffb970',
    fontFamily: 'Nunito-ExtraBold',
  },
  kolomGrafik: {
    height: 46,
    backgroundColor: '#F9DCC4',
    borderRadius: 46 / 2,
    elevation: 2,
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
    position: 'absolute',
    alignItems: 'center',
    bottom: -30,
  },
  middleButton: {
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    width: 80,
    height: 80,
    position: 'absolute',
    borderRadius: 40,
  },
  middleButtonTouch: {
    alignItems: 'center',
    paddingBottom: 30
  },
  mainMiddleButton: {
    marginTop: 8,
    backgroundColor: '#ffffff',
    width: 64,
    height: 64,
    borderRadius: 32,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
