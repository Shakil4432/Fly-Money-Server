export const dynamic = "force-dynamic";
import ManageCategories from "@/components/modules/shop/category";
import { getParentCategores } from "@/services/Category";

const CategoryPage = async () => {
  const { data } = await getParentCategores();

  return (
    <div>
      <ManageCategories categories={data || []}></ManageCategories>
    </div>
  );
};

export default CategoryPage;
