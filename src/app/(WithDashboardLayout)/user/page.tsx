import UserDashboard from "@/components/user/UserDashboard";
import { getAllOrders } from "@/services/order";
import { getUserProfile } from "@/services/user";

const UserDashboardPage = async () => {
  const { data } = await getUserProfile();
  const { data: orders } = await getAllOrders();
  return (
    <div>
      <UserDashboard userProfile={data} orders={orders}></UserDashboard>
    </div>
  );
};

export default UserDashboardPage;
