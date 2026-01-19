import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import supportedLivingImg from "../assets/supported-living.png"; // ✅ Import your image here

const SupportedLivingCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-red-100 shadow-lg rounded-2xl overflow-hidden p-6 md:p-10">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2">
        <img
          src={supportedLivingImg}
          alt="Supported Living"
          className="w-full h-80 object-cover rounded-2xl"
        />
      </div>

      {/* Right Side - Text & Button */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          Emergency Supported Living Services
        </h2>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed max-w-xl mx-auto md:mx-0">
          We have accommodation that we can use for emergency admissions or in
          crisis situations that are supervised 24/7. This is focusing on young
          adults and adults 18+.
        </p>

        <Link to="/Supportedliving" target="_blank" rel="noopener noreferrer">
          <button
            data-track="supported_living_cta_click"
            className="
              relative overflow-hidden
              rounded-full border-2 border-pink-600 
              text-pink-600 px-6 py-3 font-semibold
              transition-all duration-300 ease-in-out
              group
            "
          >
            <span
              className="
                relative z-10 flex items-center gap-2 text-xl font-semibold
                transition-colors duration-300 ease-in-out
                group-hover:text-white
              "
            >
              <FaHome /> Supported Living
            </span>
            <span
              className="
                absolute inset-0 bg-pink-500 
                -translate-x-full 
                group-hover:translate-x-0
                transition-transform duration-300 ease-in-out
                z-0
              "
            ></span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SupportedLivingCard;
