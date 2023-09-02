import { fetchJson } from "@/lib/api";
import { CartItem } from "@/lib/cart";
import { useQuery } from "react-query";

const CART_QUERY_KEY = "cart";

export function useCart() {
  const query = useQuery<CartItem[]>(
    CART_QUERY_KEY,
    async () => {
      try {
        return await fetchJson("/api/cart");
      } catch (err) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000, // NOTE ms
    }
  );

  return query.data;
}
