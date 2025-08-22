// // "use client";

// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay, Pagination, Navigation } from "swiper/modules";
// // import Image from "next/image";
// // import "swiper/css";
// // import "swiper/css/pagination";
// // import "swiper/css/navigation";

// // const images = [
// //   "/leather-goods.png",
// //   "/photo.png",
// //   "/leather-5.png",
// //   "/leather-goods-2.png",
// //   "https://www.leatherworldonline.net/cdn/shop/files/Artboard_12_copy.jpg?v=1687452384&width=3840",
// // ];

// // export default function AutoSlider() {
// //   return (
// //     <div className="w-full   mt-10 h-[100vh] overflow-hidden shadow-lg">
// //       <Swiper
// //         spaceBetween={30}
// //         centeredSlides={true}
// //         autoplay={{
// //           delay: 3000,
// //           disableOnInteraction: false,
// //         }}
// //         pagination={{
// //           clickable: false,
// //         }}
// //         navigation={true}
// //         modules={[Autoplay, Pagination, Navigation]}
// //         className="w-full h-full"
// //       >
// //         {images.map((img, index) => (
// //           <SwiperSlide key={index}>
// //             <div className="relative w-full h-[100vh] p-10 ">
// //               <Image
// //                 src={img}
// //                 alt={`Slide ${index}`}
// //                 fill
// //                 className="object-left"
// //                 sizes="100vw"
// //                 quality={100}
// //               />
// //               {/* Black Gradient Overlay */}
// //               <div
// //                 className="absolute inset-0 pointer-events-none"
// //                 style={{
// //                   background:
// //                     "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 30%)",
// //                 }}
// //               />
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </div>
// //   );
// // }

// // components/AnimatedImageGrid.tsx
// // components/HeroBanner.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Category from "../category";

// const imageData = [
//   { src: "/leather-goods.jpg", direction: "top" },
//   { src: "/leather-goods-2.webp", direction: "left" },
//   { src: "/about.png", direction: "bottom" },
//   { src: "/photo1.webp", direction: "right" },
//   { src: "/photo2.webp", direction: "top" },
//   { src: "/about.png", direction: "left" },
// ];

// const getDirectionVariants = (direction: string) => {
//   switch (direction) {
//     case "top":
//       return {
//         initial: { y: -100, opacity: 0 },
//         animate: { y: 0, opacity: 1 },
//       };
//     case "bottom":
//       return { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 } };
//     case "left":
//       return {
//         initial: { x: -100, opacity: 0 },
//         animate: { x: 0, opacity: 1 },
//       };
//     case "right":
//       return { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 } };
//     default:
//       return { initial: { opacity: 0 }, animate: { opacity: 1 } };
//   }
// };

// export default function HeroBanner() {
//   const [visibleIndex, setVisibleIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setVisibleIndex((prev) => (prev + 1) % imageData.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="bg-[#f9f5f0] py-16 px-6 md:px-20 h-[75vh]">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center container mx-auto">
//         {/* ✅ Writing Part */}
//         <div className="space-y-6">
//           <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#7c3f00] leading-tight">
//             Crafted to Last. <br /> Designed to Impress.
//           </h1>
//           <p className="text-gray-700 max-w-md text-lg">
//             Discover our premium collection of handmade leather goods. Timeless
//             designs, exceptional craftsmanship, and superior quality.
//           </p>

//           <div className="flex flex-wrap gap-4">
//             <button className="bg-[#7c3f00] text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
//               Shop Now
//             </button>
//             <button className="bg-white text-gray-900 border px-6 py-3 rounded-xl hover:bg-gray-100 transition">
//               Learn More
//             </button>
//           </div>

//           <div className="flex gap-8 pt-4 text-sm text-gray-600">
//             <div>
//               <strong className="block text-gray-900 font-medium">
//                 🧵 Premium materials
//               </strong>
//               Finest full grain leather
//             </div>
//             <div>
//               <strong className="block text-gray-900 font-medium">
//                 🛠️ Superior craftsmanship
//               </strong>
//               Handmade with care
//             </div>
//           </div>
//         </div>

