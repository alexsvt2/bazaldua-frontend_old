import { Customer } from '../types/customer.types';
import { Page } from '../types/page.types';
import { axios } from './axios';

const ENDPOINT = '/customers';

export async function getCustomers(
    page?: number,
) {
    const { data } = await axios.get<Page<Customer>>(ENDPOINT, {
        params: { page },
    })
    return data;
}