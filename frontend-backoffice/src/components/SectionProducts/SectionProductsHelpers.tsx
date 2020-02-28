import axios from "axios";

export const deleteProduct = (productId: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const url = `http://localhost:9000/api/products/${productId}`;

    axios
      .delete(url)
      .then((response: any) => (response && response.status === 204 ? resolve() : reject()))
      .catch(() => reject());
  });
