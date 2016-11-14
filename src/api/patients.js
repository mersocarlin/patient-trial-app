import { PatientListException } from './exceptions';

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
