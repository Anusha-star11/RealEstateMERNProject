const baseURL = import.meta.env.PROD 
  ? 'https://realestateapp-tifp.onrender.com'  // Production URL
  : 'http://localhost:5001'; // For local development
export default baseURL;