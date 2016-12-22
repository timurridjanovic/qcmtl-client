import Signup from '../pages/signup';
import Login from '../pages/login';
import Settings from '../pages/settings';
import CreateAccount from '../pages/create-account';
import Rides from '../pages/rides';
import OfferRide from '../pages/offer-ride';
import SelectLocation from '../pages/select-location';
import RideDetails from '../pages/ride-details';
import RideCreationSuccess from '../pages/ride-creation-success';

export const SIGNUP = { title: '', view: Signup };
export const LOGIN = { title: 'Connexion', view: Login, navBar: true };
export const OFFER_RIDE = { title: 'Annoncer un depart', view: OfferRide, navBar: true, backButtonTitle: ' ' };
export const SELECT_LOCATION = { title: 'Annoncer un depart', view: SelectLocation, navBar: true, backButtonTitle: ' ' };
export const RIDE_DETAILS = { title: 'Annoncer un depart', view: RideDetails, navBar: true };
export const RIDE_CREATION_SUCCESS = { title: 'Annoncer un depart', view: RideCreationSuccess, navBar: true };
export const RIDES = { title: 'Vers ', view: Rides, navBar: true };
export const SETTINGS = { title: 'Mon Compte', view: Settings, navBar: true };
export const CREATE_ACCOUNT = { title: 'Inscription', view: CreateAccount, navBar: true };
