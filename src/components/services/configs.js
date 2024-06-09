const BASE_URL = 'https://slightly-renewed-satyr.ngrok-free.app/api';

// Sign in
export const SIGN_IN_ADMIN = `${BASE_URL}/account/sign-in-admin`;

//Accesory Type
export const API_GET_ALL_ACCESSORY_TYPE = `${BASE_URL}/accessory-type/get-all`;

//email
export const API_SEND_EMAIL_CANCEL_ORDER = `${BASE_URL}/mail/send-mail-cancel-order`;

//User
export const API_GET_ALL_USER_MAIN = `${BASE_URL}/user/get-all-user`;
export const API_GET_ALL_USER = `${BASE_URL}/user/get-all-user`;
export const API_ADD_NEW_USER = `${BASE_URL}/user/create`;
export const API_UPDATE_USER = `${BASE_URL}/user/update`;
export const API_DELETE_USER = `${BASE_URL}/user/delete`;
export const API_GET_USER_INFORMATION = `${BASE_URL}/user/get-user-info`;

export const API_GET_ALL_CART = `${BASE_URL}/cart/get-all`;
export const API_GET_ALL_BILL = `${BASE_URL}/cart/get-bill`;
export const API_UPDATE_CART = `${BASE_URL}/cart/update`;
export const API_UPDATE_STATUS = `${BASE_URL}/cart/update-status`;
export const API_DELETE_CART = `${BASE_URL}/cart/delete`;
export const API_CREATE_BILL = `${BASE_URL}/cart/delete-soft`;
export const API_GET_CART_BY_USER_ID = `${BASE_URL}/cart/get-cart-by-user-id`;


export const API_ADD_CART_DES = `${BASE_URL}/cart-description/add`;
//export const API_DELETE_CART_DES = `${BASE_URL}/cart-description/delete`;
export const API_GET_ALL_CART_DES = `${BASE_URL}/cart-description/get-all`;
export const API_GET_CART_DESCRIPTION_BY_ID = `${BASE_URL}/cart-description/get-cart-description-by-cart-id`;

export const API_ADD_NEW_PRODUCT = `${BASE_URL}/product/create`;
export const API_UPDATE_PRODUCT = `${BASE_URL}/product/update`;
export const API_DELETE_PRODUCT = `${BASE_URL}/product/delete`;
export const API_GET_ALL_PRODUCT = `${BASE_URL}/product/get-all`;
export const API_GET_ALL_PRODUCT_BY_PRODUCT_TYPE = `${BASE_URL}/product/get-products-by-product-type`;

export const API_GET_ALL_MANUFACTURER = `${BASE_URL}/manufacturer/get-all`;

export const API_GET_ALL_PRODUCT_TYPE = `${BASE_URL}/product-type/get-all`;

export const API_GET_ALL_SERVICE_TYPE = `${BASE_URL}/service-type/get-all`;

export const API_GET_ALL_STATUS = `${BASE_URL}/status/get-all`;

//sale
export const API_GET_ALL_SALE = `${BASE_URL}/sale/get-all`;
export const API_CREATE_SALE = `${BASE_URL}/sale/create`;

//sale description
export const API_GET_SALE_DESCRIPTION = `${BASE_URL}/sale-description/get-sale-description-by-id`;
export const API_CREATE_SALE_DESCRIPTION = `${BASE_URL}/sale-description/create`;
 
