// types.ts or near your query file

export interface Category {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  discount: number;
  age_required: {
    required: boolean;
    age: number;
  };
  category: Category | string;
  createdAt: string;
  updatedAt: string;
  quantity?: number; // this is for local cart use
}
