import React from 'react';
import { connect } from 'react-redux';
import { View, DatePickerIOS, Switch, StyleSheet } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import * as colors from '../../shared/colors';
import * as offerRideActions from '../../actions/offer-ride';
import * as formsActions from '../../actions/forms';
import { DATE, QUEBEC_DIRECTION, MONTREAL_DIRECTION } from '../../services/validation';

const PAGE = 'offerRide';

const OfferRide = ({ forms: { offerRide: { form } }, dispatch, dimensions }) => {
  return (
    <View style={styles.container}>
      <View>
        <FormLabel>Choisissez la date de votre depart</FormLabel>
        <DatePickerIOS
          date={form.date}
          mode="datetime"
          timeZoneOffsetInMinutes={form.timeZoneOffsetInMinutes}
          onDateChange={(date) => dispatch(formsActions.update(PAGE, date, DATE))} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingRight: 20 }}>
          <FormLabel>Vers Quebec</FormLabel>
          <Switch
            style={{ top: 8 }}
            onValueChange={(value) => {
              dispatch(formsActions.update(PAGE, value, QUEBEC_DIRECTION));
              dispatch(formsActions.update(PAGE, !value, MONTREAL_DIRECTION));
            }}
            value={form.quebecDirection} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
          <FormLabel>Vers Montreal</FormLabel>
          <Switch
            style={{ top: 8 }}
            onValueChange={(value) => {
              dispatch(formsActions.update(PAGE, value, MONTREAL_DIRECTION));
              dispatch(formsActions.update(PAGE, !value, QUEBEC_DIRECTION));
            }}
            value={form.montrealDirection} />
        </View>
      </View>
      <View style={styles.next}>
        <Button
          icon={{ name: 'arrow-forward' }}
          iconRight
          onPress={() => dispatch(offerRideActions.goToLocationPage({ form, dimensions }))}
          backgroundColor={colors.orange}
          fontWeight="bold"
          title="Continuez" />
      </View>
    </View>
  );
};

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

OfferRide.propTypes = {
  forms: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    forms: state.forms,
    dimensions: state.dimensions
  };
}

export default connect(mapStateToProps)(OfferRide);
