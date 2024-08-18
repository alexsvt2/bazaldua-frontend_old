export interface Customer {
  id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }
  
//   interface Order {
//     id: number;
//     // Add other relevant fields for an Order here
//   }
  
//   interface ProductInstance {
//     id: number;
//     serialNumber: string;
//     productId: number;
//     // Add other relevant fields for a ProductInstance here
//   }