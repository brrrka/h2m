// components/CustomModal.js
import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

const CustomModal = ({ visible, onClose, message }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
                        <Text style={styles.textStyle}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '70%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: '100%',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#D15B46',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Nunito-Medium',
    },
    modalText: {
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'Nunito-Medium',
        color: 'black',
        textAlign: 'center',
    },
});

export default CustomModal;
