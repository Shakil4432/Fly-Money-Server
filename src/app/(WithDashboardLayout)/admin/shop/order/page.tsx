import ManageOrders from "@/components/modules/shop/orders/ManageOrders";
import { getOrdersByAdmin } from "@/services/order";
import { Suspense } from "react";

const ManageOrderPage = async () => {
  const { data, meta } = await getOrdersByAdmin();
  const totalPage = meta?.totalPage ?? 1;
  console.log(data);

  return (
    <div>
      <Suspense>
        <ManageOrders orders={data} totalPage={totalPage}></ManageOrders>
      </Suspense>
    </div>
  );
};

export default ManageOrderPage;
