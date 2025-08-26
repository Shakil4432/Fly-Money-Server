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
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Pencil, Mail, Phone, MapPin, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { UpdateUserProfile } from "@/services/user";
import Image from "next/image";

export default function ProfileCard({ userProfile }: { userProfile: any }) {
  const [editMode, setEditMode] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      phoneNo: userProfile?.phoneNo || "",
      gender: userProfile?.gender || "",
      dateOfBirth: userProfile?.dateOfBirth || "",
      address: userProfile?.address || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const profileData = { ...data };
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(profileData));
      for (const file of imageFiles) {
        formData.append("profilePhoto", file);
      }
      const res = await UpdateUserProfile(formData);
      if (res.success) {
        toast.success(res.message);
        form.reset();
        setEditMode(false);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-20">
      {!editMode ? (
        <Card className="relative h-[60vh] overflow-hidden rounded-2xl shadow-md border bg-gradient-to-br from-gray-50 to-white">
          {/* Cover Header */}
          <div className="h-28 bg-gradient-to-r from-primary/80 to-secondary/70 relative">
            <button
              onClick={() => setEditMode(true)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/70 hover:bg-white shadow"
            >
              <Pencil className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center -mt-14 px-6 pb-6">
            <div className="relative">
              <Image
                width={500}
                height={500}
                src={userProfile?.photo || "https://i.pravatar.cc/150?img=3"}
                alt={userProfile?.name}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>
            <h2 className="mt-3 text-xl font-semibold">{userProfile?.name}</h2>
            <p className="text-gray-500 text-sm">{userProfile?.role}</p>

            {/* Info Grid */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
              <InfoItem
                icon={<Mail size={16} />}
                label="Email"
                value={userProfile?.email}
              />
              <InfoItem
                icon={<Phone size={16} />}
                label="Phone"
                value={userProfile?.phoneNo || "Not set"}
              />
              <InfoItem
                icon={<Calendar size={16} />}
                label="DOB"
                value={userProfile?.dateOfBirth || "Not set"}
              />
              <InfoItem
                icon={<MapPin size={16} />}
                label="Address"
                value={userProfile?.address || "Not set"}
              />
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 rounded-2xl shadow-md border">
          <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter phone"
                          className="bg-gray-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="DD-MM-YYYY"
                          className="bg-gray-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter address"
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <div>
                <p className="font-medium mb-2">Profile Photo</p>
                <div className="flex gap-4 items-start">
                  <NMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Image"
                  />
                  <ImagePreviewer
                    className="flex gap-2"
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="w-full bg-[#7c3f00] hover:bg-[#7c3f00]/80"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      )}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-sm">
      <div className="p-2 rounded-md bg-[#7c3f00]/10 text-[#7c3f00]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
