interface Product {
    id: string;
    name: string;
    price: number;
  }
  interface OrderProduct {
    id: number;
    productId: string;
    isFinish: boolean;
    product: Product;
  }
  
 
  interface Client {
    id: string;
    table: string;
    name: string;
  }
  
  
  export interface Order {
    id: number;
    client: Client; 
    createdAt: string;
    updatedAt: string;
    orderProducts: OrderProduct[];
  }
  

  