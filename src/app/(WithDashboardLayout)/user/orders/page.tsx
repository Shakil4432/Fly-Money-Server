import UserOrders from "@/components/modules/shop/user/UserOrders";
import { getAllOrders } from "@/services/order";
import React, { Suspense } from "react";

const UserOrderPage = async () => {
  const { data, meta } = await getAllOrders();
  const totalPage = meta?.totalPage ?? 1;
  console.log(data);
  return (
    <div>
      <Suspense>
        <UserOrders orders={data} totalPage={totalPage}></UserOrders>
      </Suspense>
    </div>
  );
};

export default UserOrderPage;
