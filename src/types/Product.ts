import { ProductInstance } from './ProductInstance';

export interface Product {
  id: number;
  name: string;
  model: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  productInstances: ProductInstance[];
}
