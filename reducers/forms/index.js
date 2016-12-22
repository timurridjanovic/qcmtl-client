import {
  FORM_TERMS_AND_CONDITIONS_CHECK,
  FORM_UPDATE,
  FORM_VALIDATE
} from '../../actions/forms';

export const initialState = {
  createAccount: {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      termsAndConditions: false
    },
    validation: {
      firstName: {
        state: 'clean',
        error: ''
      },
      lastName: {
        state: 'clean',
        error: ''
      },
      email: {
        state: 'clean',
        error: ''
      },
      phone: {
        state: 'clean',
        error: ''
      },
      password: {
        state: 'clean',
        error: ''
      },
      confirmPassword: {
        state: 'clean',
        error: ''
      }
    }
  },
  loginPage: {
    form: {
      email: '',
      password: ''
    },
    validation: {
      email: {
        state: 'clean',
        error: ''
      },
      password: {
        state: 'clean',
        error: ''
      }
    }
  },
  offerRide: {
    form: {
      date: new Date(),
      timeZoneOffsetInMinutes: (-1) * (new Date()).getTimezoneOffset(),
      quebecDirection: true,
      montrealDirection: false
    },
    validation: {}
  },
  rideDetails: {
    form: {
      numberOfPassengers: '',
      carDescription: '',
      additionalDetails: '',
      petsNotAllowed: true,
      smokingNotAllowed: true
    },
    validation: {
      numberOfPassengers: {
        state: 'clean',
        error: ''
      },
      carDescription: {
        state: 'clean',
        error: ''
      },
      additionalDetails: {
        state: 'clean',
        error: ''
      }
    }
  }
};

export default function formsReducer(state = initialState, action) {
  const page = action.page;
  switch (action.type) {
    case FORM_TERMS_AND_CONDITIONS_CHECK:
      return {
        ...state,
        [page]: {
          ...state[page],
          form: { ...state[page].form, termsAndConditions: !state[page].form.termsAndConditions }
        }
      };
    case FORM_UPDATE:
      return {
        ...state,
        [page]: {
          ...state[page],
          form: { ...state[page].form, [action.formType]: action[action.formType] }
        }
      };
    case FORM_VALIDATE:
      return {
        ...state,
        [page]: {
          ...state[page],
          validation: {
            ...state[page].validation,
            [action.formType]: {
              state: action.validation.state,
              error: action.validation.error
            }
          }
        }
      };
    default:
      return state;
  }
}
