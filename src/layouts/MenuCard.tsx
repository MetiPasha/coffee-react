import { FaShoppingCart } from "react-icons/fa";

interface MenuCardProps {
  img: string;
  title: string;
  value: string;
}

const MenuCard = ({ img, title, value }: MenuCardProps) => {
  return (
    <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg">
      <div>
        <img className="rounded-xl" src={img} alt="img" />
      </div>
      <div className="p-2 mt-5">
        <div className="flex flex-row justify-between">
          <h3 className="font-semibold text-xl">{title}</h3>
          <h3 className="font-semibold text-xl">{value}</h3>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <div className="flex gap-2">
            <button className="px-3 text-sm border-2 border-black bg-brand hover-brand transition-all rounded-lg ">
              Hot
            </button>
            <button className="px-3 text-sm border-2 border-black bg-brand hover-brand transition-all rounded-lg ">
              Cold
            </button>
          </div>
          <span className="flex items-center bg-brand px-3 py-2 rounded-full cursor-pointer">
            <FaShoppingCart className="hover:text-amber-700" size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;