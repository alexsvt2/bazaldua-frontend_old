import { useQuery } from "@tanstack/react-query";
import { Page } from "../types/page.types";
import { getCustomerProducts } from "../api/customer-product";
import { CustomerProduct } from "../types/customer-product.types";

export const useGetCustomerProducts = (customerId: number) =>
    useQuery<Page<CustomerProduct>, Error>({
        queryKey: ['customer-products', customerId],
        queryFn: () => getCustomerProducts(customerId),
    });