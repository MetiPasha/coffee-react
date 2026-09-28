import { useState } from "react";

interface MenuCardProps {
  img: string;
  title: string;
  value: string;
}

type Temperature = "hot" | "cold";

const MenuCard = ({ img, title, value }: MenuCardProps) => {
  const [temperature, setTemperature] = useState<Temperature>("hot");

  const buttonClass = (active: boolean) =>
    `px-3 text-sm border-2 border-black transition-all rounded-lg cursor-pointer ${
      active ? "bg-amber-900 text-white" : "bg-brand hover-brand"
    }`;

  return (
    <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg">
      <div>
        <img className="rounded-xl" src={img} alt={title} />
      </div>
      <div className="p-2 mt-5">
        <div className="flex flex-row justify-between">
          <h3 className="font-semibold text-xl">{title}</h3>
          <h3 className="font-semibold text-xl">{value}</h3>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            aria-pressed={temperature === "hot"}
            onClick={() => setTemperature("hot")}
            className={buttonClass(temperature === "hot")}
          >
            Hot
          </button>
          <button
            type="button"
            aria-pressed={temperature === "cold"}
            onClick={() => setTemperature("cold")}
            className={buttonClass(temperature === "cold")}
          >
            Cold
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;