"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import CartProductCard from "./CartProductCard";

const products = Array(5).fill({
  name: "Apple Vision Pro 256GB Storage Spatial Computer VR Headset",
  color: "Black",
  stock: 21,
  price: 240,
  quantity: 2,
});

export default function CartProducts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 text-white">
      {/* Left Side - Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <span className="text-sm text-gray-500">Total Cart Item: 16</span>
        </div>

        <ScrollArea className="space-y-4  pr-4 flex items-center justify-center flex-col gap-8">
          {products.map((product, idx) => (
            <CartProductCard product={product} key={idx}></CartProductCard>
          ))}
        </ScrollArea>

        <div className="flex justify-between">
          <Button variant="default" className="bg-black text-white">
            Continue Shopping
          </Button>
          <Button variant="destructive">Clear Cart</Button>
        </div>
      </div>

      {/* Right Side - Summary */}
      <div className="space-y-6">
        <div className="border rounded p-4 space-y-2">
          <h3 className="font-semibold text-sm">Use Coupon Code</h3>
          <Input placeholder="Promo / Coupon Code" className="text-sm" />
          <Button className="w-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white">
            Apply
          </Button>
        </div>

        <div className="border rounded p-4 space-y-2">
          <h3 className="font-semibold text-sm">Payment Details</h3>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>$2,600.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipment cost</span>
            <span>$22.50</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Grand total</span>
            <span>$2,622.50</span>
          </div>
          <Button className="w-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white">
            Confirm Order
          </Button>
        </div>

        <div className="flex items-start space-x-2 text-xs">
          <Checkbox id="agree" />
          <label htmlFor="agree">
            I have read and agree to the Terms and Conditions, Privacy Policy
            and Refund and Return Policy
          </label>
        </div>
      </div>
    </div>
  );
}
