import { ProductFormValues } from "../components/Reports/NewReport";
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

export async function createProduct(product: ProductFormValues) {
  // const { data } = await axios.post(ENDPOINT, product);
  // return data;
  return await axios.post(ENDPOINT, product);
}
