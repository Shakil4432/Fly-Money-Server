"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Monitor,
  Globe,
  Server,
  Laptop,
  Network,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface UserDetailsProps {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    hasShop: boolean;
    lastLogin: string;
    createdAt: string;
    clientInfo: {
      device: string;
      browser: string;
      ipAddress: string;
      pcName: string;
      os: string;
      userAgent: string;
    };
  };
  order: {
    _id: string;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    shippingAddress: string;
    finalAmount: number;
    createdAt: string;
  }[];
}

export default function UserDetails({ user, order }: UserDetailsProps) {
  const [tab, setTab] = useState("orders");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sidebar */}
      <Card className="p-6 flex flex-col items-center bg-gradient-to-b from-white to-gray-50  rounded-2xl relative border">
        {/* Profile Picture */}
        <div className="relative">
          <Image
            width={500}
            height={500}
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=random`}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <Pencil size={16} />
          </button>
        </div>

        {/* Name + Role */}
        <h2 className="mt-4 text-lg font-semibold">{user.name}</h2>
        <Badge
          className={`text-xs ${
            user.role === "admin"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.role.toUpperCase()}
        </Badge>

        {/* Details */}
        <div className="mt-6 w-full text-sm space-y-3">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {user.isActive ? (
              <span className="text-green-600 font-medium">Active</span>
            ) : (
              <span className="text-red-600 font-medium">Inactive</span>
            )}
          </p>
          <p>
            <span className="font-semibold">Last Login:</span>{" "}
            {new Date(user.lastLogin).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Button className="mt-6 w-full bg-gradient-to-r from-[#7c3f00] to-[#a55c30] hover:opacity-90">
          Send Message
        </Button>
      </Card>

      {/* Main Content */}
      <Card className="md:col-span-2 p-6 rounded-2xl ">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders">
            <h3 className="font-semibold mb-4 text-gray-800">Order History</h3>
            {order.length === 0 ? (
              <p className="text-sm text-gray-500">No orders found.</p>
            ) : (
              <div className="space-y-4">
                {order.map((o, idx) => (
                  <motion.div
                    key={o._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-lg border hover:shadow-md transition bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">
                          Order #{o._id.slice(-6)}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Payment: {o.paymentMethod} ({o.paymentStatus})
                        </p>
                        <p className="text-gray-500 text-xs">
                          Shipping: {o.shippingAddress}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Total: ${o.finalAmount.toFixed(2)} |{" "}
                          {new Date(o.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`px-2 py-1 text-xs ${
                          o.status === "Completed"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : o.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {o.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity">
            <h3 className="font-semibold mb-4 text-gray-800">Client Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoItem
                icon={<Monitor size={16} />}
                label="Device"
                value={user.clientInfo.device}
              />
              <InfoItem
                icon={<Globe size={16} />}
                label="Browser"
                value={user.clientInfo.browser}
              />
              <InfoItem
                icon={<Laptop size={16} />}
                label="OS"
                value={user.clientInfo.os}
              />
              <InfoItem
                icon={<Server size={16} />}
                label="IP"
                value={user.clientInfo.ipAddress}
              />
              <InfoItem
                icon={<Network size={16} />}
                label="PC Name"
                value={user.clientInfo.pcName}
              />
              <InfoItem
                icon={<Smartphone size={16} />}
                label="User Agent"
                value={user.clientInfo.userAgent}
              />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50 border">
      {icon}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
