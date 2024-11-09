const baseURL = import.meta.env.PROD 
  ? 'https://anusha-star11.github.io/RealEstateApp/'  // Production URL
  : 'http://localhost:5001'; // For local development
export default baseURL;