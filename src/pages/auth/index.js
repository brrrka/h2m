import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Welcome from '../../component/welcomeComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../auth/loginPage';
import RegisterPage from '../auth/registerPage';

const Stack = createNativeStackNavigator();

const AuthenticationPage = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="OptionPage" component={AuthenticationOptions} options={{ headerShown: false }} />
                <Stack.Screen name="LoginPage" component={LoginPage} options={styles.loginHeader} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} options={styles.registerHeader} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const AuthenticationOptions = ({ navigation }) => {
    return (
        <View style={styles.authenticationOption}>
            <View style={styles.welcomePlacement}>
                <Welcome title="Welcome" desc="Silahkan Pilih Metode Untuk Masuk" />
            </View>
            <OptionButton title="Sudah Punya Akun?" mainTitle=" Login Disini!" icon={null} route="LoginPage" navigation={navigation} />
            <OptionButton title="Belum Punya Akun?" mainTitle=" Daftar Disini!" icon={null} route="RegisterPage" navigation={navigation} />
            <OtherMethodButton title="Login Dengan" mainTitle=" Google" icon={require('../../assets/icons/google.png')} />
        </View>
    );
};

const OptionButton = ({ title, mainTitle, icon, navigation, route }) => {
    return (
        <View style={styles.optionButtonContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate(route)}>
                {icon ? <Image source={icon} style={styles.icon} /> : null}
                <Text style={styles.optionButtonText}>
                    {title}
                    <Text style={styles.mainOptionButtonText}>{mainTitle}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const OtherMethodButton = ({ title, mainTitle, icon }) => {
    return (
        <View style={styles.otherMethodButtonContainer}>
            <TouchableOpacity style={styles.otherMethodButton}>
                {icon ? <Image source={icon} style={styles.icon} /> : null}
                <Text style={styles.otherMethodButtonText}>
                    {title}
                    <Text style={styles.otherMethodButtonMainText}>{mainTitle}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthenticationPage;

const styles = StyleSheet.create({
    welcomePlacement: {
        bottom: 80
    },
    authenticationOption: {
        flex: 1, // Membuat layar AuthenticationOptions penuh
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    optionButtonContainer: {
        width: '100%',
        marginVertical: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3816C',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
    },
    optionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
    },
    mainOptionButtonText: {
        fontFamily: 'Nunito-ExtraBold',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
        opacity: 0.4,
    },
    otherMethodButtonContainer: {
        width: '100%',
        marginVertical: 50,
    },
    otherMethodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFF',
        padding: 12,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
    },
    otherMethodButtonText: {
        color: '#F3816C',
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
    },
    otherMethodButtonMainText: {
        fontFamily: 'Nunito-ExtraBold',
    },
    loginHeader: {
        headerStyle: {
            backgroundColor: '#F3816C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 20,
        },
        title: 'Login'
    },
    registerHeader: {
        headerStyle: {
            backgroundColor: '#F3816C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 20,
        },
        title: 'Register'
    },
});
