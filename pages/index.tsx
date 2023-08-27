// Option 1b: option chosen for the project
import { GetStaticProps } from "next";
import Title from "@/components/Title";
import { getProducts, Product } from "@/lib/products";
import Head from "next/head";
import Link from "next/link";

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const products = await getProducts();
  return { props: { products }, revalidate: 5 * 60 };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
