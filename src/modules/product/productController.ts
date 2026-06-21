import { DB } from '../../models/db';

export class ProductController {
  public static getProductsMap() {
    return DB.getProducts();
  }
}
