import { fetchJson } from "@/lib/api";
import { stripCartItem } from "@/lib/cart";
import { NextApiHandler } from "next";

const { CMS_URL } = process.env;

const handleCart: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGetCart(req, res);
    case "POST":
      return handlePostCart(req, res);
    default:
      res.status(405).end();
  }
};

const handleGetCart: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    res.status(200).json(cartItems.map(stripCartItem));
  } catch (err) {
    res.status(401).end();
  }
};

const handlePostCart: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }

  const { productId, quantity } = req.body;
  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productId, quantity }),
    });

    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
};

export default handleCart;
