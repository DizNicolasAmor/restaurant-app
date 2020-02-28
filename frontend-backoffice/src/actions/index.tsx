import axios from "axios";
import { IProduct, IOrder } from "../store";

export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const SET_IS_ERROR_FETCHING_ORDERS = "SET_IS_ERROR_FETCHING_ORDERS";
export const SET_IS_ERROR_FETCHING_PRODUCTS = "SET_IS_ERROR_FETCHING_PRODUCTS";
export const SET_IS_LOADING_ORDERS = "SET_IS_LOADING_ORDERS";
export const SET_IS_LOADING_PRODUCTS = "SET_IS_LOADING_PRODUCTS";
export const SET_IS_PRODUCT_MODAL_OPENED = "SET_IS_PRODUCT_MODAL_OPENED";
export const SET_PRODUCT_MODAL_CONFIG = "SET_PRODUCT_MODAL_CONFIG";
export const UPDATE_ORDERS = "UPDATE_ORDERS";
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

export const setErrorMessage = (msg: string) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: msg
  };
};

export const setIsErrorFetchingOrders = (bool: boolean) => ({
  type: SET_IS_ERROR_FETCHING_ORDERS,
  payload: bool
});
export const setIsErrorFetchingProducts = (bool: boolean) => ({
  type: SET_IS_ERROR_FETCHING_PRODUCTS,
  payload: bool
});

export const setIsLoadingOrders = (bool: boolean) => ({
  type: SET_IS_LOADING_ORDERS,
  payload: bool
});
export const setIsLoadingProducts = (bool: boolean) => ({
  type: SET_IS_LOADING_PRODUCTS,
  payload: bool
});
export const setIsModalProductOpened = (bool: boolean) => ({
  type: SET_IS_PRODUCT_MODAL_OPENED,
  payload: bool
});

export const setProductModalConfig = (config: {} | IProduct) => ({
  type: SET_PRODUCT_MODAL_CONFIG,
  payload: config
});

export const updateOrders = (orders: Array<IOrder>) => ({
  type: UPDATE_ORDERS,
  payload: orders
});
export const updateProducts = (products: Array<IProduct>) => ({
  type: UPDATE_PRODUCTS,
  payload: products
});

export const fetchOrders = () => (dispatch: any) => {
  dispatch(setIsLoadingOrders(true));
  dispatch(setIsErrorFetchingOrders(false));

  axios(`http://localhost:9001/api/orders`)
    .then((response: any) => {
      if (response && response.status === 200) dispatch(updateOrders(response.data));
      else dispatch(setIsErrorFetchingOrders(true));

      dispatch(setIsLoadingOrders(false));
    })
    .catch(() => {
      dispatch(setIsLoadingOrders(false));
      dispatch(setIsErrorFetchingOrders(true));
    });
};
export const fetchProducts = () => (dispatch: any) => {
  dispatch(setIsLoadingProducts(true));
  dispatch(setIsErrorFetchingProducts(false));

  axios(`http://localhost:9000/api/products`)
    .then((response: any) => {
      if (response && response.status === 200) dispatch(updateProducts(response.data));
      else dispatch(setIsErrorFetchingProducts(true));

      dispatch(setIsLoadingProducts(false));
    })
    .catch(() => {
      dispatch(setIsLoadingProducts(false));
      dispatch(setIsErrorFetchingProducts(true));
    });
};
