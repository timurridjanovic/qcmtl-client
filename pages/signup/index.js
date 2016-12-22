import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import Link from '../../shared/components/link';
import * as colors from '../../shared/colors';
import * as navigationActions from '../../actions/navigation';
import * as routes from '../../routes';

const { MAIN } = navigationActions;

const Signup = ({ dispatch }) =>
  <View style={styles.container}>
    <Text style={styles.title}>QcMtl</Text>
    <Text style={styles.subtitle}>Pour voyager avec aisance entre Quebec et Montreal</Text>
    <View>
      <Button
        onPress={() => dispatch(navigationActions.push(MAIN, routes.CREATE_ACCOUNT))}
        backgroundColor={colors.orange}
        fontWeight="bold"
        borderRadius={10}
        title="S'inscrire" />
      <Link
        containerStyle={styles.linkContainer}
        onPress={() => {
          dispatch(navigationActions.push(MAIN, routes.LOGIN));
        }}
        text="Vous avez deja un compte? Connectez-vous" />
    </View>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
    paddingTop: 40
  },
  title: {
    textAlign: 'center',
    fontSize: 60,
    color: colors.black,
  },
  subtitle: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.black
  },
  linkContainer: {
    alignSelf: 'center',
    paddingTop: 10
  },
  link: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

export default connect(mapStateToProps)(Signup);

