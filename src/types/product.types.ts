import { PageMeta } from "./page.types";

export interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  meta: PageMeta;
}
