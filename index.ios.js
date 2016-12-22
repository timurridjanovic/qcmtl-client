import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  Dimensions,
  View,
  Text,
  Animated,
  StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import config from './config';
import reducers from './reducers';
import * as navigationActions from './actions/navigation';
import * as colors from './shared/colors';
import { toasterYCoord } from './actions/toaster';
import * as api from './api';
import * as appInitActions from './actions/app-init';
import * as dimensionsActions from './actions/dimensions';
import * as routes from './routes';

const { MAIN } = navigationActions;

const middlewares = [thunk];
if (config.logging) {
  /* eslint-disable */
  const createLogger = require('redux-logger');
  /* eslint-enable */

  const logger = createLogger({
    collapsed: (getState, action) => action.type
  });
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));
api.setDispatch(store.dispatch);
store.dispatch(appInitActions.init());


export default class QcMtlClient extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const { height, width } = Dimensions.get('window');
    dispatch(dimensionsActions.setDimensions({ height, width }));
  }

  componentWillUnmount() {
    this._unsetNavigators();
  }

  _unsetNavigators() {
    const { dispatch } = this.props;
    dispatch(navigationActions.unsetNavigators());
  }

  _setNavigator(type, nav) {
    const { dispatch } = this.props;
    if (!this.props.navigation[type].nav) {
      dispatch(navigationActions.setNavigator(type, nav));
    }
  }

  render() {
    const { toaster, loading, appInit } = this.props;
    return (
      <View style={styles.flex}>
        {appInit &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SPLASH PAGE</Text>
          </View>
        }
        {!appInit &&
          <View style={styles.flex}>
            <NavigatorIOS
              ref={(ref) => { this._setNavigator(MAIN, ref); }}
              initialRoute={{
                component: routes.SIGNUP.view,
                title: routes.SIGNUP.title
              }}
              navigationBarHidden
              style={styles.flex}
            />
            <Animated.View style={[styles.toaster, { backgroundColor: toaster.color }]}>
              <Text style={styles.toasterText}>{toaster.text}</Text>
            </Animated.View>
          </View>
        }
        <Spinner visible={loading} />
      </View>
    );
  }
}

QcMtlClient.propTypes = {
  dispatch: React.PropTypes.func,
  toaster: React.PropTypes.object,
  navigation: React.PropTypes.object,
  appInit: React.PropTypes.bool,
  loading: React.PropTypes.bool
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  toaster: {
    transform: [{ translateY: toasterYCoord }],
    height: 70,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    justifyContent: 'center'
  },
  toasterText: {
    color: colors.white,
    paddingLeft: 20
  }
});

function mapStateToProps(state) {
  console.log('MAP2: ', state);
  return {
    navigation: state.navigation,
    toaster: state.toaster,
    loading: state.loading,
    appInit: state.appInit,
    dimensions: state.dimensions
  };
}

const App = connect(mapStateToProps)(QcMtlClient);

AppRegistry.registerComponent('QcMtlClient', () => () => <Provider store={store}><App /></Provider>);
