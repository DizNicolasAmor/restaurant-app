import axios, { AxiosRequestConfig } from "axios";

export const updateOrderStatus = (orderId: string, status: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const url = `http://localhost:9001/api/orders/${orderId}/patch-status`;
    const options: AxiosRequestConfig = {
      method: "patch",
      url,
      data: { status }
    };

    axios(options)
      .then((response: any) => (response && response.status === 200 ? resolve() : reject()))
      .catch(() => reject());
  });
