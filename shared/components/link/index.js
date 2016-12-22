import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as colors from '../../colors';

const Link = ({ onPress, containerStyle = styles.container, linkStyle = styles.link, text }) =>
  <TouchableOpacity
    style={containerStyle}
    onPress={onPress}>
    <Text style={linkStyle}>{text}</Text>
  </TouchableOpacity>;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  link: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Link;
