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
    <Card className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
        <Image
          src={product.imageUrls[0]}
          height={80}
          width={80}
          alt={product.name}
          className="w-full h-full object-contain rounded"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 w-full space-y-1">
        <p className="font-semibold text-sm sm:text-base leading-tight line-clamp-2">
          {product.name}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Color: {product?.availableColors} &nbsp; | &nbsp; Stock:{" "}
          {product.stock}
        </p>
        <p className="text-sm sm:text-base font-medium text-black">
          Price: ${product.price}
        </p>
      </div>

      {/* Actions */}
      <div className="flex sm:flex-col md:flex-row sm:items-end md:items-center gap-2 sm:ml-4">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm">Qty</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleDecrement(product._id)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-sm font-medium">{product?.orderQuantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleIncrement(product._id)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

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
  );
}
