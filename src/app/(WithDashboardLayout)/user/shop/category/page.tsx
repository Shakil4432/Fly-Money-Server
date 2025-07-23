import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

const CategoryPage = async () => {
  const { data } = await getAllCategories();

  return (
    <div>
      <ManageCategories categories={data || []}></ManageCategories>
    </div>
  );
};

export default CategoryPage;
