import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Welcome from '../../component/welcomeComponent';
import LogOut from '../../component/logOutComponent'

const ProfileForm = ({ navigation }) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

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
            <Button OnPress={() => console.log('Mulai Terapi')} />
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

const Button = ({ OnPress }) => {
    return (
        <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={OnPress}>
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
        backgroundColor: '#F5F5F5', // Tetap sesuai dengan yang ada
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
        backgroundColor: '#F5F5F5', // Menjaga warna latar belakang
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
        marginBottom: 40, // Sesuaikan margin dengan layout serupa
    },
    buttonText: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#ffffff', // Warna tetap putih
    },
});
