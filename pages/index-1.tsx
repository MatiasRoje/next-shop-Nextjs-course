// Option 1: fetch products on the server side
import Title from "@/components/Title";
import Head from "next/head";

const products = [
  { id: 1, title: "First Product" },
  { id: 2, title: "Second Product" },
];

const HomePage: React.FC = () => {
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
