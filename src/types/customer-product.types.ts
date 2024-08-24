import { Customer } from "./customer.types";
import { PageMeta } from "./page.types";
import { Product } from "./product.types";
import { ReportItem } from "./report-item.types";

export interface CustomerProduct {
  id: number;
  serialNumber: string;
  internalControl: string;
  tecnoControl: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
  customerId: number;
  product: Product;
  customer: Customer;
  reportItems: ReportItem[];
}

export interface CustomerProductsResponse {
  customerProducts: CustomerProduct[][];
  pageMeta: PageMeta;
}