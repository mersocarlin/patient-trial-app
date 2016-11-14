import {
  PatientListException,
  PatientSaveException,
  PatientValidationException,
} from './exceptions';

export async function fetchPatients () {
  const response = await fetch('/api/v1/patients', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (data.status_code) {
    throw new PatientListException(data.error_message);
  }

  return data;
}

export async function save (payload) {
  const response = await fetch('/api/v1/patients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.status_code) {
    throw new PatientSaveException(data.error_message);
  }

  return data;
}

export async function validate (payload) {
  const error = {};

  Object
    .keys(payload)
    .forEach(key => {
      switch (key) {
        case 'email':
          error[key] = !validateEmail(payload[key]);
          break;
        case 'termsAccepted':
          error[key] = !payload[key];
          break;
        default:
          error[key] = payload[key] === '';
          break;
      }
    });

  const hasError = Object
    .keys(error)
    .filter(key => error[key])
    .length > 0;

  if (hasError) {
    throw new PatientValidationException(error);
  }
}

function validateEmail (email) {
  return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}
