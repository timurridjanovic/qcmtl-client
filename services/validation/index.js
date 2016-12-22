export const FIRST_NAME = 'firstName';
export const LAST_NAME = 'lastName';
export const EMAIL = 'email';
export const PHONE = 'phone';
export const PASSWORD = 'password';
export const CONFIRM_PASSWORD = 'confirmPassword';
export const TERMS_AND_CONDITIONS = 'termsAndConditions';
export const DATE = 'date';
export const QUEBEC_DIRECTION = 'quebecDirection';
export const MONTREAL_DIRECTION = 'montrealDirection';
export const NUMBER_OF_PASSENGERS = 'numberOfPassengers';
export const CAR_DESCRIPTION = 'carDescription';
export const ADDITIONAL_DETAILS = 'additionalDetails';
export const SMOKING_NOT_ALLOWED = 'smokingNotAllowed';
export const PETS_NOT_ALLOWED = 'petsNotAllowed';

function isRequired(val, eventType, errorMessage) {
  if (!val.trim()) {
    switch (eventType) {
      case 'blur':
        return { state: 'error', error: errorMessage };
      case 'change':
        return { state: 'clean' };
      default:
        return { state: 'clean' };
    }
  }
  return false;
}

function validateFirstName(firstName, eventType) {
  const required = isRequired(firstName, eventType, 'Vous devez fournir votre prenom');
  if (required) return required;

  if (!firstName.match(/^([a-zA-Z0-9'\-\s]*)$/)) {
    return { state: 'error', error: 'Votre prenom est invalide' };
  }
  return { state: 'valid' };
}


function validateLastName(lastName, eventType) {
  const required = isRequired(lastName, eventType, 'Vous devez fournir votre nom de famille');
  if (required) return required;

  if (!lastName.match(/^([a-zA-Z0-9'\-\s]*)$/)) {
    return { state: 'error', error: 'Votre nom de famille est invalide' };
  }
  return { state: 'valid' };
}

function validateEmail(email, eventType) {
  const required = isRequired(email, eventType, 'Vous devez fournir votre courriel');
  if (required) return required;

  if (eventType === 'blur') {
    if (!email.match(/^([a-zA-Z0-9_-])+([a-zA-Z0-9_.-])*@(([a-zA-Z0-9-])+[.])+([a-zA-Z]{2,})$/)) {
      return { state: 'error', error: 'Votre courriel est invalide' };
    }

    return { state: 'valid' };
  }

  if (!email.match(/^([a-zA-Z0-9-_@.-]*)$/)) {
    return { state: 'error', error: 'Votre courriel ne peut pas contenir de caracteres speciaux' };
  }
  return { state: 'clean' };
}

function validatePhone(phone, eventType) {
  const required = isRequired(phone, eventType, 'Vous devez fournir votre numero de telephone');
  if (required) return required;

  if (eventType === 'blur') {
    if (phone.length !== 10) {
      return { state: 'error', error: 'Votre numero de telephone devrait etre compose de 10 chiffres' };
    }
    return { state: 'valid' };
  }

  return { state: 'clean' };
}

function validatePassword(password, eventType) {
  const required = isRequired(password, eventType, 'Vous devez fournir votre mot de passe');
  if (required) return required;

  return { state: 'valid' };
}

function validateConfirmPassword(confirmPassword, eventType, form) {
  if (eventType === 'blur') {
    const required = isRequired(confirmPassword, eventType, 'Vous devez confirmer votre mot de passe');
    if (required) return required;


    if (confirmPassword !== form.password) {
      return { state: 'error', error: 'Vos mots de passes ne sont pas identiques' };
    }

    return { state: 'valid' };
  }

  return { state: 'clean' };
}

function validateTermsAndConditions(termsAndConditions) {
  if (!termsAndConditions) {
    return { state: 'error', error: 'Vous devez approuver les termes et conditions du service' };
  }
  return { state: 'valid' };
}

export function validate(val, eventType, formType, form) {
  switch (formType) {
    case FIRST_NAME:
      return validateFirstName(val, eventType);
    case LAST_NAME:
      return validateLastName(val, eventType);
    case EMAIL:
      return validateEmail(val, eventType);
    case PHONE:
      return validatePhone(val, eventType);
    case PASSWORD:
      return validatePassword(val, eventType);
    case CONFIRM_PASSWORD:
      return validateConfirmPassword(val, eventType, form);
    case TERMS_AND_CONDITIONS:
      return validateTermsAndConditions(val);
    default:
      return { state: 'valid' };
  }
}

export function validateForm(form) {
  return Object.keys(form).map((field) => {
    const validation = { field, ...validate(form[field], 'blur', field, form) };
    return validation;
  });
}
