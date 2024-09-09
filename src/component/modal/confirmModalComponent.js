import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ConfirmModal = ({ visible, onClose, message, positiveOnPress, negativeOnPress }) => {
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
          <View style={styles.confirmButton}>
            <TouchableOpacity style={styles.positiveButton} onPress={positiveOnPress}>
              <Text style={styles.positiveText}>
                Iya
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.negativeButton} onPress={negativeOnPress}>
              <Text style={styles.negativeText}>
                Tidak
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    alignItems: 'center',
    padding: 35,
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
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%'
  },
  positiveButton: {
    backgroundColor: '#D15B46',
    width: '45%',
    alignItems: 'center',
    borderRadius: 100,
    height: 40,
    justifyContent: 'center',
  },
  negativeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderColor: '#F3816C',
    width: '45%',
    alignItems: 'center',
    borderRadius: 100,
    height: 40,
    justifyContent: 'center',
  },
  positiveText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  negativeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#F3816C'
  }
})