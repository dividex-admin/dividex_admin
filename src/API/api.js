const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

// Login
export const LOGIN = BASE_URL + '/api/v1/secured/admin/login';
// Investments
export const ALL_INVESTMENTS = BASE_URL + '/api/v1/home/investments';
export const INVESTMENTS_BY_ID = BASE_URL + '/api/v1/secured/investment';
export const ADD_INVESTMENT = BASE_URL + '/api/v1/secured/investment/add-investment';
export const UPDATE_INVESTMENT = BASE_URL + '/api/v1/secured/investment/update-investment';
// Partners
export const ALL_PARTNERS = BASE_URL + '/api/v1/home/partner-list';
export const PARTNER_BY_ID = BASE_URL + '/api/v1/home/partner';
export const ADD_PARTNER = BASE_URL + '/api/v1/home/create-partner';
export const UPDATE_PARTNER = BASE_URL + '/api/v1/home/update-partner';
// Category
export const PRODUCT_OPTIONS = BASE_URL + '/api/v1/home/investment-categories';
// Image Upload
export const UPLOAD_IMG = BASE_URL +'/api/v1/home/upload'
// Leads
export const ALL_LEADS = BASE_URL + '/api/v1/secured/lead';
export const UPDATE_LEADS = BASE_URL + '/api/v1/home/update-lead';
export const CREATE_LEADS = BASE_URL + '/api/v1/home/create-lead';