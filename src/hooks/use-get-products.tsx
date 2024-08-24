import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Page } from "../types/page.types";
import { Product } from "../types/product.types";

export const useGetProducts = (page: number) =>
  useQuery<Page<Product>, Error>({
    queryKey: ['products', page],
    queryFn: () => getProducts(page),
  });
