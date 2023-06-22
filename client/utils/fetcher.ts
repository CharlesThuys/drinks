import { API_URL } from '@env';

export const fetcher = async (url:string, method:string, bearer: string | null, data?: {}) => {
  return fetch(API_URL + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer ? 'Bearer ' + bearer : '',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
};