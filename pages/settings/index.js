import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Link from '../../shared/components/link';

import * as loginActions from '../../actions/login';

const Settings = ({ dispatch }) =>
  <View style={styles.container}>
    <Text>Settings</Text>
    <Link
      onPress={() => dispatch(loginActions.logout(true))}
      text="Se deconnecter" />
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  }
});

Settings.propTypes = {
  dispatch: React.PropTypes.func
};

export default connect()(Settings);
