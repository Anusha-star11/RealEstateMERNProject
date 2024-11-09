const baseURL = import.meta.env.PROD 
  ? '/apicd'  // Production URL
  : 'http://localhost:5001'; // For local development
export default baseURL;


