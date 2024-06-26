import axios from 'axios';
import {
  SIGN_IN_ADMIN,
  API_GET_ALL_USER_MAIN,
  API_GET_ALL_USER,
  API_ADD_NEW_USER,
  API_UPDATE_USER,
  API_DELETE_USER,
	API_GET_USER_INFORMATION,
	API_UPDATE_CART,
	API_DELETE_CART,
  API_GET_ALL_CART,
  API_GET_ALL_CART_DES,
  API_ADD_CART_DES,
  API_GET_ALL_PRODUCT,
  API_GET_ALL_PRODUCT_BY_PRODUCT_TYPE,
  API_ADD_NEW_PRODUCT,
  API_UPDATE_PRODUCT,
  API_DELETE_PRODUCT,
  API_GET_ALL_MANUFACTURER,
  API_GET_ALL_PRODUCT_TYPE,
  API_GET_ALL_SERVICE_TYPE,
  API_GET_ALL_STATUS,
  API_UPDATE_STATUS,
  API_GET_ALL_BILL,
  API_CREATE_BILL,
  API_GET_ALL_ACCESSORY_TYPE,
  API_GET_ALL_SALE,
  API_CREATE_SALE,
  API_GET_SALE_DESCRIPTION,
  API_CREATE_SALE_DESCRIPTION,
  API_GET_CART_DESCRIPTION_BY_ID,
  API_GET_CART_BY_USER_ID,
	API_SEND_EMAIL_CANCEL_ORDER,
} from './configs';

export const loginAPI = async (body) => {
  try {
    const response = await axios.post(SIGN_IN_ADMIN, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllUserMainAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_USER_MAIN);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllUserAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_USER);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const addNewUserAPI = async (body) => {
  try {
    const response = await axios.post(API_ADD_NEW_USER, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const editUserAPI = async (body) => {
  try {
    const response = await axios.patch(API_UPDATE_USER, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const deleteUserAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_DELETE_USER}/${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllCartAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_CART);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getCartByUserIdAPI = async (id) => {
  try {
    const response = await axios.get(`${API_GET_CART_BY_USER_ID}?idCardNumber=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const patchUpdateCartAPI = async ({idCart, formData}) => {
	try {
		const response = await axios.patch(`${API_UPDATE_CART}/${idCart}`, formData);
		return response;
	} catch (error) {
		return error?.response?.data || error;
	}
}

// hủy cả đơn hàng
export const deleteCartByIdAPI = async (body) => {
	try {
    const response = await axios.delete(`${API_DELETE_CART}?cartId=${body.cartId}&idUser=${body.idUser}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllCartDesAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_CART_DES);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getCartDescriptionAPI = async (id) => {
  try {
    const response = await axios.get(`${API_GET_CART_DESCRIPTION_BY_ID}?cartId=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const addCarDesAPI = async (body) => {
  try {
    const response = await axios.patch(API_ADD_CART_DES, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllServicesAPI = async () => {
  try {
    const response = await axios.get(`${API_GET_ALL_PRODUCT_BY_PRODUCT_TYPE}?productTypeId=1`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllProductAndServiceAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_PRODUCT);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};



export const getAllProductAPI = async () => {
  try {
    const response = await axios.get(`${API_GET_ALL_PRODUCT_BY_PRODUCT_TYPE}?productTypeId=2`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const addNewProductAPI = async (body) => {
  try {
    const response = await axios({
      method: 'post',
      url: API_ADD_NEW_PRODUCT,
      data: body,
      header: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const editProductAPI = async (body, productId) => {
  try {
    const response = await axios.patch(`${API_UPDATE_PRODUCT}/${productId}`, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const deleteProductAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_DELETE_PRODUCT}/${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllManufacturerAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_MANUFACTURER);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllProductTypeAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_PRODUCT_TYPE);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllServiceTypeAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_SERVICE_TYPE);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllStatusAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_STATUS);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateStatusAPI = async (body) => {
  try {
    const response = await axios.patch(API_UPDATE_STATUS, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllBillAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_BILL);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const createBillAPI = async (id, employeeId) => {
  try {
    const response = await axios.delete(`${API_CREATE_BILL}/${id}`, {
			data: {
				employeeId: employeeId,
			}
		});
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllAccessoryTypeAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_ACCESSORY_TYPE);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllSaleAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_SALE);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

//API_CREATE_SALE
export const addNewSaleAPI = async (data) => {
  try {
    const response = await axios.post(API_CREATE_SALE, data);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

//-----------------SALE_DESCRIPTION--------------
//API_CREATE_SALE_DESCRIPTION
export const addNewProductSaleAPI = async (data) => {
  try {
    const response = await axios.post(API_CREATE_SALE_DESCRIPTION, data);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

//API_GET_SALE_DESCRIPTION_BY_ID
export const getSaleDescriptionAPI = async (id) => {
  try {
    const response = await axios.get(`${API_GET_SALE_DESCRIPTION}?id=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

//----------------USER INFORMATION----------------
//API GET_USER_INFO
export const getUserInfoAPI = async () => {
	try{
		const token = JSON.parse(localStorage.getItem('adminInfo'));
		const response = await axios.get(API_GET_USER_INFORMATION, {
			headers: {authorization: `Bearer ${token.accessToken}`},
		})
		return response;
	}	catch (error){
		console.log("error", error);
	}
}
//---------------SEND EMAIL-------------------
export const sendEmailAPI = async (body) => {
  try {
    const response = await axios.post(API_SEND_EMAIL_CANCEL_ORDER, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
