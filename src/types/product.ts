type Specification = {
  processor: string;
  ram: string;
  storage: string;
  display: string;
};

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  parentCategory: {
    _id: string;
    name: string;
  };
  subCategory: {
    _id: string;
    name: string;
  };
  thirdSubCategory: {
    _id: string;
    name: string;
  };
  imageUrls: string[];
  isActive: boolean;
  shop: {
    _id: string;
    shopName: string;
  };
  brand: string;
  averageRating: number;
  ratingCount: number;
  availableColors: string[];
  specification: Specification;
  keyFeatures: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  offerPrice: number;
}