//         {/* ✅ Animated Image Grid */}
//         <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full  mx-auto">
//           {imageData.map((img, index) => {
//             const variants = getDirectionVariants(img.direction);
//             const isVisible = index === visibleIndex;

//             return (
//               <div
//                 key={index}
//                 className="rounded-2xl overflow-hidden w-full h-40 bg-gray-100 relative"
//               >
//                 <div className="flex items-center justify-center h-full">
//                   img
//                 </div>
//                 <AnimatePresence>
//                   {isVisible && (
//                     <motion.img
//                       key={img.src}
//                       src={img.src}
//                       alt={`img-${index}`}
//                       className="w-full h-full object-cover absolute top-0 left-0"
//                       initial={variants.initial}
//                       animate={variants.animate}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.8 }}
//                     />
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div>
//         <Category></Category>
//       </div>

//       {/* ✅ Brand Logos (Optional)
//       <div className="mt-16 pt-6 border-t border-gray-200 flex flex-wrap justify-center gap-10 text-gray-500 text-sm">
//         {["Nordstrom", "Huckberry", "STAG Provisions", "Need Supply Co."].map(
//           (brand, idx) => (
//             <div key={idx} className="font-medium">
//               {brand}
//             </div>
//           )
//         )}
//       </div> */}
//     </section>
//   );
// }

// components/LeatherHero.tsx
// components/LeatherHeroCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Category from "../category";

export default function AutoSlider() {
  return (
    <div className="bg-[#f9f5f0]/30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4   h-[60vh]">
        {/* Carousel Section */}
        <div className="col-span-2 ">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            modules={[Navigation, Pagination, Autoplay]}
            className=" overflow-hidden"
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className=" bg-gray-100  flex items-center justify-between p-32 h-[60vh]">
                <div>
                  <p className="text-gray-600 text-sm mb-2 uppercase">
                    Exclusive Deal
                  </p>
                  <h2 className="text-6xl md:text-3xl font-bold mb-2 uppercase">
                    Handcrafted Leather Bag
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    <span className="text-red-500 font-bold text-3xl">
                      ₹7,999
                    </span>
                  </p>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
                <Image
                  src="/leather-2.png"
                  alt="Leather Bag"
                  width={500}
                  height={500}
                />
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="bg-[#f9f5f0]/40 flex items-center justify-between  p-32 h-[60vh]">
                <div>
                  <p className="text-gray-600 text-sm mb-2 uppercase">
                    Best Seller
                  </p>
                  <h2 className="text-6xl md:text-3xl font-bold mb-2 uppercase">
                    Premium Leather Wallet
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    <span className="text-red-500 font-bold text-3xl">
                      ₹999
                    </span>
                  </p>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
                <Image
                  src="/wallet.png"
                  alt="Leather Wallet"
                  width={500}
                  height={500}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Side Deal Cards */}
        <div className="flex flex-col gap-4">
          {/* Card 1 */}
          <div className="bg-blue-100/60 p-4  h-[50%] space-y-4 flex items-center justify-center flex-col">
            <p className="font-semibold text-4xl">Buy Leather Belt</p>
            <p className="text-red-500 font-bold  text-2xl">₹1,499</p>
            <button className="mt-2 text-lg text-blue-700 font-semibold underline">
              SHOP NOW
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-green-100/30 p-4  h-[50%] space-y-4 flex flex-col items-center justify-center">
            <p className="font-semibold text-4xl">Buy Leather Shoes</p>
            <p className="text-red-500 font-bold text-2xl">₹2,499</p>
            <button className="mt-2 text-lg text-blue-700 font-semibold underline">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <div>
        <Category></Category>
      </div>
    </div>
  );
}
