import Title from "@/components/Title";
import { Product, getProduct, getProducts } from "@/lib/products";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params: { id } }) => {
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: 30,
    };
  } catch (err) {
    return { notFound: true };
  }
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.title} - Next Shop</title>
      </Head>
      <main>
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  );
};

export default ProductPage;
