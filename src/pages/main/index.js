import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Bar from '../../assets/bar.svg'

const Main = () => {
  return (
    <View>
      <Bar width={400} height={270}/>
      <Text style={styles.monitoringStatus}>Monitoring Status: Off</Text>
      <Heartbeat/>
    </View>
  )
};

const Heartbeat = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.sectionTitle}>Heartbeat</Text>
        </View>
    )
};

export default Main;

const styles = StyleSheet.create({
    monitoringStatus: {textAlign:'right', marginRight: 20, marginTop:20, fontSize: 16, color: '#f3816c'},
    wrapper: {marginTop: 10, marginLeft: 20},
    sectionTitle: {fontSize: 16, color: '#ffb970', fontWeight: 'bold'},
})