import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import * as colors from '../../shared/colors';
import * as formsActions from '../../actions/forms';
import * as loginPageActions from '../../actions/login-page';
import DefaultInput from '../../shared/components/default-input';

import KeyboardSpacer from '../../shared/keyboard-spacer';
import { EMAIL, PASSWORD } from '../../services/validation';

export const PAGE = 'loginPage';

class Login extends React.Component {
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
    const { dispatch, forms: { loginPage: { form } } } = this.props;
    const isValid = dispatch(formsActions.submit(PAGE, form));
    if (isValid) {
      console.log('SUBMIT TO SERVER: ', form);
      dispatch(loginPageActions.submitToServer(form));
    }
  }

  render() {
    const { forms: { loginPage: { form, validation } } } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps>
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
            label="Mot de passe"
            maxLength={20}
            secureTextEntry
            input={form.password}
            validation={validation.password}
            onChangeText={this._onChange(PASSWORD)}
            onBlur={() => this._onBlur(form.password, PASSWORD)} />
          <View style={styles.submit}>
            <Button
              icon={{ name: 'done' }}
              iconRight
              onPress={this._onSubmit}
              backgroundColor={colors.orange}
              fontWeight="bold"
              title="Se Connecter" />
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
  }
});

Login.propTypes = {
  forms: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    forms: state.forms
  };
}

export default connect(mapStateToProps)(Login);
