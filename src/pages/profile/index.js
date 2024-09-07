import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Welcome from '../../component/welcomeComponent';
import LogOut from '../../component/logOutComponent';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomModal from '../../component/modal/mainModalComponent';

const saveUserData = async (name, age, gender, onSuccess, onError) => {
    const user = auth().currentUser;
    if (user) {
        const uid = user.uid;
        const email = user.email;

        // Validasi input
        if (!name || !age || !gender) {
            onError('Semua kolom harus diisi');
            return;
        }
        if (isNaN(age) || age <= 0) {
            onError('Umur harus berupa angka positif');
            return;
        }
        if (gender !== 'L' && gender !== 'P') {
            onError('Jenis Kelamin harus L (Laki-laki) atau P (Perempuan)');
            return;
        }

        try {
            const timestamp = firestore.FieldValue.serverTimestamp();

            await firestore().collection('users').doc(uid).set({
                email: email,
                name: name,
                age: age,
                gender: gender,
                createdAt: timestamp,
                updatedAt: timestamp
            });
            console.log('Berhasil Menyimpan data');
            onSuccess(); // Panggil callback jika berhasil
        } catch (error) {
            console.error('Terjadi Error:', error);
            onError('Gagal menyimpan data: ' + error.message); // Panggil callback jika terjadi error
        }
    } else {
        onError('Tiada user yang login');
    }
};

const ProfileForm = ({ navigation }) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [hasError, setHasError] = useState(false); // Menambahkan state untuk status kesalahan

    const handleSubmit = () => {
        saveUserData(
            name,
            age,
            gender,
            () => {
                setModalMessage('Berhasil Menyimpan Data!');
                setModalVisible(true);
                setHasError(false); // Tidak ada kesalahan
            },
            (error) => {
                setModalMessage(`Gagal Menyimpan Data: ${error}`);
                setModalVisible(true);
                setHasError(true); // Ada kesalahan
            }
        );
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (!hasError) {
            navigation.navigate('MainPage');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logOutButton}>
                <LogOut navigation={navigation} />
            </View>
            <Welcome title="Welcome" desc="Silahkan lengkapi data anda" />
            <View style={styles.formContainer}>
                <InputForm
                    title="Nama"
                    desc="Ketikkan nama anda"
                    hide={false}
                    value={name}
                    setValue={setName}
                />
                <InputForm
                    title="Jenis Kelamin"
                    desc="Ketik L untuk laki-laki dan P untuk perempuan"
                    hide={false}
                    value={gender}
                    setValue={setGender}
                />
                <InputForm
                    title="Umur"
                    desc="Ketik umur, misal: 20"
                    hide={false}
                    value={age}
                    setValue={setAge}
                />
            </View>
            <Button onPress={handleSubmit} />
            <CustomModal visible={modalVisible} message={modalMessage} onClose={handleModalClose} />
        </View>
    );
};

const InputForm = ({ title, desc, hide, value, setValue }) => {
    return (
        <View style={styles.inputForms}>
            <TextInput
                style={styles.inputForm}
                placeholder={desc}
                placeholderTextColor={'#FFB6A9'}
                secureTextEntry={hide}
                value={value}
                onChangeText={setValue}
            />
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
};

const Button = ({ onPress }) => {
    return (
        <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Mulai Terapi</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileForm;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
    },
    logOutButton: {
        paddingTop: 10,
    },
    formContainer: {
        marginTop: 60,
    },
    inputForms: {
        alignItems: 'center',
        marginBottom: 20,
    },
    inputForm: {
        borderWidth: 1,
        borderColor: '#F9A144',
        width: '90%',
        height: 46,
        borderRadius: 40,
        paddingLeft: 20,
        color: '#D15B46',
        fontSize: 13,
        fontFamily: 'Nunito-Medium',
    },
    titleText: {
        position: 'absolute',
        color: '#D15B46',
        top: -10,
        backgroundColor: '#F5F5F5',
        left: 50,
        paddingVertical: 0,
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
    },
    buttonSection: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#D15B46',
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 40,
        marginBottom: 40,
    },
    buttonText: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#ffffff',
    },
});
