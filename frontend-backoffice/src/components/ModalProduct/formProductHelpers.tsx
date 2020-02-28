import * as Yup from "yup";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const getErrorMessage = (error: AxiosError) => {
  const errorStatus = error && error.response && error.response.status;
  let errorMessage: string = "";
  const getMsgFromCustomError = (obj: any) =>
    (obj && obj.response && obj.response.data && obj.response.data.message) || "Please try again later.";
  switch (errorStatus) {
    case 400:
    case 404:
    case 500:
      errorMessage = getMsgFromCustomError(error);
      break;
    default:
      errorMessage = "Please try again later.";
      break;
  }
  return errorMessage;
};

export interface IFormProductInputs {
  disabled: boolean;
  name: string;
  placeholder: string;
  title: string;
  type: string;
}
export interface IFormProductValues {
  currency: string;
  description: string;
  image: string;
  name: string;
  price: number;
}

interface IFormProductConfig {
  inputs: Array<IFormProductInputs>;
  validationSchema: any;
  onSubmit: (
    values: IFormProductValues,
    setSubmitting: (bool: boolean) => void,
    setMessageFromServer: (str: string) => void,
    currentProductId: string
  ) => void;
}

export const formProductConfig: IFormProductConfig = {
  inputs: [
    {
      disabled: false,
      name: "name",
      placeholder: "Product name",
      title: "Name:",
      type: "text"
    },
    {
      disabled: false,
      name: "description",
      placeholder: "Product description",
      title: "Description:",
      type: "text"
    },
    {
      disabled: true,
      name: "image",
      placeholder: "https://via.placeholder.com/210",
      title: "Image:",
      type: "text"
    },
    {
      disabled: false,
      name: "price",
      placeholder: "",
      title: "Price (in cents):",
      type: "number"
    },
    {
      disabled: true,
      name: "currency",
      placeholder: "USD",
      title: "Currency:",
      type: "text"
    }
  ],
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number()
      .positive("Input must be positive")
      .integer("Input must be an integer")
      .min(1, "Number is too low")
      .max(100000, "Number is too big")
      .required("Required")
  }),
  onSubmit: (values, setSubmitting, setMessageFromServer, currentProductId) => {
    const config: AxiosRequestConfig = {
      url: currentProductId ? `http://localhost:9000/api/products/${currentProductId}` : "http://localhost:9000/api/products",
      method: currentProductId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      data: values
    };

    console.warn({ values });
    axios(config)
      .then((response: AxiosResponse) => {
        if ((response && response.status === 201) || response.status === 200) window.location.reload();
        else setMessageFromServer("Unexpected error");

        setSubmitting(false);
      })
      .catch((error: AxiosError) => {
        setMessageFromServer(getErrorMessage(error));
        setSubmitting(false);
      });
  }
};
