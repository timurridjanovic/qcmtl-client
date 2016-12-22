import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import * as colors from '../../shared/colors';
import * as formsActions from '../../actions/forms';
// import * as createAccountActions from '../../actions/create-account';
import DefaultInput from '../../shared/components/default-input';

import {
  NUMBER_OF_PASSENGERS,
  CAR_DESCRIPTION,
  ADDITIONAL_DETAILS,
  SMOKING_NOT_ALLOWED,
  PETS_NOT_ALLOWED
} from '../../services/validation';

export const PAGE = 'rideDetails';

class CreateAccount extends React.Component {
  constructor(props) {
    const { dispatch } = props;
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(type) {
    return (val) => {
      const { dispatch } = this.props;
      dispatch(formsActions.update(PAGE, val, type));
      // dispatch(formsActions.validate(PAGE, val, 'change', type));
    };
  }

  _onSubmit() {
    const { dispatch, forms: { offerRide, rideDetails }, map } = this.props;
    // dispatch(formsActions.submitRideOffer(form));
  }

  render() {
    const { forms: { rideDetails: { form, validation } }, dispatch } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <DefaultInput
            label="Nombre de passagers"
            maxLength={2}
            keyboardType="numeric"
            input={form.numberOfPassengers}
            validation={validation.numberOfPassengers}
            onChangeText={this._onChange(NUMBER_OF_PASSENGERS)} />
          <DefaultInput
            label="Description de votre voiture"
            maxLength={40}
            input={form.carDescription}
            validation={validation.carDescription}
            onChangeText={this._onChange(CAR_DESCRIPTION)} />
          <DefaultInput
            label="Details supplementaires (optionel)"
            maxLength={40}
            input={form.additionalDetails}
            validation={validation.additionalDetails}
            onChangeText={this._onChange(ADDITIONAL_DETAILS)} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingRight: 20 }}>
            <FormLabel>Interdiction de fumer</FormLabel>
            <Switch
              style={{ top: 8 }}
              onValueChange={(value) => {
                dispatch(formsActions.update(PAGE, value, SMOKING_NOT_ALLOWED));
              }}
              value={form.smokingNotAllowed} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
            <FormLabel>Animaux interdits</FormLabel>
            <Switch
              style={{ top: 8 }}
              onValueChange={(value) => {
                dispatch(formsActions.update(PAGE, value, PETS_NOT_ALLOWED));
              }}
              value={form.petsNotAllowed} />
          </View>
        </View>
        <View style={styles.submit}>
          <Button
            icon={{ name: 'done' }}
            iconRight
            onPress={this._onSubmit}
            backgroundColor={colors.orange}
            fontWeight="bold"
            title="Finaliser" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    justifyContent: 'space-between'
  },
  submit: {
    bottom: 64
  }
});

CreateAccount.propTypes = {
  forms: React.PropTypes.object,
  map: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    forms: state.forms,
    map: state.map
  };
}

export default connect(mapStateToProps)(CreateAccount);
