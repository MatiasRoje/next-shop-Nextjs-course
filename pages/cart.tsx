import Page from "@/components/Page";
import Title from "@/components/Title";
import { useCart } from "@/hooks/cart";

const CartPage: React.FC = () => {
  const cartItems = useCart();

  console.log("[CartPage] cartItems:", cartItems);
  return (
    <Page title="cart">
      <Title>Cart</Title>
    </Page>
  );
};

export default CartPage;
