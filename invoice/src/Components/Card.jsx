import React from 'react';

function Card({ image, title }) {
  return (
    <div
      className="w-90 h-90 bg-gray-800 rounded-3xl p-4 text-center hover:scale-105 transition"
      style={{
        boxShadow: '10px 0 15px -5px rgba(0, 0, 0, 0.4)',
      }}
    >
      <img
        src={image}
        alt={title}
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4 bg-amber-300"
      />
      <h3 className="font-semibold text-white">{title}</h3>
    </div>
  );
}

export default Card;
