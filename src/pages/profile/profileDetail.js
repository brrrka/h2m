import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import TopBar from '../../component/simpleTopBar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        gender: '',
        age: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth().currentUser;
            if (user) {
                const uid = user.uid;
                try {
                    const doc = await firestore().collection('users').doc(uid).get();
                    if (doc.exists) {
                        setUserData(doc.data());
                    } else {
                        setError('Data pengguna tidak ditemukan.');
                    }
                } catch (error) {
                    setError('Error fetching user data: ' + error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Tidak ada pengguna yang login.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSignOut = async () => {
        try {
            await auth().signOut();
            console.log('User signed out!');
            navigation.navigate("LandingPage");
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    return (
        <View style={styles.container}>
            <TopBar title='Akun Saya' navigation={navigation} route={'MainPage'} />
            <View style={styles.dataBarContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#D15B46" style={styles.loading} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : (
                    <>
                        <ProfileDataBar title='Email' value={userData.email} />
                        <ProfileDataBar title='Nama' value={userData.name} />
                        <ProfileDataBar title='Jenis Kelamin' value={userData.gender} />
                        <ProfileDataBar title='Umur' value={userData.age} />
                    </>
                )}
                <SignOutButton onPress={handleSignOut} />
            </View>
        </View>
    );
};

const ProfileDataBar = ({ title, value }) => {
    return (
        <View style={styles.dataBar}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.dataText}>{value}</Text>
        </View>
    );
};

const SignOutButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.signOutButton} >
            <Text style={styles.signOutButtonText}>
                Log Out
            </Text>
        </TouchableOpacity>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    dataBarContainer: {
        paddingVertical: 30,
        marginTop: 50,
        backgroundColor: '#FFF7F6',
        width: '90%',
        borderRadius: 30,
        alignItems: 'center',
        position: 'relative',
    },
    dataBar: {
        borderWidth: 1,
        width: '90%',
        height: 46,
        marginVertical: 20,
        borderRadius: 30,
        borderColor: '#D15B46'
    },
    title: {
        color: '#D15B46',
        fontFamily: 'Nunito-Bold',
        backgroundColor: '#FFF7F6',
        position: 'absolute',
        left: 25,
        bottom: 35,
        paddingHorizontal: 3,
        fontSize: 16
    },
    dataText: {
        color: '#D15B46',
        fontFamily: 'Nunito-Medium',
        paddingLeft: 25,
        paddingTop: 10,
        fontSize: 14
    },
    signOutButton: {
        backgroundColor: '#D15B46',
        width: '90%',
        height: 46,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    signOutButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
    },
    loading: {
        marginVertical: 20,
    },
    errorText: {
        color: 'red',
        fontFamily: 'Nunito-Medium',
        marginVertical: 20,
    }
});
