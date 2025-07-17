import React from 'react';
import Card from '../Components/Card.jsx';

function Home() {
  const cards = [
    {
      image: 'https://via.placeholder.com/150?text=VC',
      title: 'Vice Chancellor View',
    },
    {
      image: 'https://via.placeholder.com/150?text=Teacher',
      title: 'Teacher Timetable',
    },
    {
      image: 'https://via.placeholder.com/150?text=Room',
      title: 'Room Timetable',
    },
    {
      image: 'https://via.placeholder.com/150?text=Semester',
      title: 'Semester Timetable',
    },
    {
      image: 'https://via.placeholder.com/150?text=Department',
      title: 'Department Overview',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
        {/* First row: 3 cards */}
        <div className="flex gap-8 justify-center w-full mb-8">
          {cards.slice(0, 3).map((card, index) => (
            <Card key={index} image={card.image} title={card.title} />
          ))}
        </div>

        {/* Second row: 2 cards */}
        <div className="flex gap-8 justify-center w-full">
          {cards.slice(3).map((card, index) => (
            <Card key={index + 3} image={card.image} title={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
