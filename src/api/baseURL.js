import axios from 'axios';

const production = process.env.REACT_APP_SERVER === 'production';

export const baseUrl = production
   ? 'https://api.chatlead.io/app'
   : 'https://api.chatlead.io/app';

// https://api.dev.chatlead.io/app

const restURL = `${baseUrl}/api`;
export const staticMedia = `https://api.chatlead.io`;

export const instance = axios.create({
   baseURL: restURL,
   headers: {
      'Content-Type': 'application/json',
   }
});
