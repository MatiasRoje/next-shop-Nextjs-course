import ProductCard from "@/components/ProductCard";
import { fetchJson } from "./api";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  pictureUrl: string;
}

const { CMS_URL } = process.env;

export async function getProduct(id: string): Promise<Product> {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map(stripProduct);
}

function stripProduct(product: any): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: `€${product.price.toFixed(2)}`,
    pictureUrl: `${CMS_URL}${product.picture.url}`,
  };
}
