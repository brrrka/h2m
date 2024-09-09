import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import TopBar from '../../component/simpleTopBar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ConfirmModal from '../../component/modal/confirmModalComponent';
import CustomModal from '../../component/modal/mainModalComponent';

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        gender: '',
        age: ''
    });
    const [editedUserData, setEditedUserData] = useState(userData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth().currentUser;
            if (user) {
                const uid = user.uid;
                try {
                    const doc = await firestore().collection('users').doc(uid).get();
                    if (doc.exists) {
                        const data = doc.data();
                        setUserData(data);
                        setEditedUserData(data);
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

    const checkIfEdited = () => {
        const isChanged =
            editedUserData.name !== userData.name ||
            editedUserData.gender !== userData.gender ||
            editedUserData.age !== userData.age;
        setIsEdited(isChanged);
    };

    const handleSaveChanges = () => {
        // Validasi input
        if (!editedUserData.name) {
            setErrorMessage('Nama tidak boleh kosong.');
            setErrorModalVisible(true);
            return;
        }
        if (!['L', 'P'].includes(editedUserData.gender)) {
            setErrorMessage('Jenis kelamin hanya boleh "L" atau "P".');
            setErrorModalVisible(true);
            return;
        }
        if (isNaN(editedUserData.age) || Number(editedUserData.age) < 0) {
            setErrorMessage('Umur tidak boleh negatif.');
            setErrorModalVisible(true);
            return;
        }

        // Reset error sebelum menampilkan konfirmasi
        setErrorMessage('');
        setConfirmModalVisible(true);
    };

    const handleConfirmSaveChanges = async () => {
        const user = auth().currentUser;
        if (user) {
            const uid = user.uid;
            try {
                await firestore().collection('users').doc(uid).update(editedUserData);
                setUserData(editedUserData);
                setIsEdited(false);
                setConfirmModalVisible(false);
                setSuccessModalVisible(true); // Tampilkan modal sukses setelah konfirmasi berhasil
            } catch (error) {
                console.error('Error updating user data', error);
            }
        }
    };

    const handleSuccessModalClose = () => {
        setSuccessModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TopBar title='Akun Saya' navigation={navigation} route={'MainPage'} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.dataBarContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#D15B46" style={styles.loading} />
                    ) : (
                        <>
                            <ProfileDataBar
                                title='Email'
                                placeholder={userData.email}
                                editable={false}
                                style={styles.disabledInput}
                            />
                            <ProfileDataBar
                                title='Nama'
                                placeholder={userData.name}
                                editable={true}
                                onChangeText={(text) => {
                                    setEditedUserData({ ...editedUserData, name: text });
                                    checkIfEdited();
                                }}
                            />
                            <ProfileDataBar
                                title='Jenis Kelamin'
                                placeholder={userData.gender}
                                editable={true}
                                onChangeText={(text) => {
                                    setEditedUserData({ ...editedUserData, gender: text });
                                    checkIfEdited();
                                }}
                            />
                            <ProfileDataBar
                                title='Umur'
                                placeholder={userData.age.toString()}
                                editable={true}
                                onChangeText={(text) => {
                                    setEditedUserData({ ...editedUserData, age: text });
                                    checkIfEdited();
                                }}
                            />
                        </>
                    )}
                    <SignOutButton onPress={() => setModalVisible(true)} />
                    <ConfirmModal message="Apa kamu yakin ingin log out?" visible={modalVisible} negativeOnPress={() => setModalVisible(false)} positiveOnPress={handleSignOut} />
                    {isEdited && <EditButton onPress={handleSaveChanges} />}
                    <CustomModal
                        visible={errorModalVisible}
                        onClose={() => setErrorModalVisible(false)}
                        message={errorMessage}
                    />
                    <ConfirmModal
                        message="Apakah Anda yakin ingin menyimpan perubahan?"
                        visible={confirmModalVisible}
                        negativeOnPress={() => setConfirmModalVisible(false)}
                        positiveOnPress={handleConfirmSaveChanges}
                    />
                    <CustomModal
                        visible={successModalVisible}
                        onClose={handleSuccessModalClose}
                        message="Data berhasil di update"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const ProfileDataBar = ({ title, placeholder, editable, onChangeText, style }) => {
    return (
        <View style={styles.dataBar}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={[styles.dataText, style]} // Menerapkan gaya tambahan jika disediakan
                editable={editable}
                placeholder={placeholder}
                placeholderTextColor={editable ? "#D15B46" : "#B0B0B0"} // Warna teks placeholder berbeda untuk disabled
                onChangeText={onChangeText}
                keyboardType={title === 'Umur' ? 'numeric' : 'default'}
                autoCapitalize="none"
                returnKeyType="done"
            />
        </View>
    );
};

const SignOutButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.signOutButton}>
            <Text style={styles.signOutButtonText}>
                Log Out
            </Text>
        </TouchableOpacity>
    );
};

const EditButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.editButton}>
            <Text style={styles.editText}>
                Simpan Perubahan
            </Text>
        </TouchableOpacity>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 30,
        marginTop: 30
    },
    dataBarContainer: {
        backgroundColor: '#FFF7F6',
        width: '90%',
        borderRadius: 30,
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 30
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
    disabledInput: {
        color: '#B0B0B0', // Warna teks untuk input disabled
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
    editButton: {
        width: '90%',
        height: 46,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: '#F3816C'
    },
    editText: {
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
        color: '#F3816C'
    }
});
