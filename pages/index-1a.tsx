// Option 1a: fetch products on the server side with getStaticProps
import { GetStaticProps } from "next";
import Title from "@/components/Title";
import { getProducts, Product } from "@/lib/products";
import Head from "next/head";

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const products = await getProducts();
  return { props: { products } };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
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
