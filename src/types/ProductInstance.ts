// import { Product } from "./Product.ts";

// export interface ProductInstance {
//   id: number;
//   serialNumber: string;
//   productId: number;
//   product: Product;
//   createdAt: Date;
//   updatedAt: Date;
//   // orderItems: OrderItem[];
// }


export interface ProductInstance {
  id: number;
  serialNumber: string;
  productId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  customerId: number;
}
