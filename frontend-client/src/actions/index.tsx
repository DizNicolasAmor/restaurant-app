import axios from "axios";
import { IProduct } from "../store";

export const updateProducts = (products: Array<IProduct>) => ({
  type: "UPDATE_PRODUCTS",
  payload: products
});

export const updateNewOrder = (newOrder: object) => ({
  type: "UPDATE_NEW_ORDER",
  payload: newOrder
});

export const setIsLoading = (bool: boolean) => ({
  type: "SET_IS_LOADING",
  payload: bool
});

export const setIsError = (bool: boolean) => ({
  type: "SET_IS_ERROR",
  payload: bool
});

// should it be here ?
export const fetchProducts = () => (dispatch: any) => {
  dispatch(setIsLoading(true));
  dispatch(setIsError(false));

  axios(`http://localhost:9000/api/products`)
    .then((response: any) => {
      if (response && response.status === 200) dispatch(updateProducts(response.data));
      else dispatch(setIsError(true));

      dispatch(setIsLoading(false));
    })
    .catch(() => {
      dispatch(setIsLoading(false));
      dispatch(setIsError(true));
    });
};
