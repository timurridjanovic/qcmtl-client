import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as offerRideActions from '../../actions/offer-ride';
import * as routes from '../../routes';
import * as colors from '../../shared/colors';

const RideCreationSuccess = ({ dispatch }) =>
  <View style={styles.container}>
    <Text>Votre depart a ete cree</Text>
    <Button
      onPress={() => dispatch(offerRideActions.resetToRideCreation())}
      backgroundColor={colors.orange}
      fontWeight="bold"
      title="Creer un autre depart" />
  </View>;

RideCreationSuccess.propTypes = {
  dispatch: React.PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 64,
    paddingBottom: 60
  }
});

export default connect()(RideCreationSuccess);
