const baseURL = import.meta.env.PROD 
  ? 'https://v9-properties.onrender.com'  // Production URL
  : 'http://localhost:5001'; // For local development
export default baseURL;


