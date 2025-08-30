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
import { useState } from "react";

export default function CartProducts() {
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

  const [coupon, setCoupon] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleCartClear = () => {
    dispatch(clearCart());
    toast.info("Cart cleared!");
  };

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }
    toast.success(`Coupon "${coupon}" applied!`);
    setCoupon("");
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

      if (!isTermsAccepted) {
        throw new Error("You must agree to the terms and conditions.");
      }

      const res = await createOrder(order);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        router.push(res.data.paymentUrl);
      } else {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Cart Items */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <span className="text-sm text-gray-500">
            Total Items: {products.length}
          </span>
        </div>

        {products?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {products.map((item, i) => (
              <CartProductCard key={i} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-6">
            Your cart is empty 🛒
          </p>
        )}

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
          <Button
            variant="outline"
            className="text-[#7c3f00] hover:bg-[#7c3f00]/80 hover:text-white w-full sm:w-auto"
            onClick={() => router.push("/shop")}
          >
            Continue Shopping
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
            onClick={handleCartClear}
            disabled={products.length === 0}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      {/* Right Column - Summary */}
      <div className="flex flex-col gap-6">
        {/* Coupon Code */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="font-semibold mb-3">Use Coupon Code</h3>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Promo / Coupon Code"
            className="w-full border rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring focus:ring-[#7c3f00]/40"
          />
          <Button
            className="w-full bg-[#7c3f00] text-white hover:bg-[#7c3f00]/70"
            onClick={handleApplyCoupon}
          >
            Apply
          </Button>
        </div>

        <Address />

        {/* Payment Details */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
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
            disabled={products.length === 0}
          >
            Confirm Order
          </Button>

          {/* Terms */}
          <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
            <input
              type="checkbox"
              className="mt-1"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            <p>
              I have read and agree to the Terms and Conditions, Privacy Policy,
              and Refund & Return Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
