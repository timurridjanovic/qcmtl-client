import React from 'react';
import { TabBarIOS, NavigatorIOS, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as routes from '../../../routes';
import * as tabbarActions from '../../../actions/tabbar';
import * as colors from '../../colors';

import * as navigationActions from '../../../actions/navigation';

const { OFFER_RIDE } = navigationActions;

const QUEBEC = 'Quebec';
const MONTREAL = 'Montreal';

const qcDestTitle = `vers ${QUEBEC}`;
const qcDestNavBar = `${routes.RIDES.title} ${QUEBEC}`;

const mtlDestTitle = `vers ${MONTREAL}`;
const mtlDestNavBar = `${routes.RIDES.title} ${MONTREAL}`;

class Tabbar extends React.Component {
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
    const { dispatch, tabbar } = this.props;
    return (
      <TabBarIOS
        unselectedTintColor={colors.black}
        tintColor={colors.orange}>
        <Icon.TabBarItemIOS
          title={qcDestTitle}
          renderAsOriginal
          selected={tabbar.currentTab === 0}
          onPress={() => dispatch(tabbarActions.selectTab(0))}
          iconName="swap-calls"
          iconColor={colors.black}
          selectedIconColor={colors.orange}>
          <NavigatorIOS
            initialRoute={{
              component: routes.RIDES.view,
              title: qcDestNavBar,
              passProps: { destination: QUEBEC }
            }}
            style={styles.flex}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title={mtlDestTitle}
          renderAsOriginal
          selected={tabbar.currentTab === 1}
          onPress={() => dispatch(tabbarActions.selectTab(1))}
          iconName="swap-calls"
          iconColor={colors.black}
          selectedIconColor={colors.orange}>
          <NavigatorIOS
            initialRoute={{
              component: routes.RIDES.view,
              title: mtlDestNavBar,
              passProps: { destination: MONTREAL }
            }}
            style={styles.flex}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Annoncer un depart"
          renderAsOriginal
          selected={tabbar.currentTab === 2}
          onPress={() => dispatch(tabbarActions.selectTab(2))}
          iconName="directions-car"
          iconColor={colors.black}
          selectedIconColor={colors.orange}>
          <NavigatorIOS
            ref={(ref) => { this._setNavigator(OFFER_RIDE, ref); }}
            initialRoute={{
              component: routes.OFFER_RIDE.view,
              backButtonTitle: routes.OFFER_RIDE.backButtonTitle,
              title: routes.OFFER_RIDE.title
            }}
            style={styles.flex}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="compte"
          renderAsOriginal
          selected={tabbar.currentTab === 3}
          onPress={() => dispatch(tabbarActions.selectTab(3))}
          iconName="settings"
          iconColor={colors.black}
          selectedIconColor={colors.orange}>
          <NavigatorIOS
            initialRoute={{
              component: routes.SETTINGS.view,
              title: routes.SETTINGS.title
            }}
            style={styles.flex}
          />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  flex: { flex: 1 }
});

function mapStateToProps(state) {
  return {
    tabbar: state.tabbar,
    navigation: state.navigation
  };
}

export default connect(mapStateToProps)(Tabbar);
