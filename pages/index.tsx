// Option 1b: option chosen for the project
import { GetStaticProps } from "next";
import { getProducts, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Page from "@/components/Page";
import Title from "@/components/Title";

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
    <Page title="Indoor Plants">
      <Title>Indoor plants</Title>
      <div className="flex flex-col justify-center items-center mt-4">
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 content-center justify-center">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
};

export default HomePage;
