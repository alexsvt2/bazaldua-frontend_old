export const formatCustomersOptions = (customers: any[]) => {
    return customers.map((customer: any) => ({
        value: customer.id,
        label: customer.name
    }));
}

export const formatProductsOptions = (products: any[]) => {
    return products.map((product: any) => ({
        value: product.id,
        label: product.name
    }));
}

export const formatCustomerProductsOptions = (customerProducts: any[]) => {

    console.log('customerProducts', customerProducts);

    return customerProducts.map((customerProduct: any) => ({
        value: customerProduct.id,
        label: customerProduct.serialNumber
    }));
}