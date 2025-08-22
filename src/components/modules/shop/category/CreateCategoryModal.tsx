"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

import { createCategory, getAllCategories } from "@/services/Category";

// Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  parent: z.string().optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Updated buildCategoryPaths to include depth for indentation
function buildCategoryPaths(categories: any[]) {
  const result: any[] = [];

  const traverse = (cat: any, parentPath = "", depth = 0) => {
    const fullPath = parentPath ? `${parentPath} > ${cat.name}` : cat.name;
    result.push({ ...cat, fullPath, depth });

    if (cat.children && cat.children.length > 0) {
      cat.children.forEach((child: any) =>
        traverse(child, fullPath, depth + 1)
      );
    }
  };

  categories.forEach((cat) => traverse(cat));
  return result;
}

const CreateCategoryModal = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [categoriesWithPaths, setCategoriesWithPaths] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      parent: "none",
      description: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Load categories on modal open and build full path + depth
  useEffect(() => {
    if (!open) return;

    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res.success) {
          const structured = buildCategoryPaths(res.data);
          setCategoriesWithPaths(structured);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (error: any) {
        toast.error(error.message || "Error fetching categories");
      }
    };

    fetchCategories();
  }, [open]);

  // onSubmit remains unchanged
  const onSubmit = async (data: FormValues) => {
    try {
      const formatted = {
        ...data,
        parent: data.parent === "none" ? null : data.parent,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(formatted));

      if (imageFiles.length > 0) {
        formData.append("icon", imageFiles[0]);
      }

      const res = await createCategory(formData);

      if (res?.success) {
        toast.success(res.message || "Category created");
        form.reset();
        setImageFiles([]);
        setImagePreview([]);
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to create category");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#7c3f00] hover:bg-black">Create Category</Button>
      </DialogTrigger>

      <DialogContent className="bg-[#7c3f00]/40 text-gray-400 space-y-4">
        <DialogHeader className="space-y-4">
          <DialogTitle>Create Category</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl className="bg-black">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Parent Category dropdown with indentation */}
              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "none"}
                    >
                      <FormControl className="bg-black">
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categoriesWithPaths.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            <span
                              style={{ paddingLeft: `${cat.depth * 12}px` }}
                            >
                              {cat.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="h-36 w-full bg-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <div className="mt-2">
                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                ) : (
                  <NMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Icon"
                  />
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#7c3f00] hover:bg-[#7c3f00]/30"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
