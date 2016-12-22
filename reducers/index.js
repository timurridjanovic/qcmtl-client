import { combineReducers } from 'redux';
import navigation from './navigation';
import forms from './forms';
import toaster from './toaster';
import login from './login';
import loading from './loading';
import appInit from './app-init';
import tabbar from './tabbar';
import dimensions from './dimensions';
import  map from './map';
import createdRides from './offer-ride';

const rootReducer = combineReducers({
  navigation,
  forms,
  toaster,
  login,
  loading,
  appInit,
  tabbar,
  dimensions,
  map,
  createdRides
});

export default rootReducer;
