import React from "react";
import img from "../assets/img/about.jpg";
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-brand">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">
        About Us
      </h1>

      <div className=" flex flex-col lg:flex-row items-center gap-5">
        <div className=" w-full lg:w-2/4">
          <img className=" rounded-lg" src={img} alt="img" />
        </div>
        <div className=" w-full lg:w-2/4 p-4 space-y-3">
          <h2 className=" font-semibold text-3xl">
            What Makes Our Coffee Special?
          </h2>
          <p>
            What makes our coffee special is the passion behind every cup. From
            carefully selected beans grown in sustainable farms to the expert
            roasting process that brings out their unique flavors, we ensure
            quality at every step. Our skilled baristas craft each cup with
          </p>
          <p>
            precision and care, creating not just a drink, but an experience.
            Rich aroma, balanced taste, and ethical sourcing — that's what sets
            our coffee apart.
          </p>
          <a
            target="blink"
            href="https://www.thirdwavecoffeeroasters.com/blogs/twc/specialty-coffee-what-makes-it-so-special"
          >
            <Button title="Learn More" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
