import React from "react";
import ReviewCard from "../layout/ReviewCard";
import img1 from "../assets/img/pic1.png";
import img2 from "../assets/img/pic2.png";
import img3 from "../assets/img/pic3.png";

const Reviews = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-brand ">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 ">
        Customer's Reviews
      </h1>

      <div className=" flex flex-col lg:flex-row gap-5 justify-center py-4 my-8">
        <ReviewCard
          img={img1}
          title="Olivia Ava"
          review="Loved the flat white — perfectly balanced. Staff were super friendly, and the music wasn’t too loud. Will return for sure."
        />
        <ReviewCard
          img={img2}
          title="John Deo"
          review="Atmosphere is warm and inviting. Tried their signature cold brew — bold flavor, not too bitter. A hidden gem downtown."
        />
        <ReviewCard
          img={img3}
          title="Sofia Zoe"
          review="The espresso was smooth with rich crema, and the vibe inside felt cozy and calm. Great spot to relax or read."
        />
      </div>
    </div>
  );
};

export default Reviews;
