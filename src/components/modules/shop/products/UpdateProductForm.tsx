"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllCategories } from "@/services/Category";

import { updateProduct } from "@/services/products";
import { ICategory } from "@/types/category";

import { IProduct } from "@/types/product";

import { toast } from "sonner";

export default function UpdateProductForm({ product }: { product: IProduct }) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    product?.imageUrls || []
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  // const [brands, setBrands] = useState<IBrand[]>([]);

  const form = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      parentCategory: product?.parentCategory._id || "",
      subCategory: product?.subCategory._id || "",
      thirdSubCategory: product?.thirdSubCategory._id || "",
      brand: product?.brand || "Fly Money",
      stock: product?.stock?.toString() || "",
      weight: product?.weight?.toString() || "",
      availableColors: product?.availableColors?.map((c) => ({ value: c })) || [
        { value: "" },
      ],
      keyFeatures: product?.keyFeatures?.map((f) => ({ value: f })) || [
        { value: "" },
      ],
      specification: Object.entries(product?.specification || {}).map(
        ([key, value]) => ({ key, value })
      ) || [{ key: "", value: "" }],
    },
  });

  const parentCategory = useWatch({
    control: form.control,
    name: "parentCategory",
  });
  const subCategory = useWatch({ control: form.control, name: "subCategory" });

  const getCategoryPath = (
    category: any,
    allCategories: ICategory[]
  ): string => {
    const path: string[] = [];
    let current: ICategory | undefined = category;
    while (current) {
      path.unshift(current.name);
      current = allCategories.find((c) => c._id === current?.parent);
    }
    return path.join(" / ");
  };

  function extractCategoryLevels(data: ICategory[]) {
    const parentCategories: ICategory[] = [];
    const subCategories: { _id: string; name: string; parentId: string }[] = [];
    const thirdLevelCategories: {
      _id: string;
      name: string;
      parentId: string;
      grandParentId: string;
    }[] = [];

    for (const parent of data) {
      if (!parent.parent) {
        parentCategories.push(parent);
        if (parent.children) {
          for (const sub of parent.children) {
            subCategories.push({
              _id: sub._id,
              name: sub.name,
              parentId: parent._id,
            });
            if (sub.children) {
              for (const third of sub.children) {
                thirdLevelCategories.push({
                  _id: third._id,
                  name: third.name,
                  parentId: sub._id,
                  grandParentId: parent._id,
                });
              }
            }
          }
        }
      }
    }
    return { parentCategories, subCategories, thirdLevelCategories };
  }

  const { parentCategories, subCategories, thirdLevelCategories } =
    extractCategoryLevels(categories);

  const filteredSubCategories = subCategories.filter(
    (sub) => sub.parentId === parentCategory
  );
  const filteredThirdCategories = thirdLevelCategories.filter(
    (third) => third.parentId === subCategory
  );

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData] = await Promise.all([getAllCategories()]);
      setCategories(categoriesData?.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    form.setValue("subCategory", "");
    form.setValue("thirdSubCategory", "");
  }, [parentCategory, form]);

  useEffect(() => {
    form.setValue("thirdSubCategory", "");
  }, [subCategory, form]);

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendColor, fields: colorFields } = useFieldArray({
    control: form.control,
    name: "availableColors",
  });
  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });
  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const availableColors = data.availableColors.map(
      (c: { value: string }) => c.value
    );
    const keyFeatures = data.keyFeatures.map((f: { value: string }) => f.value);
    const specification: Record<string, string> = {};
    data.specification.forEach((item: { key: string; value: string }) => {
      if (item.key) specification[item.key] = item.value;
    });

    const modifiedData = {
      ...data,
      availableColors,
      keyFeatures,
      specification,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      weight: parseFloat(data.weight),
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      for (const file of imageFiles) {
        formData.append("images", file);
      }
      const res = await updateProduct(formData, product?._id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="border text-gray-600 border-gray-400 rounded-xl flex-grow max-w-4xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        <h1 className="text-xl font-bold">Update Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Basic Info */}
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-[#7c3f00] font-bold text-xl">
              Basic Information
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="parentCategory"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Parent Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {parentCategories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {getCategoryPath(cat, categories)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="subCategory"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Sub Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {filteredSubCategories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="thirdSubCategory"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Third SubCategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Third Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {filteredThirdCategories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="brand"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || "Fly Money"} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="stock"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="weight"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <div className="my-5">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Textarea className="h-36 resize-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Images */}
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-[#7c3f00] font-bold text-xl">Images</p>
          </div>
          <div className="flex gap-4 ">
            <NMImageUploader
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
              label="Upload Image"
            />
            <ImagePreviewer
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
              imagePreview={imagePreview}
            />
          </div>

          {/* Colors */}
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-[#7c3f00] font-bold text-xl">Available Colors</p>
            <Button
              type="button"
              variant="outline"
              className="size-10"
              onClick={() => appendColor({ value: "" })}
            >
              <Plus className="text-[#7c3f00]" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {colorFields.map((fieldItem, index) => (
              <FormField
                key={fieldItem.id}
                name={`availableColors.${index}.value`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color {index + 1}</FormLabel>
                    <FormControl className="bg-gray-200 text-gray-600">
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Key Features */}
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-[#7c3f00] font-bold text-xl">Key Features</p>
            <Button
              type="button"
              variant="outline"
              className="size-10"
              onClick={() => appendFeatures({ value: "" })}
            >
              <Plus className="text-[#7c3f00]" />
            </Button>
          </div>
          {featureFields.map((fieldItem, index) => (
            <FormField
              key={fieldItem.id}
              name={`keyFeatures.${index}.value`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Feature {index + 1}</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          {/* Specification */}
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-[#7c3f00] font-bold text-xl">Specification</p>
            <Button
              type="button"
              variant="outline"
              className="size-10"
              onClick={() => appendSpec({ key: "", value: "" })}
            >
              <Plus className="text-[#7c3f00]" />
            </Button>
          </div>
          {specFields.map((fieldItem, index) => (
            <div
              key={fieldItem.id}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
            >
              <FormField
                name={`specification.${index}.key`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature name {index + 1}</FormLabel>
                    <FormControl className="bg-gray-200 text-gray-600">
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name={`specification.${index}.value`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature Description {index + 1}</FormLabel>
                    <FormControl className="bg-gray-200 text-gray-600">
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="submit"
            className="mt-5 w-full bg-[#7c3f00] hover:bg-[#7c3f00]/80"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Product..." : "Update Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
