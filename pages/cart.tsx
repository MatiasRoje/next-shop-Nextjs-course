import Page from "@/components/Page";
import Title from "@/components/Title";
import { useCart } from "@/hooks/cart";
import { CartItem } from "@/lib/cart";

const CartPage: React.FC = () => {
  const cartItems = useCart();

  console.log("[CartPage] cartItems:", cartItems);

  const getTotal = (cart: CartItem[]): number => {
    return cart.reduce((acc: number, cart: CartItem) => acc + cart.total, 0);
  };

  const formatCurrency = (price: number): string => {
    return `€${price.toFixed(2)}`;
  };

  return (
    <Page title="cart">
      <Title>Cart</Title>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-center">Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.product.title}</td>
                <td className="text-center">
                  {formatCurrency(item.product.price)}
                </td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center"> {formatCurrency(item.total)}</td>
              </tr>
            ))}
          <tr>
            <td className="text-center font-bold">Total</td>
            <td></td>
            <td></td>
            <td className="text-center">
              {cartItems && formatCurrency(getTotal(cartItems))}
            </td>
          </tr>
        </tbody>
      </table>
    </Page>
  );
};

export default CartPage;
