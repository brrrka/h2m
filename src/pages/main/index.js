import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import Bar from '../../assets/bar.svg';
import BottomBar from '../../assets/bottombar.svg';
import Sentiment from '../../assets/sentiment_satisfied.svg';
import SentimentConnected from '../../assets/sentiment_very_satisfied.svg';
import Burger from '../../component/modal/burgerModalComponent';
import GreenNotification from '../../assets/greenNotification.svg';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SaveModal from '../../component/modal/saveModalComponent';
import SoundPlayer from 'react-native-sound-player'

// Inisialisasi MQTT
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {}
});

const Main = ({ navigation }) => {
  const [distance, setDistance] = useState('-');
  const [mindwave, setMindwave] = useState('-');
  const [mqttClient, setMqttClient] = useState(null);
  const [monitoringStatus, setMonitoringStatus] = useState('Off');
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState({
    gender: '',
    age: '',
  });
  const [status, setStatus] = useState('-');
  const [musicPlayed, setMusicPlayed] = useState(false); // state untuk melacak apakah musik sudah dimainkan

  const playSound = () => {
    try {
      SoundPlayer.playSoundFile('musikmeditasi_fix', 'mp3'); // Nama file audio dan ekstensinya
      console.log('Playing sound...');
    } catch (e) {
      console.log('Cannot play the sound file', e);
    }
  };

  const stopSound = () => {
    try {
      SoundPlayer.stop();
      console.log('Stopping sound...');
    } catch (e) {
      console.log('Cannot stop the sound file', e);
    }
  };

  const toggleMqttConnection = () => {
    if (isConnected) {
      mqttClient?.disconnect();
      setIsConnected(false);
      setMonitoringStatus('Off');
      setDistance('-');
      setMindwave('-');
      setStatus('-');
      setMusicPlayed(false);
      console.log('Disconnected from MQTT broker');
    } else {
      const client = new Paho.MQTT.Client('172.16.31.165', 9001, 'react_native_client');
      setMqttClient(client);

      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      client.connect({
        onSuccess: () => {
          onConnect(client);
          sendUserDataToMqtt();
        },
        useSSL: false,
        onFailure: (e) => console.log('Connect failed: ', e),
      });
    }
  };

  const fetchUserData = async () => {
    const user = auth().currentUser;
    const uid = user.uid;
    try {
      const doc = await firestore().collection('users').doc(uid).get();
      if (doc.exists) {
        const docData = doc.data();
        setUserData(docData);
      } else {
        console.log('User data not found');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const sendUserDataToMqtt = () => {
    if (mqttClient && isConnected) {
      const ageMessage = new Paho.MQTT.Message(userData.age.toString());
      ageMessage.destinationName = 'users/age';
      mqttClient.send(ageMessage);

      const genderMessage = new Paho.MQTT.Message(userData.gender);
      genderMessage.destinationName = 'users/gender';
      mqttClient.send(genderMessage);
    }
  };

  useEffect(() => {
    fetchUserData();
    if (userData.age && userData.gender) {
      sendUserDataToMqtt();
    }
  }, [userData]);

  useEffect(() => {
    if (musicPlayed) {
      playSound();
    } else {
      stopSound();
    }
  }, [musicPlayed]);

  const onConnect = (client) => {
    console.log('Connected to MQTT broker');
    setDistance('Terhubung, menunggu data...');
    setMindwave('Terhubung, menunggu data...');
    setMonitoringStatus('On');
    setIsConnected(true);

    if (client) {
      client.subscribe('BPM/val');
      client.subscribe('sensor/mindwave');
      client.subscribe('Model/ML');
    }
  };

  const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:', responseObject.errorMessage);
      setDistance('Koneksi terputus, mencoba menghubungkan kembali...');
      setMindwave('Koneksi terputus, mencoba menghubungkan kembali...');
      setIsConnected(false);

      setTimeout(() => {
        if (mqttClient) {
          mqttClient.connect({
            onSuccess: () => onConnect(mqttClient),
            useSSL: false,
            onFailure: (e) => {
              console.log('Reconnect Failed', e);
              setDistance('Gagal menghubungkan ulang, menghubungkan kembali...');
              setMindwave('Gagal menghubungkan ulang, menghubungkan kembali...');
              setStatus('Gagal menghubungkan ulang, menghubungkan kembali...');
            },
          });
        }
      }, 5000);
    }
  };

  const onMessageArrived = (message) => {
    console.log('onMessageArrived:', message.payloadString);
    if (message.destinationName === 'BPM/val') {
      setDistance(message.payloadString);
    } else if (message.destinationName === 'sensor/mindwave') {
      setMindwave(message.payloadString);
    } else if (message.destinationName === 'Model/ML') {
      setStatus(message.payloadString);


      if (message.payloadString === '[1]' && !musicPlayed) {

        setMusicPlayed(true);
      } else {
        setMusicPlayed(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.burger}>
        <Burger navigation={navigation} />
      </View>
      <Text style={styles.monitoringStatus}>Monitoring Status: {monitoringStatus}</Text>
      <Heartbeat distance={distance} />
      <Brainwave mindwave={mindwave} />
      <StressLevel status={status} />
      <BottomNavBar isConnected={isConnected} toggleMqttConnection={toggleMqttConnection} />
      <SaveModal message="File Name" visible={false} />
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
      <Text style={styles.sectionTitle}>Heartbeat</Text>
      <View style={styles.kolomGrafik}>
        <Text style={styles.statusText}>{distance ? `${distance} bpm` : "-"}</Text>
      </View>
      <View style={styles.kolomStatus}>
        <Text style={styles.statusText}>Level : {distance !== '-' ? distance >= 49 && distance <= 88 ? 'Normal' : 'Tidak Normal' : '-'}</Text>
      </View>
    </View>
  );
};

const Brainwave = ({ mindwave }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Meditation</Text>
      <View style={styles.kolomGrafik}>
        <Text style={styles.statusText}>{mindwave}</Text>
      </View>
      <View style={styles.kolomStatus}>
        <Text style={styles.statusText}>Level : {mindwave !== '-' ? mindwave < 70 ? 'Rendah' : 'Tinggi' : '-'}</Text>
      </View>
    </View>
  );
};

const StressLevel = ({ status }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.kolomLevel}>
        <Text style={styles.statusLevelText}>Status : {status === '[0]' ? 'Rileks' : 'Tidak Rileks'}</Text>
      </View>
    </View>
  );
};

const BottomNavBar = ({ isConnected, toggleMqttConnection }) => {
  return (
    <View style={styles.bottomBar}>
      <BottomBar width={395} height={160} />
      <View style={styles.middleButton}>
        <TouchableHighlight
          style={styles.middleButtonTouch}
          onPress={() => {
            console.log("Tombol Ditekan");
            toggleMqttConnection();
          }}
          underlayColor="transparent"
        >
          <View style={[styles.mainMiddleButton, { backgroundColor: isConnected ? '#F5BFB5' : '#FFFFFF' }]}>
            {isConnected ? <SentimentConnected width={44} height={44} style={styles.sentiment} /> : <Sentiment width={44} height={44} style={styles.sentiment} />}

            {isConnected ? <GreenNotification width={12} height={12} style={styles.greenNotification} /> : ''}
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
  greenNotification: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 3,
    right: 5,
  }
})