import AdminDashboard from "@/components/AdminDashboard";
import { getMetaData } from "@/services/meta";

const AdminHomePage = async () => {
  const { data } = await getMetaData();

  return (
    <div>
      <AdminDashboard data={data}></AdminDashboard>
    </div>
  );
};

export default AdminHomePage;
