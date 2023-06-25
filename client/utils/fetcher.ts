import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetcher = async (url:string, method:string, data?: {}) => {
  const user = await AsyncStorage.getItem('user');
  const bearerToken = user ? `Bearer ${JSON.parse(user).token}` : '';

  return fetch(API_URL + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearerToken,
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