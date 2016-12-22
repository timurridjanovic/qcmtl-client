import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rides = ({ destination }) =>
  <View style={styles.container}>
    <Text>Rides {destination}</Text>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  }
});

export default Rides;
