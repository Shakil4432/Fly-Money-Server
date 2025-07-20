"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import Image from "next/image";
import { IProduct } from "@/types/product";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.imageUrls?.[0] || ""
  );
  const [zoomed, setZoomed] = useState<boolean>(false);

  return (
    <section className="max-w-7xl mx-auto p-4 space-y-10 my-10 text-black">
      {/* Zoom Modal */}
      {zoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative">
            <Image
              src={selectedImage}
              width={800}
              height={800}
              alt="Zoomed product image"
              className="rounded max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-2 right-2 text-white bg-black rounded-full p-1 hover:bg-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Top Section */}
      <div className="grid grid-cols-2 items-center gap-10 ">
        {/* Image Section */}
        <div className="">
          <div className="space-y-4">
            {selectedImage && (
              <Image
                src={selectedImage}
                width={400}
                height={400}
                alt="product image"
                className="w-full h-[500px] border   rounded cursor-zoom-in"
                onClick={() => setZoomed(true)}
              />
            )}

            <div className="flex gap-2 ">
              {product?.imageUrls?.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  width={100}
                  height={100}
                  alt="product thumbnail"
                  className="cursor-pointer  rounded border border-[#7c3f00]"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5 h-[600px] w-[500px] px-4  ">
          <div>
            <h1 className="text-2xl font-bold text-gray-400">
              {product?.name}
            </h1>
            <p className="text-gray-400 text-sm">By {product?.brand?.name}</p>
            <div className="flex items-center gap-2 mt-2 text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-500" />
              <span className="text-sm">
                {product?.averageRating?.toFixed(1)} ({product?.ratingCount}{" "}
                reviews)
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Category: {product?.category?.name} | Stock:{" "}
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {product?.availableColors?.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 font-semibold">
                Color:
              </span>
              <div className="flex gap-2">
                {product.availableColors.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-3xl text-gray-400 font-bold">
            $
            {product?.offerPrice > 0
              ? product.offerPrice.toFixed(2)
              : product.price.toFixed(2)}
          </div>

          <div className="flex gap-4">
            <Button
              className="bg-[#7c3f00] text-gray-400 hover:bg-[#7c3f00] hover:text-gray-100"
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="bg-[#090807] text-[#7c3f00] border border-[#7c3f00]  hover:bg-[#090807] hover:text-gray-100"
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="gap-2 overflow-x-auto bg-black">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specification</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="qa">Q&A</TabsTrigger>
            <TabsTrigger value="warranty">Warranty</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <p className="text-gray-700 mt-4 leading-relaxed text-sm">
              {product?.description}
            </p>
          </TabsContent>

          <TabsContent value="specs">
            <ul className="list-disc pl-6 mt-4 text-sm text-gray-700">
              {product?.keyFeatures?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
              <li>Weight: {product.weight}g</li>
            </ul>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="mt-4 space-y-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Overall Rating</h4>
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <span className="text-xl font-bold">
                    {product?.averageRating?.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product?.ratingCount} reviews)
                  </span>
                </div>

                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm w-6">{star}</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300" />
                        <div>
                          <p className="font-semibold text-sm">John Doe</p>
                          <p className="text-xs text-gray-500">July 2025</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">
                        Absolutely love this product. The quality is top-notch
                        and the design is stunning.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductDetails;
