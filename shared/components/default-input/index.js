import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DefaultInput = ({
  label,
  input,
  validation,
  maxLength,
  onChangeText,
  onBlur,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  secureTextEntry,
  returnKeyType = 'done',
  onFocus = () => onChangeText(input)
}) =>
  <View>
    <FormLabel>{label}</FormLabel>
    <View>
      <FormInput
        defaultValue={input}
        maxLength={maxLength}
        autoCorrect={false}
        onFocus={onFocus}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        onBlur={onBlur ? onBlur : () => {}} />
      {!!validation.error &&
        <Icon style={styles.validationIcon} name="error" color="red" size={20} />
      }
      {validation.state === 'valid' &&
        <Icon style={styles.validationIcon} name="done" color="green" size={20} />
      }
    </View>
  </View>;

DefaultInput.propTypes = {
  label: React.PropTypes.string.isRequired,
  input: React.PropTypes.string.isRequired,
  validation: React.PropTypes.object.isRequired,
  maxLength: React.PropTypes.number.isRequired,
  onChangeText: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func,
  autoCapitalize: React.PropTypes.string,
  keyboardType: React.PropTypes.string,
  secureTextEntry: React.PropTypes.bool,
  returnKeyType: React.PropTypes.string,
  onFocus: React.PropTypes.func
};

const styles = StyleSheet.create({
  validationIcon: {
    position: 'absolute',
    right: 20,
    bottom: 10
  }
});

export default DefaultInput;
