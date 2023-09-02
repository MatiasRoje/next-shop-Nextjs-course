import { fetchJson } from "@/lib/api";
import { stripCartItem } from "@/lib/cart";
import { NextApiHandler } from "next";

const { CMS_URL } = process.env;

const handleCart: NextApiHandler = async (req, res) => {
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

export default handleCart;
