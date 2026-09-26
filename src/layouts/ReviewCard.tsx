import { FaQuoteRight } from "react-icons/fa";
import { BsStarHalf, BsStarFill } from "react-icons/bs";

interface ReviewCardProps {
  img: string;
  title: string;
  review: string;
}

const ReviewCard = ({ img, title, review }: ReviewCardProps) => {
  return (
    <div className=" flex flex-col w-full lg:w-2/6 bg-white p-3 rounded-lg gap-5">
      <div className=" flex flex-row items-center lg:justify-start justify-center">
        <div className="w-1/4">
          <img className=" rounded-full" src={img} alt="img" />
        </div>
        <div className=" mx-3">
          <h2 className=" font-semibold text-lg">{title}</h2>
          <div className=" flex">
            <BsStarFill className=" text-brightColor" />
            <BsStarFill className=" text-brightColor" />
            <BsStarFill className=" text-brightColor" />
            <BsStarFill className=" text-brightColor" />
            <BsStarHalf className=" text-brightColor" />
          </div>
        </div>
        <span className=" ml-16">
          <FaQuoteRight className=" text-backgroundColor" size={42} />
        </span>
      </div>
      <p>{review}</p>
    </div>
  );
};

export default ReviewCard;