// src/app/dashboard/user/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/services/order";

export default function UserDashboard() {
  const recentOrders = [
    {
      id: 1,
      product: "Leather Wallet",
      date: "2025-08-01",
      status: "Delivered",
    },
    { id: 2, product: "Leather Bag", date: "2025-07-28", status: "Processing" },
    { id: 3, product: "Belt", date: "2025-07-20", status: "Delivered" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/user-avatar.jpg" alt="User" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">Shakil Hossain</CardTitle>
            <p className="text-sm text-muted-foreground">shakil@example.com</p>
          </div>
        </CardHeader>
        <CardContent>
          <Button>Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
