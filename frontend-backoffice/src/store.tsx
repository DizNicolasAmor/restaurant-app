import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { allReducers } from "./reducers";
import mockedOrders from "./components/SectionOrders/mockedOrders";
import mockedProducts from "./components/SectionProducts/mockedProducts";

export interface IOrder {
  id: string;
  buyername: string;
  buyeremail: string;
  creationdate: string;
  quantity: number;
  productcurrency: string;
  productdescription: string;
  productname: string;
  productprice: number;
  status: string;
  totalprice: number;

  [key: string]: string | number;
}

export interface IProduct {
  currency: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  [key: string]: string | number;
}

export const NullProduct = {
  currency: "USD",
  description: "",
  id: "",
  image: "https://via.placeholder.com/210",
  name: "",
  price: 100
};

export interface IInitialState {
  errorMessage: string;
  isErrorFetchingOrders: boolean;
  isErrorFetchingProducts: boolean;
  isLoadingOrders: boolean;
  isLoadingProducts: boolean;
  isProductModalOpened: boolean;
  orders: Array<IOrder>;
  productModalConfig: IProduct;
  products: Array<IProduct>;
}

export const initialState: IInitialState = {
  errorMessage: "",
  isErrorFetchingOrders: false,
  isErrorFetchingProducts: false,
  isLoadingOrders: false,
  isLoadingProducts: false,
  isProductModalOpened: false,
  orders: [],
  productModalConfig: NullProduct,
  products: []
};

const middleware = applyMiddleware(thunk);
export const store = createStore(allReducers, initialState, middleware);
