import AdminDashboard from "@/components/AdminDashboard";
import { getMetaData } from "@/services/meta";
import { getAllOrders } from "@/services/order";
import { getAllProductsWithoutPagination } from "@/services/products";

const AdminHomePage = async () => {
  const { data } = await getMetaData();
  const { data: products } = await getAllProductsWithoutPagination();

  console.log(products);
  const categoryCounts = products.reduce(
    (acc: Record<string, number>, product: any) => {
      acc[product.parentCategory?.name] =
        (acc[product.parentCategory?.name] || 0) + 1;
      return acc;
    },
    {}
  );

  console.log(categoryCounts);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const pieChartData = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      name: category,
      value: count,
      color: getRandomColor(),
    })
  );

  console.log(pieChartData);

  return (
    <div>
      <AdminDashboard data={data}></AdminDashboard>
    </div>
  );
};

export default AdminHomePage;
