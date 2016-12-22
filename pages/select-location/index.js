import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { debounce } from 'lodash';
import * as colors from '../../shared/colors';
import * as mapActions from '../../actions/map';
import * as navigationActions from '../../actions/navigation';
import * as routes from '../../routes';

Geocoder.fallbackToGoogle('AIzaSyDe9RapnS4HBXifNP6GJFyA_tEG-p1DVSo');

const { OFFER_RIDE } = navigationActions;
const shellLaurierQuebec = { description: 'Shell, Boulevard Laurier, Quebec', geometry: { location: { lat: 46.767119, lng: -71.288037 } } };
const berriUqamMontreal = { description: 'Station Berri-UQAM, Montreal', geometry: { location: { lat: 45.514886, lng: -73.559716 } } };
const predefinedPlacesQuebec = [shellLaurierQuebec];
const predefinedPlacesMontreal = [berriUqamMontreal];
const predefinedPlaces = predefinedPlacesQuebec.concat(predefinedPlacesMontreal);

const QUEBEC_LATITUDE = shellLaurierQuebec.geometry.location.lat;
const QUEBEC_LONGITUDE = shellLaurierQuebec.geometry.location.lng;
const MONTREAL_LATITUDE = berriUqamMontreal.geometry.location.lat;
const MONTREAL_LONGITUDE = berriUqamMontreal.geometry.location.lng;

class SelectLocation extends React.Component {
  constructor(props) {
    super(props);

    const QUEBEC = new MapView.AnimatedRegion({
      latitude: QUEBEC_LATITUDE,
      longitude: QUEBEC_LONGITUDE,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    });

    const MONTREAL = new MapView.AnimatedRegion({
      latitude: MONTREAL_LATITUDE,
      longitude: MONTREAL_LONGITUDE,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    });

    const { quebecDirection } = this.props.form;

    this.state = {
      region: quebecDirection ? MONTREAL : QUEBEC,
      choosingForQuebec: !quebecDirection,
      quebec: QUEBEC,
      montreal: MONTREAL,
      location: {},
      listView: 'auto',
      buttonTitle: 'Choisir le depart'
    };
  }

  componentWillMount() {
    this.setLocation = this.setLocation.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onPickLocation = this.onPickLocation.bind(this);
    this.getGeoLocation = debounce(this.getGeoLocation.bind(this), 300);
  }


  componentDidMount() {
    this.setLocation(this.state.region);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.region !== nextProps.region) {
      this.state.region.timing({
        ...nextProps.region,
        duration: 100
      }).start();
    }
  }

  onRegionChange(region) {
    if (!this.state.selectedRegionChange) {
      this.setLocation(region);
    }
    this.setState({ selectedRegionChange: false });
  }

  onPickLocation() {
    const { dispatch, form: { quebecDirection } } = this.props;
    if (this.state.pickUpLocation) {
      dispatch(mapActions.setLocations({ pickUp: this.state.pickUpLocation, dropOff: this.state.location }));
      dispatch(navigationActions.push(OFFER_RIDE, routes.RIDE_DETAILS));
    } else {
      this.setState({ pickUpLocation: this.state.location });
      this.setState({ region: quebecDirection ? this.state.quebec : this.state.montreal });
      this.setState({ choosingForQuebec: !this.state.choosingForQuebec });
      this.setState({ buttonTitle: 'Choisir la destination' });
    }
  }

  getGeoLocation(region) {
    const filteredRegions = predefinedPlaces.filter(place => {
      return place.geometry.location.lat.toFixed(6) === region.latitude.toFixed(6) &&
        place.geometry.location.lng.toFixed(6) === region.longitude.toFixed(6);
    });

    if (filteredRegions.length > 0) {
      const filteredLocation = filteredRegions[0];
      this.setState({ location: filteredLocation });
      this.googlePlaces.setAddressText(filteredLocation.description);
      return false;
    }

    return Geocoder.geocodePosition({ lat: region.latitude, lng: region.longitude }).then(res => {
      if (res.length > 0) {
        const location = res[0];
        this.setState({ location });
        this.googlePlaces.setAddressText(location.formattedAddress);
      }
    }).catch((err) => {
      console.log('BUSY GEO LOCATION: ', err);
    });
  }

  setLocation(region) {
    this.setState({ region });
    this.getGeoLocation(region);
  }

  render() {
    const { width } = this.props.dimensions;
    const { quebecDirection } = this.props.form;
    return (
      <View style={styles.container}>
        <MapView.Animated
          style={styles.mapView}
          region={this.state.region}
          onPress={() => {
            this.setState({ listView: false });
          }}
          onRegionChangeComplete={this.onRegionChange}
          onRegionChange={this.onRegionChange}>
          <MapView.Marker.Animated
            coordinate={this.state.region}>
            <Icon name="location-on" size={50} color={colors.orange} />
          </MapView.Marker.Animated>
        </MapView.Animated>
        <View style={{ width: width - 25, height: 50, top: 80 }}>

          <GooglePlacesAutocomplete
            placeholder="Cherchez une addresse ou un endroit"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            enablePoweredByContainer={false}
            listViewDisplayed={this.state.listView}
            fetchDetails
            textInputProps={{
              autoCorrect: false
            }}
            ref={(ref) => { this.googlePlaces = ref; }}
            renderDescription={(row) => {
              return row.description;
            }} // display street only
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              const latitude = details.geometry.location.lat;
              const longitude = details.geometry.location.lng;

              const region = new MapView.AnimatedRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              });

              this.setState({ region });
              this.setState({ location: details });
              this.setState({ selectedRegionChange: true });
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCEd9D4G-qfhqZFfP7hkehNeRB4gK_1MR4',
              language: 'fr', // language of the results
              location: quebecDirection ? `${MONTREAL_LATITUDE},${MONTREAL_LONGITUDE}` : `${QUEBEC_LATITUDE},${QUEBEC_LONGITUDE}`,
              radius: 300000,
              components: 'country:ca',
              strictbounds: true
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              listView: {
                position: 'absolute',
                top: 44,
                flex: 1,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#7e7e7e'
              },
              predefinedPlacesDescription: {
                color: colors.orange,
              },
            }}
            currentLocation // Will add a 'Current location' button
            currentLocationLabel="Emplacement actuel"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{}}
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              location: {
                latitude: quebecDirection ? MONTREAL_LATITUDE : QUEBEC_LATITUDE,
                longitude: quebecDirection ? MONTREAL_LONGITUDE : QUEBEC_LONGITUDE
              }
            }}
            predefinedPlaces={
              this.state.choosingForQuebec ?
              predefinedPlacesQuebec :
              predefinedPlacesMontreal
            }
          />
        </View>
        <View style={{ bottom: 65, width: width + 5 }}>
          <Button
            onPress={this.onPickLocation}
            backgroundColor={colors.orange}
            fontWeight="bold"
            title={this.state.buttonTitle} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  mapView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  }
});

SelectLocation.propTypes = {
  form: React.PropTypes.object,
  region: React.PropTypes.object,
  dimensions: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

export default connect()(SelectLocation);
