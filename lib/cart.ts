export interface CartItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
  };
  quantity: number;
  total: number;
}

export function stripCartItem(cartItem: any): CartItem {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
    total: cartItem.product.price * cartItem.quantity,
  };
}
