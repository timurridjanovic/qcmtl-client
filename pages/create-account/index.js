import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { CheckBox, Button, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import * as colors from '../../shared/colors';
import * as formsActions from '../../actions/forms';
import * as createAccountActions from '../../actions/create-account';
import DefaultInput from '../../shared/components/default-input';

import KeyboardSpacer from '../../shared/keyboard-spacer';
import Link from '../../shared/components/link';
import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PHONE,
  PASSWORD,
  CONFIRM_PASSWORD
} from '../../services/validation';

export const PAGE = 'createAccount';

class CreateAccount extends React.Component {
  constructor(props) {
    const { dispatch } = props;
    super(props);
    this._onBlur = debounce((input, type, form) => dispatch(formsActions.validate(PAGE, input, 'blur', type, form)), 500);

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillUnmount() {
    this._onBlur.cancel();
  }

  _onChange(type) {
    return (val) => {
      const { dispatch } = this.props;
      dispatch(formsActions.update(PAGE, val, type));
      dispatch(formsActions.validate(PAGE, val, 'change', type));
    };
  }

  _onSubmit() {
    const { dispatch, forms: { createAccount: { form } } } = this.props;
    const isValid = dispatch(formsActions.submit(PAGE, form));
    if (isValid) {
      console.log('SUBMIT TO SERVER: ', form);
      dispatch(createAccountActions.submitToServer(form));
    }
  }

  render() {
    const { forms: { createAccount: { form, validation } }, dispatch } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps>
          <DefaultInput
            label="Prenom"
            maxLength={20}
            input={form.firstName}
            validation={validation.firstName}
            onChangeText={this._onChange(FIRST_NAME)}
            onBlur={() => this._onBlur(form.firstName, FIRST_NAME)} />
          <DefaultInput
            label="Nom de famille"
            maxLength={30}
            input={form.lastName}
            validation={validation.lastName}
            onChangeText={this._onChange(LAST_NAME)}
            onBlur={() => this._onBlur(form.lastName, LAST_NAME)} />
          <DefaultInput
            label="Courriel"
            maxLength={45}
            input={form.email}
            validation={validation.email}
            onChangeText={this._onChange(EMAIL)}
            autoCapitalize="none"
            keyboardType="email-address"
            onBlur={() => this._onBlur(form.email, EMAIL)} />
          <DefaultInput
            label="Numero de telephone"
            maxLength={10}
            keyboardType="numeric"
            input={form.phone}
            validation={validation.phone}
            onChangeText={this._onChange(PHONE)}
            onBlur={() => this._onBlur(form.phone, PHONE)} />
          <DefaultInput
            label="Mot de passe"
            maxLength={20}
            secureTextEntry
            input={form.password}
            validation={validation.password}
            onChangeText={this._onChange(PASSWORD)}
            onBlur={() => this._onBlur(form.password, PASSWORD)} />
          <DefaultInput
            label="Confirmer le mot de passe"
            maxLength={20}
            secureTextEntry
            input={form.confirmPassword}
            form={form}
            validation={validation.confirmPassword}
            onChangeText={this._onChange(CONFIRM_PASSWORD)}
            onBlur={() => this._onBlur(form.confirmPassword, CONFIRM_PASSWORD, form)} />
          <Link
            text="Voir les termes et conditions du service" containerStyle={{ padding: 20, paddingBottom: 10 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingRight: 20 }}>
            <FormLabel>J'ai lu et j'accepte les termes et conditions du service</FormLabel>
            <Switch
              style={{ top: 15 }}
              onValueChange={(value) => {
                dispatch(formsActions.termsAndConditionsCheck(PAGE));
              }}
              value={form.termsAndConditions} />
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
        </ScrollView>
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  submit: {
    alignSelf: 'stretch',
    paddingTop: 10
  },
  validationIcon: {
    position: 'absolute',
    right: 20,
    bottom: 10
  }
});

CreateAccount.propTypes = {
  forms: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    forms: state.forms
  };
}

export default connect(mapStateToProps)(CreateAccount);
