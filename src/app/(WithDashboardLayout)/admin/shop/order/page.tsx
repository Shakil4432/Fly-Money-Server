import ManageOrders from "@/components/modules/shop/orders/ManageOrders";
import { getAllOrders } from "@/services/order";

const ManageOrderPage = async () => {
  const { data, meta } = await getAllOrders();
  console.log(data);
  console.log(data);
  return (
    <div>
      <ManageOrders orders={data} meta={meta}></ManageOrders>
    </div>
  );
};

export default ManageOrderPage;
