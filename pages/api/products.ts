import { Product, getProducts } from "@/lib/products";
import { NextApiHandler } from "next";

const handler: NextApiHandler<Product[]> = async (req, res) => {
  const products = await getProducts();
  res.status(200).json(products);
};

export default handler;
