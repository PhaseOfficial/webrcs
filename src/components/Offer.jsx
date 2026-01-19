import React from "react";
import StoryNodes from './StoryNodes'
import { Link } from 'react-router-dom';

const Offer = () => {
  return (
    <section className="mb-10">
  <div className="text-center px-8">
    <h2 className="text-4xl font-bold text-blue-900 mb-6">The Vybrant Care Services Story</h2>
    <StoryNodes />
  </div>
  <div className="flex justify-center gap-6 mt-10 mb-20">
  <Link to="/Mordenslavery">
    <button
    className="
      relative overflow-hidden
      rounded-full border-2 border-pink-500 text-pink-500 
      px-6 py-3 mt-8 font-semibold
      transition-all duration-300 ease-in-out
      group
    "
  >
    <span
      className="
        relative z-10 transition-colors duration-300 ease-in-out
        group-hover:text-white
      "
    >
      Modern Slavery Act 2015 
    </span>
    <span
      className="
        absolute inset-0 bg-pink-500 
        translate-x-[-100%] 
        group-hover:translate-x-0
        transition-transform duration-300 ease-in-out
        z-0
      "
    ></span>
  </button>
  
  </Link>
  </div>
  
</section>

  );
};

export default Offer;
