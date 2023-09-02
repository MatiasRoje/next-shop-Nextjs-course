import AddToCartWidget from "@/components/AddToCartWidget";
import Page from "@/components/Page";
import Title from "@/components/Title";
import { useUser } from "@/hooks/user";
import { ApiError } from "@/lib/api";
import { Product, getProduct, getProducts } from "@/lib/products";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
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
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const user = useUser();

  return (
    <Page title={product.title}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center items-center p-4">
          <Title>{product.title}</Title>
          <Image src={product.pictureUrl} alt="" width={640} height={480} />
        </div>
        <div className="p-4 flex flex-col justify-center gap-4">
          <p className="text-justify">{product.description}</p>
          <p className="font-bold">{product.price}</p>
          {user && <AddToCartWidget productId={product.id} />}
        </div>
      </div>
    </Page>
  );
};

export default ProductPage;
