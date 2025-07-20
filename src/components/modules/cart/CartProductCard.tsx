import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IProduct } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

export default function CartProductCard({ product }: { product: IProduct }) {
  return (
    <div>
      <Card className="flex items-center p-4 mt-4">
        <div className="w-16 h-16 bg-gray-200 rounded" />
        <div className="ml-4 flex-1 space-y-1">
          <p className="font-semibold text-sm leading-tight">{product.name}</p>
          <p className="text-xs text-gray-500">
            Color: {product?.availableColors} &nbsp; | &nbsp; Stock Available:{" "}
            {product.stock}
          </p>
          <p className="text-sm font-medium text-black">
            Price: ${product.price}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm">Quantity</span>
          <Button size="icon" variant="outline">
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-sm">{product?.stock}</span>
          <Button size="icon" variant="outline">
            <Plus className="w-3 h-3" />
          </Button>
          <Button size="icon" variant="ghost" className="text-red-500">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
