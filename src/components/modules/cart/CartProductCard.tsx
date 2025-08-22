import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeProduct,
} from "@/Redux/features/cartSlice";
import { useAppDispatch } from "@/Redux/hooks";
import { IProduct } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CardProduct extends IProduct {
  orderQuantity: number;
}

export default function CartProductCard({ product }: { product: CardProduct }) {
  const dispatch = useAppDispatch();

  const handleIncrement = (productId: string) => {
    dispatch(incrementOrderQuantity(productId));
  };

  const handleDecrement = (productId: string) => {
    dispatch(decrementOrderQuantity(productId));
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(removeProduct(productId));
  };
  return (
    <div>
      <Card className="flex items-center p-4 mt-4">
        <div className="w-16 h-16 bg-gray-200 rounded">
          <Image
            src={`${product.imageUrls[0]}`}
            height={100}
            width={100}
            alt={`${product.name}`}
            className="w-16 h-16"
          ></Image>
        </div>
        <div className="ml-4 flex-1 space-y-1">
          <p className="font-semibold text-sm leading-tight">{product.name}</p>
          <p className="text-xs text-gray-500">
            Color: {product?.availableColors} &nbsp; | &nbsp; Stock Available:
            {product.stock}
          </p>
          <p className="text-sm font-medium text-black">
            Price: ${product.price}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm">Quantity</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleDecrement(product._id)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-sm">{product?.orderQuantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleIncrement(product._id)}
          >
            <Plus className="w-3 h-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-red-500"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
