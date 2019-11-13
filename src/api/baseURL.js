const dev = process.env.NODE_ENV !== 'production'

export const baseURL = process.env.API_HOST || 'https://api.chatlead.io/app';
export const restURL = `${baseURL}/api`;
export const staticMedia = `https://chatlead.io`;
