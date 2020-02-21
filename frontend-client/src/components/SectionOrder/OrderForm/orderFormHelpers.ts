import * as Yup from "yup";
import { IProduct } from "../../../store";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const getErrorMessage = (error: AxiosError) => {
  const errorStatus = error && error.response && error.response.status;
  let errorMessage: string = "";
  const getMsgFromCustomError = (obj: any) =>
    (obj && obj.response && obj.response.data && obj.response.data.message) || "Please try again later.";
  switch (errorStatus) {
    case 400:
    case 401:
    case 404:
      errorMessage = getMsgFromCustomError(error);
      break;
    default:
      errorMessage = "Please try again later.";
      break;
  }
  return errorMessage;
};

export interface IOrderFormInputs {
  title: string;
  type: string;
  name: string;
  placeholder: string;
}
export interface IOrderFormValues {
  buyername: string;
  buyeremail: string;
  selectedProduct: string;
  quantity: number;
}

interface IOrderFormConfig {
  inputs: Array<IOrderFormInputs>;
  initialValues: IOrderFormValues;
  validationSchema: any;
  onSubmit: (
    values: IOrderFormValues,
    products: Array<IProduct>,
    setSubmitting: (bool: boolean) => void,
    setMessageFromServer: (str: string) => void,
    updateNewOrder: any
  ) => void;
}
export const orderFormConfig: IOrderFormConfig = {
  inputs: [
    {
      title: "Your name:",
      type: "text",
      name: "buyername",
      placeholder: "John Connor"
    },
    {
      title: "Your email:",
      type: "email",
      name: "buyeremail",
      placeholder: "user@gmail.com"
    },
    {
      title: "Select your menu:",
      type: "select",
      name: "selectedProduct",
      placeholder: "My favorite food"
    },
    {
      title: "Quantity:",
      type: "number",
      name: "quantity",
      placeholder: ""
    }
  ],
  initialValues: {
    buyername: "",
    buyeremail: "",
    selectedProduct: "",
    quantity: 1
  },
  validationSchema: Yup.object().shape({
    buyername: Yup.string().required("Required"),
    buyeremail: Yup.string()
      .email("Invalid email")
      .required("Required"),
    selectedProduct: Yup.string().required("Required"),
    quantity: Yup.number()
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer")
      .min(1, "Number is too low")
      .max(100, "Number is too big")
      .required("Required")
  }),
  onSubmit: (values, products, setSubmitting, setMessageFromServer, updateNewOrder) => {
    const nullProduct = { currency: "USD", price: 0, name: "", description: "" };
    const currentProduct = products.find(p => p.id === values.selectedProduct) || nullProduct;
    const data = {
      buyername: values.buyername,
      buyeremail: values.buyeremail,
      quantity: values.quantity,
      productcurrency: currentProduct.currency,
      productdescription: currentProduct.description,
      productname: currentProduct.name,
      productprice: currentProduct.price
    };
    const config: AxiosRequestConfig = {
      url: "http://localhost:9001/api/orders",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data
    };

    axios(config)
      .then((response: AxiosResponse) => {
        if (response && response.status === 201) updateNewOrder(response.data);
        else setMessageFromServer("Unexpected error");

        setSubmitting(false);
      })
      .catch((error: AxiosError) => {
        setMessageFromServer(getErrorMessage(error));
        setSubmitting(false);
      });
  }
};
