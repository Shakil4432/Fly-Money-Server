import ManageOrders from "@/components/modules/shop/orders/ManageOrders";
import { getAllOrders } from "@/services/order";
import { Suspense } from "react";

const ManageOrderPage = async () => {
  const { data, meta } = await getAllOrders();
  const totalPage = meta?.totalPage ?? 1;

  return (
    <div>
      <Suspense>
        <ManageOrders orders={data} totalPage={totalPage}></ManageOrders>
      </Suspense>
    </div>
  );
};

export default ManageOrderPage;
