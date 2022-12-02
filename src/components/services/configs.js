const BASE_URL = 'http://localhost:5000/api';

// Sign in
export const SIGN_IN_ADMIN = `${BASE_URL}/account/sign-in-admin`;


export const API_GET_ALL_USER_MAIN = `${BASE_URL}/user/get-all-user`;
export const API_GET_ALL_USER = `${BASE_URL}/user/get-all-user`;
export const API_ADD_NEW_USER = `${BASE_URL}/user/create`;
export const API_UPDATE_USER = `${BASE_URL}/user/update`;
export const API_DELETE_USER = `${BASE_URL}/user/delete`;

export const API_GET_ALL_CART = `${BASE_URL}/cart/get-all`;
export const API_UPDATE_STATUS = `${BASE_URL}/cart/updateStatus`;

export const API_GET_ALL_CART_DES = `${BASE_URL}/cart-description/get-all`;
export const API_GET_BY_ID_CART_DES = `${BASE_URL}/cartDescription/get-cartdes-by-id`;
export const API_ADD_CART_DES = `${BASE_URL}/cartDescription/add`;
export const API_DELETE_CART_DES = `${BASE_URL}/cartDescription/delete`;

export const API_GET_ALL_SERVICE = `${BASE_URL}/service/get-all`;
export const API_ADD_NEW_SERVICE = `${BASE_URL}/service/create`;
export const API_UPDATE_SERVICE = `${BASE_URL}/service/update`;
export const API_DELETE_SERVICE = `${BASE_URL}/service/delete`;

export const API_GET_ALL_PRODUCT_BY_PRODUCT_TYPE = `${BASE_URL}/product/get-products-by-product-type`;
export const API_ADD_NEW_PRODUCT = `${BASE_URL}/product/create`;
export const API_UPDATE_PRODUCT = `${BASE_URL}/product/update`;
export const API_DELETE_PRODUCT = `${BASE_URL}/product/delete`;

export const API_GET_ALL_MANUFACTURER = `${BASE_URL}/manufacturer/get-all`;

export const API_GET_ALL_PRODUCT_TYPE = `${BASE_URL}/productType/get-all`;

export const API_GET_ALL_SERVICE_TYPE = `${BASE_URL}/serviceType/get-all`;

export const API_GET_ALL_STATUS = `${BASE_URL}/status/get-all`;

export const API_GET_ALL_BILL = `${BASE_URL}/bill/get-all`;
export const API_CREATE_BILL = `${BASE_URL}/bill/create`;
