import { Modal, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const SaveModal = ({ visible, onClose, message, onPress }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.text}>{message}</Text>
                    </View>

                    <TextInput style={styles.input} />

                    <View style={styles.confirmButton}>
                        <TouchableOpacity style={styles.positiveButton} >
                            <Text style={styles.positiveText} onPress={onPress}>
                                Simpan
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.negativeButton} onPress={onClose}>
                            <Text style={styles.negativeButtonText}>
                                Batal
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SaveModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        color: '#BF3218',
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
        marginBottom: 20
    },
    confirmButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '80%'
    },
    positiveButton: {
        backgroundColor: '#D15B46',
        alignItems: 'center',
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        flex: 3,
        marginRight: 10,
    },
    positiveText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 14,
        color: '#FFFFFF',
    },
    negativeButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 0.3,
        borderColor: '#F3816C',
        alignItems: 'center',
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        flex: 1,
    },
    input: {
        paddingLeft: 20,
        borderWidth: 0.4,
        width: '80%',
        borderRadius: 30,
        borderColor: '#D15B46',
        fontFamily: 'Nunito-Bold',
        color: '#BF3218'
    },
    negativeButtonText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 14,
        color: '#F3816C'
    }
})