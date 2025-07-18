import React from 'react';
import { Link } from 'react-router-dom';

function Card({ icon: Icon, image, title, description, path }) {
  return (
    <Link to={path} className="w-full flex justify-center group">

      <div
        className="w-full max-w-xs md:max-w-sm lg:max-w-md min-h-[360px]
             bg-white rounded-3xl text-center transform transition-all duration-300 ease-out
             hover:scale-105 hover:shadow-xl ring-1 ring-gray-200 shadow-[10px_10px_15px_-5px_rgba(0,0,0,0.15)]"
      >
        <div className="relative w-full h-55 mb-3">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <div className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-full p-2 shadow-md transition-transform duration-300 group-hover:scale-110">
            <Icon className="text-blue-400 text-2xl" />
          </div>

        </div>
        <div className="px-5 pb-5 text-start">
          <h3 className="text-sm sm:text-base md:text-lg text-gray-800 font-bold mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
