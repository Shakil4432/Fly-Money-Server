"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const parentCategories = [
  { id: "cat001", name: "Leather Goods" },
  { id: "cat002", name: "Men's Leather Goods" },
  { id: "cat003", name: "Women's Leather Goods" },
];

const CreateCategoryForm = () => {
  const [name, setName] = useState("Wallets");
  const [slug, setSlug] = useState("wallets");
  const [description, setDescription] = useState(
    "Compact and stylish leather wallets."
  );
  const [imageUrl, setImageUrl] = useState("/images/categories/wallets.jpg");
  const [parentId, setParentId] = useState("cat002");
  const [metaTitle, setMetaTitle] = useState("Leather Wallets");
  const [metaDescription, setMetaDescription] = useState(
    "Premium handmade wallets crafted from genuine leather."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category = {
      name,
      slug,
      description,
      image_url: imageUrl,
      parent_id: parentId || null,
      meta: {
        title: metaTitle,
        description: metaDescription,
      },
    };
    console.log("Submitted Category:", category);
    // Call your API or CMS save function here
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8 p-6 rounded-2xl shadow-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-semibold">Create Category</h2>

          <div className="space-y-1">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="slug">Slug</label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="imageUrl">Image URL</label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="parent">Parent Category</label>
            <select
              id="parent"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">None (Top-level)</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="metaTitle">Meta Title</label>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="metaDescription">Meta Description</label>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Save Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCategoryForm;
