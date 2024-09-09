import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Welcome from '../../component/welcomeComponent';
import GoogleLogin from '../../component/googleLoginComponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomModal from '../../component/modal/mainModalComponent';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [navigateToProfile, setNavigateToProfile] = useState(false);
    const [navigateToMain, setNavigateToMain] = useState(false);

    const SignIn = () => {
        if (!email || !password) {
            setModalMessage('Semua Kolom Wajib Diisi!');
            setModalVisible(true);
            return;
        }

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                setModalMessage('Berhasil Login!');
                setModalVisible(true);

                // Ambil UID user yang login
                const userId = userCredential.user.uid;

                // Panggil fungsi untuk cek data di Firestore
                checkUserData(userId);
            })
            .catch(err => {
                setModalMessage('Gagal Login: ' + err.message);
                setModalVisible(true);
                console.log(err);
            });
    };

    const checkUserData = async (userId) => {
        try {
            // Ambil data user dari Firestore
            const userDoc = await firestore().collection('users').doc(userId).get();

            if (userDoc.exists) {
                const userData = userDoc.data();

                // Jika data lengkap, set navigateToMain true
                if (userData.name && userData.gender && userData.age) {
                    setNavigateToMain(true);
                } else {
                    // Jika data tidak lengkap, set navigateToProfile true
                    setNavigateToProfile(true);
                }
            } else {
                // Jika dokumen user tidak ada, set navigateToProfile true
                setNavigateToProfile(true);
            }
        } catch (error) {
            console.error("Error getting user data: ", error);
            // Jika terjadi error, set navigateToProfile true
            setNavigateToProfile(true);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);

        // Navigasi sesuai state navigateToMain atau navigateToProfile
        if (navigateToMain) {
            navigation.navigate('MainPage');
            setNavigateToMain(false); // Reset state setelah navigasi
        } else if (navigateToProfile) {
            navigation.navigate('ProfileFormPage');
            setNavigateToProfile(false); // Reset state setelah navigasi
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <View>
                <Welcome title="Masuk" desc="Silahkan Masukkan Akun Anda" />
                <View style={styles.formContainer}>
                    <InputForm title="Email" desc="Ketikkan Email Anda" hide={false} value={email} setValue={setEmail} />
                    <InputForm
                        title="Kata Sandi"
                        desc="Ketikkan kata sandi Anda"
                        hide={true}
                        value={password}
                        setValue={setPassword}
                    />
                </View>
                <Button OnPress={SignIn} />
                <View style={styles.googleLogin}>
                    <GoogleLogin bgcolor={'#FFE1DB'} />
                </View>
                <RegisterRoute navigation={navigation} />
                <CustomModal
                    visible={modalVisible}
                    onClose={handleModalClose}
                    message={modalMessage}
                />
            </View>
        </ScrollView>
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

const Button = ({ OnPress }) => {
    return (
        <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={OnPress}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const RegisterRoute = ({ navigation }) => {
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Belum Punya Akun?</Text>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('RegisterPage')}>
                <Text style={styles.loginButtonText}> Daftar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFE1DB',
        paddingHorizontal: 20,
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
        color: '#D9998D',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
    },
    titleText: {
        position: 'absolute',
        color: '#BF3218',
        top: -10,
        backgroundColor: '#FFE1DB',
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
        marginBottom: 40,
        backgroundColor: '#D15B46',
        paddingVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 40,
    },
    buttonText: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#ffffff',
    },
    googleLogin: {
        marginBottom: 100,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: '#D15B46',
        bottom: 80,
    },
    loginButton: {
        color: '#D15B46',
        bottom: 81,
    },
    loginButtonText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: '#D15B46',
    },
});
