// Option 2a: fetch products on the client side with useEffect
// but directly from an external API
import Title from "@/components/Title";
import { Product, getProducts } from "@/lib/products";
import Head from "next/head";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  console.log("[HomePage] render:", products);

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
