import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import DefaultInput from '../../shared/components/default-input';
import * as colors from '../../shared/colors';

const SelectLocation = ({ forms: { offerRide: { form, validation } } }) =>
  <View style={styles.container}>
    <View>
      <FormLabel>BLA</FormLabel>
    </View>
    <View style={styles.next}>
      <Button
        icon={{ name: 'keyboard-arrow-right' }}
        onPress={() => {}}
        backgroundColor={colors.orange}
        fontWeight="bold"
        title="Continuez" />
    </View>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    justifyContent: 'space-between'
  },
  next: {
    bottom: 64
  }
});

SelectLocation.propTypes = {
  forms: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    forms: state.forms
  };
}

export default connect(mapStateToProps)(SelectLocation);
