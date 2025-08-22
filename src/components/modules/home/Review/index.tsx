"use client";

import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Arif H.",
    comment:
      "Absolutely love the craftsmanship. My wallet feels premium and durable.",
  },
  {
    name: "Nadia K.",
    comment:
      "Bought a leather tote as a gift — it was beautifully packaged and loved!",
  },
  {
    name: "Tamim R.",
    comment: "Delivery was fast, and the belt fits perfectly. Great quality!",
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#7c3f00]">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Card key={idx} className=" border border-[#7c3f00]/10 ">
              <CardContent className="p-6 space-y-3">
                <p className="text-gray-500">{review.comment}</p>
                <p className="text-[#facc15] font-semibold">— {review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
