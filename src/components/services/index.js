import axios from 'axios';
import {
  API_GET_ALL_USER,
  API_GET_ALL_CART,
  API_UPDATE_CART,
  API_DELETE_CART,
  API_GET_ALL_SERVICES,
  API_UPDATE_SERVICES,
  API_GET_ALL_PRODUCT,
  API_UPDATE_PRODUCT,
} from './configs';

export const getAllUserAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_USER);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllCart = async () => {
  try {
    const response = await axios.get(API_GET_ALL_CART);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getDeleteCart = async (id) => {
  try {
    const response = await axios.delete(`${API_DELETE_CART}?id=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllServicesAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_SERVICES);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getUpdateService = async (id, body) => {
  try {
    const response = await axios.patch(`${API_UPDATE_SERVICES}/${id}`, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllProductAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_PRODUCT);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getUpdateProduct = async (id, body) => {
  try {
    const response = await axios.patch(`${API_UPDATE_PRODUCT}/${id}`, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
