import { initialState, IInitialState } from "../store";

interface IAction {
  type: string;
  payload: any;
}

const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
const UPDATE_NEW_ORDER = "UPDATE_NEW_ORDER";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_IS_ERROR = "SET_IS_ERROR";

export const allReducers = (state = initialState, action: IAction): IInitialState => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case UPDATE_NEW_ORDER:
      return {
        ...state,
        newOrder: action.payload
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_IS_ERROR:
      return {
        ...state,
        isError: action.payload
      };
    default:
      return state;
  }
};
