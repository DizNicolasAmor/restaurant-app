import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { allReducers } from "./reducers";

export interface IProduct {
  currency: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
}
export interface IInitialState {
  products: Array<IProduct>;
  newOrder: object;
  isLoading: boolean;
  isError: boolean;
}
export const initialState: IInitialState = {
  products: [],
  newOrder: {},
  isLoading: false,
  isError: false
};

const middleware = applyMiddleware(thunk);
export const store = createStore(allReducers, initialState, middleware);
