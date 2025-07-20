import { ICategory } from "@/types/category";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-opacity-50 rounded-2xl text-center p-4 text-gray-400">
      <h3 className="relative text-lg font-semibold truncate group">
        <span className="group-hover:text-white transition-colors duration-300">
          {category?.name}
        </span>
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#16a34a] transition-all duration-500 group-hover:w-full"></span>
      </h3>
    </div>
  );
};

export default CategoryCard;
