"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import Image from "next/image";
import { IProduct } from "@/types/product";
import { createReview, getAllReviews } from "@/services/review";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";

interface Review {
  _id: string;
  user: { name: string };
  rating: number;
  review: string;
  product: IProduct;
  isFlagged?: boolean;
  flaggedReason?: string;
  isVerifiedPurchase?: string;
  createdAt: string;
  updatedAt?: string;
}

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.imageUrls?.[0] || ""
  );
  const [user, setUser] = useState();
  const [zoomed, setZoomed] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getUserFunc = async () => {
      const userInfo = await getCurrentUser();
      setUser(userInfo);
    };
    getUserFunc();
  }, []);

  // Provide default values so fields are registered and `field` won't be undefined.
  const form = useForm({
    defaultValues: {
      review: "",
      rating: 0,
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const onSubmit: SubmitHandler<FormData | FieldValues> = async (data) => {
    // data typed as FormData at runtime
    const reviewData = { ...data, product: product._id };

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await createReview(reviewData);

      if (res.success) {
        toast.success(res.message);

        const allReviews = await getAllReviews();
        const filteredReviews = (allReviews?.data?.result || []).filter(
          (r: Review) => r.product._id === product._id
        );
        setReviews(filteredReviews);
        setIsLoading(true);

        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : product?.averageRating || 0;

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
      <div className="grid grid-cols-2 gap-8 items-start">
        {/* Left Image Section */}
        <div className="flex flex-col gap-4">
          {selectedImage && (
            <Image
              src={selectedImage}
              width={500}
              height={500}
              alt="product image"
              className="w-full h-[380px] border rounded-lg object-cover cursor-zoom-in"
              onClick={() => setZoomed(true)}
            />
          )}

          <div className="grid grid-cols-4 gap-3">
            {product?.imageUrls?.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={100}
                height={100}
                alt={`product thumbnail ${index}`}
                className={`w-full h-20 rounded-md border object-cover cursor-pointer ${
                  selectedImage === img
                    ? "border-[#7c3f00] border-2"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Product Info Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>
          <p className="text-sm text-gray-500">{product?.description}</p>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} Ratings ({reviews.length} Reviews)
            </span>
          </div>

          <p className="text-sm text-gray-500">Brand: {product?.brand}</p>

          <p className="text-lg font-semibold text-gray-800">
            Price:{" "}
            <span className="text-red-500">
              ${Math.ceil(product?.offerPrice)}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Color:</span>
            {["#000000", "#ff6600", "#66cc33", "#00ccff", "#00cccc"].map(
              (color, idx) => (
                <button
                  key={idx}
                  style={{ backgroundColor: color }}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  aria-label={`color-${idx}`}
                />
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button className="px-3 py-1 hover:bg-gray-100">-</button>
              <span className="px-4">2</span>
              <button className="px-3 py-1 hover:bg-gray-100">+</button>
            </div>
            <span className="text-sm text-gray-500">
              Stock Available: {product?.stock}
            </span>
          </div>

          <div className="flex gap-3 mt-2">
            <Button
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              disabled={product?.stock === 0}
            >
              Add to Cart
            </Button>
            <Button
              className="bg-[#7c3f00] text-white hover:bg-[#7c3f00]/80"
              disabled={product?.stock === 0}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="gap-2 overflow-x-auto">
          <TabsTrigger value="specs">Specification</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="specs">
          <ul className="list-disc pl-6 mt-4 text-sm text-gray-700">
            {product?.keyFeatures?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
            <li>Weight: {product?.weight}g</li>
          </ul>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="mt-4 space-y-6">
            {/* Review Form */}
            <Card className="w-full">
              <CardContent className="p-4 w-full">
                <h4 className="font-semibold mb-2">Write a Review</h4>

                <div className="border-2 text-gray-300 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 w-full ">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="my-5 w-full">
                        <FormField
                          control={form.control}
                          name="review"
                          render={({ field }) => (
                            <FormItem className="mb-2">
                              <FormLabel>Review</FormLabel>
                              <FormControl className=" text-gray-600">
                                <Textarea
                                  className="h-36 resize-none"
                                  {...field}
                                  value={field.value}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem className="mt-2">
                              <FormLabel className="!mt-2">Rating</FormLabel>
                              <FormControl>
                                <div className="flex space-x-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-6 w-6 cursor-pointer transition-colors ${
                                        star <= (field?.value ?? 0)
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-400"
                                      }`}
                                      onClick={() => {
                                        if (field?.onChange) {
                                          field.onChange(star);
                                        } else {
                                          // fallback if field is temporarily undefined
                                          setValue("rating", star);
                                        }
                                      }}
                                    />
                                  ))}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="mt-5 w-full bg-[#7c3f00] hover:bg-[#7c3f00]/60"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Add Review....." : "Add Review"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>

            {/* Existing Reviews */}
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <Card key={r._id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300" />
                      <div>
                        <p className="font-semibold text-sm">{r.user?.name}</p>
                        <p className="text-xs text-gray-500">
                          {r.createdAt &&
                          !isNaN(new Date(r.createdAt).getTime())
                            ? new Date(r.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            r.rating >= star
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{r?.review}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductDetails;
