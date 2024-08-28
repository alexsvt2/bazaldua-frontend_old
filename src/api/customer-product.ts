import { CustomerProduct } from "../types/customer-product.types";
import { CustomerProductFormValues } from "../types/Forms/customer-product-form-values.types";
import { Page } from "../types/page.types";
import { axios } from "./axios";

const ENDPOINT = '/customer-products';

export async function getCustomerProducts(
    page?: number,
) {
    const { data } = await axios.get<Page<CustomerProduct>>(ENDPOINT, {
        params: { page },
    })
    return data;
}

export async function createCustomerProduct(CustomerProduct: CustomerProductFormValues) {
    const { data } = await axios.post(ENDPOINT, CustomerProduct);
    return data;
}