"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import UserDashboardProfile from "../modules/shop/user/UserDashboardProfile";

export default function UserDashboard({
  userProfile,
  orders,
}: {
  userProfile: any;
  orders: any[];
}) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Card */}
      <div>
        <UserDashboardProfile userProfile={userProfile} />
      </div>

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
                <TableHead>Delivery Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <>
                  <TableRow key={order._id} className="hover:bg-gray-50">
                    <TableCell>#{order._id}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(order._id)}
                      >
                        {expandedOrder === order._id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expandable Row for Products */}
                  <AnimatePresence>
                    {expandedOrder === order._id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-gray-50 p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 space-y-3">
                              <h4 className="text-sm font-semibold text-gray-700">
                                Products in this Order
                              </h4>
                              <div className="grid gap-4 md:grid-cols-2">
                                {order.products.map((item: any) => (
                                  <Link
                                    key={item._id}
                                    href={`/product/${item.product.slug}`}
                                    className="flex items-center gap-4 rounded-lg border bg-white p-3 shadow-sm hover:shadow-md transition"
                                  >
                                    <div className="relative h-16 w-16 flex-shrink-0">
                                      <Image
                                        src={item.product.imageUrls[0]}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover rounded-md"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">
                                        {item.product.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Qty: {item.quantity} | Color:{" "}
                                        {item.color || "N/A"}
                                      </p>
                                    </div>
                                    <p className="font-semibold text-gray-700">
                                      $
                                      {(item.unitPrice * item.quantity).toFixed(
                                        2
                                      )}
                                    </p>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
