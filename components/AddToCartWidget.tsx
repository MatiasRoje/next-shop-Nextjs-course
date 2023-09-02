import { FormEventHandler, useState } from "react";
import Button from "./Button";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { fetchJson } from "@/lib/api";

interface AddToCartWidgetProps {
  productId: number;
}

const AddToCartWidget: React.FC<AddToCartWidgetProps> = ({ productId }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation(() =>
    fetchJson("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await mutation.mutateAsync();
    router.push("/cart");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-2 items-center w-3/4"
    >
      <input
        type="number"
        value={quantity.toString()}
        onChange={(event) => setQuantity(Number(event.target.value))}
        className="border rounded px-3 py-1"
      />
      {mutation.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button type="submit">Add to cart</Button>
      )}
    </form>
  );
};

export default AddToCartWidget;
