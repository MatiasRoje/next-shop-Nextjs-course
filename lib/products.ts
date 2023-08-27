export interface Product {
  id: number;
  title: string;
}

function stripProduct(product: any): Product {
  return {
    id: product.id,
    title: product.title,
  };
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:1337/products");
  const products = await res.json();
  return products.map(stripProduct);
}
