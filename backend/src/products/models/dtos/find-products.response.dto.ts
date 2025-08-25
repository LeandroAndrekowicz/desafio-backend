import { ProductsEntity } from "../entities/products.entity";

export class FindproductsResponse {
  products: ProductsEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}