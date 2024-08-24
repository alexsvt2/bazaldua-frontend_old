import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../api/customers";
import { Customer } from "../types/customer.types";
import { Page } from "../types/page.types";

export const useGetCustomers = (page: number) =>
    useQuery<Page<Customer>, Error>({
        queryKey: ['customers', page],
        queryFn: () => getCustomers(page),
    });
