import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import Burger from '../../assets/icons/burger.svg';

const App = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleOutsidePress = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.button}
                onPress={toggleModal}
            >
                <Burger />
            </TouchableHighlight>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => {
                                    navigation.navigate('ProfilePage')
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.optionText}>Akun Saya</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => {
                                    navigation.navigate('RiwayatPage')
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.optionText}>Riwayat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        elevation: 1,
        width: 40,
        height: 43,
        backgroundColor: 'transparent',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    modalOverlay: {
        flex: 1,
    },
    modalContent: {
        width: 130,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginTop: 218, // Adjust this value to position the modal content properly
        marginLeft: 65, // Adjust this value to position the modal content properly
        alignItems: 'center',
    },
    optionButton: {
        padding: 5,
        borderRadius: 10,
        marginBottom: 4,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF7F6',
        elevation: 1
    },
    optionText: {
        fontSize: 14,
        color: '#D15B46',
        fontFamily: 'Nunito-Medium'
    },
});

export default App;
