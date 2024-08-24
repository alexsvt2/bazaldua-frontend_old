import { Page } from "../types/page.types";
import { Product } from "../types/product.types";
import { axios } from "./axios";

const ENDPOINT = "/products";

export async function getProducts(
  page: number,
) {
  const { data } = await axios.get<Page<Product>>(ENDPOINT, {
    params: { page },
  });
  return data;
}

// export async function getProduct(id: number) {
//   const { data } = await axios.get(ENDPOINT + "/" + id);
//   return data;
// }

// export async function createProduct(product: {
//   name: string;
// }) {
//   const { data } = await axios.post(ENDPOINT, product);
//   return data;
// }

// export async function updateProduct(id: number, product: {
//   name: string;
// }) {
//   const { data } = await axios.put(ENDPOINT + "/" + id, product);
//   return data;
// }

// export async function deleteProduct(id: number) {
//   const { data } = await axios.delete(ENDPOINT + "/" + id);
//   return data;
// }
