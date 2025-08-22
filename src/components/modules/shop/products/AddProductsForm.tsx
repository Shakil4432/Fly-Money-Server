"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ICategory } from "@/types/category";
import { IBrand } from "@/types/brand";
import { getAllBrands } from "@/services/brand";
import { addProduct } from "@/services/products";
import { error } from "console";

export default function AddProductsForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [brands, setBrands] = useState<IBrand[] | []>([]);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      parentCategory: "",
      subCategory: "",
      thirdSubCategory: "",
      brand: "",
      stock: "",
      weight: "",
      availableColors: [{ value: "" }],
      keyFeatures: [{ value: "" }],
      specification: [{ key: "", value: "" }],
    },
  });

  const parentCategory = useWatch({
    control: form.control,
    name: "parentCategory",
  });

  const subCategory = useWatch({
    control: form.control,
    name: "subCategory",
  });

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

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendColor, fields: colorFields } = useFieldArray({
    control: form.control,
    name: "availableColors",
  });

  const addColor = () => appendColor({ value: "" });

  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });

  const addFeatures = () => appendFeatures({ value: "" });

  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  const addSpec = () => appendSpec({ key: "", value: "" });

  type Category = {
    _id: string;
    name: string;
    parent: null | Category | string;
    children?: Category[];
  };

  type ExtractedCategories = {
    parentCategories: Category[];
    subCategories: { _id: string; name: string; parentId: string }[];
    thirdLevelCategories: {
      _id: string;
      name: string;
      parentId: string;
      grandParentId: string;
    }[];
  };

  function extractCategoryLevels(data: Category[]): ExtractedCategories {
    const parentCategories: Category[] = [];
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
      const [categoriesData, brandsData] = await Promise.all([
        getAllCategories(),
        getAllBrands(),
      ]);

      setCategories(categoriesData?.data);
      setBrands(brandsData?.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    form.setValue("subCategory", "");
    form.setValue("thirdSubCategory", "");
  }, [parentCategory]);

  useEffect(() => {
    form.setValue("thirdSubCategory", "");
  }, [subCategory]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const availableColors = data.availableColors.map(
      (color: { value: string }) => color.value
    );

    const keyFeatures = data.keyFeatures.map(
      (feature: { value: string }) => feature.value
    );

    const specification: { [key: string]: string } = {};
    data.specification.forEach(
      (item: { key: string; value: string }) =>
        (specification[item.key] = item.value)
    );

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
      const res = await addProduct(formData);

      if (res.success) {
        toast.success(res.message);
        router.push("/user/shop/products");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="border text-gray-600 border-gray-400 rounded-xl flex-grow max-w-4xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        {/* <Logo /> */}

        <h1 className="text-xl font-bold">Add Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {categories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {getCategoryPath(category, categories)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="parentCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {parentCategories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {getCategoryPath(category, categories)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Sub Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {filteredSubCategories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {getCategoryPath(category, categories)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thirdSubCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Third SubCategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {filteredThirdCategories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {getCategoryPath(category, categories)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || "Fly Money"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"Fly Money"}
                  >
                    <FormControl className="bg-gray-200 text-gray-600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-200 text-gray-600">
                      {brands.map((brand) => (
                        <SelectItem key={brand?._id} value={brand?._id}>
                          {brand?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl className="bg-gray-200 text-gray-600">
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Available Colors</p>
              <Button
                variant="outline"
                className="size-10"
                onClick={addColor}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {colorFields.map((colorField, index) => (
                <div key={colorField.id}>
                  <FormField
                    control={form.control}
                    name={`availableColors.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color {index + 1}</FormLabel>
                        <FormControl className="bg-gray-200 text-gray-600">
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Key Features</p>
              <Button
                onClick={addFeatures}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="my-5">
              {featureFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`keyFeatures.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Feature {index + 1}</FormLabel>
                        <FormControl className="bg-gray-200 text-gray-600">
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Specification</p>
              <Button
                onClick={addSpec}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            {specFields.map((specField, index) => (
              <div
                key={specField.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
              >
                <FormField
                  control={form.control}
                  name={`specification.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature name {index + 1}</FormLabel>
                      <FormControl className="bg-gray-200 text-gray-600">
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specification.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Description {index + 1}</FormLabel>
                      <FormControl className="bg-gray-200 text-gray-600">
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Product....." : "Add Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
