import styles from "./Banner.module.css";
const ProductBanner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div
      className={`${styles.banner} border border-[#7c3f00] rounded-3xl mt-10 flex justify-center items-center text-white`}
    >
      <div className="text-center">
        <h2 className="font-bold text-2xl leading-loose">{title}</h2>
        <p>{path}</p>
      </div>
    </div>
  );
};

export default ProductBanner;
