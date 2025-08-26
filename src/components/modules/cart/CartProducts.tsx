"use client";

import { Button } from "@/components/ui/button";
import {
  citySelector,
  clearCart,
  grandTotalSelector,
  orderProductsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/Redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";

import CartProductCard from "./CartProductCard";
import Address from "./Address";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/cart";

export default function CartProducts() {
  const cartItems = [
    {
      id: 1,
      name: "Apple Vision Pro 256GB Storage Spatial Computer VR Headset",
      color: "Black",
      stock: 21,
      price: 240,
      quantity: 2,
      image: "/placeholder.png",
    },
    // Duplicate for demo purposes
    {
      id: 2,
      name: "Apple Vision Pro 256GB Storage Spatial Computer VR Headset",
      color: "Black",
      stock: 21,
      price: 240,
      quantity: 2,
      image: "/placeholder.png",
    },
    {
      id: 3,
      name: "Apple Vision Pro 256GB Storage Spatial Computer VR Headset",
      color: "Black",
      stock: 21,
      price: 240,
      quantity: 2,
      image: "/placeholder.png",
    },
    // Duplicate for demo purposes
    {
      id: 4,
      name: "Apple Vision Pro 256GB Storage Spatial Computer VR Headset",
      color: "Black",
      stock: 21,
      price: 240,
      quantity: 2,
      image: "/placeholder.png",
    },
    {
      id: 5,
      name: "Apple Vision Pro 256GB Storage Spatial Computer VR Headset",
      color: "Black",
      stock: 21,
      price: 240,
      quantity: 2,
      image: "/placeholder.png",
    },
    // Duplicate for demo purposes
    {
      id: 6,
      name: "Apple Vision Pro 256GB Storage Spatial Computer VR Headset",
      color: "Black",
      stock: 21,
      price: 240,
      quantity: 2,
      image: "/placeholder.png",
    },
  ];

  const products = useAppSelector(orderProductsSelector);
  const dispatch = useAppDispatch();

  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const order = useAppSelector(orderSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const city = useAppSelector(citySelector);
  const user = useUser();
  const router = useRouter();
  const cartProducts = useAppSelector(orderProductsSelector);

  const handleCartClear = () => {
    dispatch(clearCart());
  };

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first.");
      }

      if (!city) {
        throw new Error("City is missing");
      }
      if (!shippingAddress) {
        throw new Error("Shipping address is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      const res = await createOrder(order);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        router.push(res.data.paymentUrl);
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-6">
      {/* Left Column - Cart Items */}
      <div className="col-span-2 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <span className="text-sm text-gray-500">
            Total Cart Item: {cartItems.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {products?.map((item, i) => (
            <CartProductCard key={i} product={item}></CartProductCard>
            // <div
            //   key={item.id}
            //   className="flex items-center gap-4 border rounded-lg p-3"
            // >
            //   <Image
            //     src={item.image}
            //     alt={""}
            //     width={100}
            //     height={50}
            //     className="rounded-md border"
            //   />
            //   <div className="flex-1">
            //     <h3 className="font-semibold text-gray-800">{item.name}</h3>
            //     <p className="text-sm text-gray-500">
            //       Color: <span className="font-medium">{item.color}</span>{" "}
            //       &nbsp; Stock Available:{" "}
            //       <span className="font-medium">{item.stock}</span>
            //     </p>
            //     <p className="font-bold mt-1">Price: {item.price}$</p>
            //   </div>

            //   {/* Quantity Controls */}
            //   <div className="flex items-center gap-2">
            //     <span className="text-sm text-gray-500">Quantity</span>
            //     <div className="flex items-center border rounded-lg overflow-hidden">
            //       <button className="p-2 hover:bg-gray-100">
            //         <Minus size={14} />
            //       </button>
            //       <span className="px-4">{item.quantity}</span>
            //       <button className="p-2 hover:bg-gray-100">
            //         <Plus size={14} />
            //       </button>
            //     </div>
            //     <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
            //       <Trash2 size={16} />
            //     </button>
            //   </div>
            // </div>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            className=" text-[#7c3f00] hover:bg-[#7c3f00]/80 hover:text-white"
          >
            Continue Shopping
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleCartClear}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      {/* Right Column - Summary */}
      <div className="flex flex-col gap-6">
        {/* Coupon Code */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-3">Use Coupon Code</h3>
          <input
            type="text"
            placeholder="Promo / Coupon Code"
            className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
          />
          <Button className="w-full bg-[#7c3f00] text-white hover:bg-[#7c3f00]/70">
            Apply
          </Button>
        </div>

        <Address></Address>

        {/* Payment Details */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Payment Details</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>{subTotal}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Discount</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipment cost</span>
            <span>{shippingCost}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Grand total</span>
            <span>{grandTotal}</span>
          </div>

          <Button
            onClick={handleOrder}
            className="w-full mt-4 bg-[#7c3f00] text-white hover:bg-[#7c3f00]/70"
          >
            Confirm Order
          </Button>

          {/* Terms */}
          <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
            <input type="checkbox" className="mt-1" />
            <p>
              I have read and agree to the Terms and Conditions, Privacy Policy
              and Refund and Return Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
