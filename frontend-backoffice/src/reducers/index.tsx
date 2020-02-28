import { initialState, IInitialState } from "../store";
import {
  SET_ERROR_MESSAGE,
  SET_IS_ERROR_FETCHING_ORDERS,
  SET_IS_ERROR_FETCHING_PRODUCTS,
  SET_IS_LOADING_ORDERS,
  SET_IS_LOADING_PRODUCTS,
  SET_IS_PRODUCT_MODAL_OPENED,
  SET_PRODUCT_MODAL_CONFIG,
  UPDATE_ORDERS,
  UPDATE_PRODUCTS
} from "../actions";

interface IAction {
  type: string;
  payload: any;
}

export const allReducers = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };

    case SET_IS_ERROR_FETCHING_ORDERS:
      return {
        ...state,
        isErrorFetchingOrders: action.payload
      };
    case SET_IS_ERROR_FETCHING_PRODUCTS:
      return {
        ...state,
        isErrorFetchingProducts: action.payload
      };

    case SET_IS_LOADING_ORDERS:
      return {
        ...state,
        isLoadingProducts: action.payload
      };
    case SET_IS_LOADING_PRODUCTS:
      return {
        ...state,
        isLoadingProducts: action.payload
      };
    case SET_IS_PRODUCT_MODAL_OPENED:
      return {
        ...state,
        isProductModalOpened: action.payload
      };

    case SET_PRODUCT_MODAL_CONFIG:
      return {
        ...state,
        productModalConfig: action.payload
      };

    case UPDATE_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
};
