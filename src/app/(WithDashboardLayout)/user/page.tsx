import UserDashboard from "@/components/user/UserDashboard";
import { getMetaData } from "@/services/meta";

const UserDashboardPage = async () => {
  const meta = await getMetaData();
  console.log(meta);
  return (
    <div>
      <UserDashboard></UserDashboard>
    </div>
  );
};

export default UserDashboardPage;
