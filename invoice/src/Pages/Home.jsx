import React from 'react';
import Card from '../Components/Card.jsx';
import {
  FaFileInvoiceDollar,
  FaUserPlus,
  FaUserCircle,
  FaBoxes,
  FaIndustry,
} from 'react-icons/fa';

function Home() {
  const cards = [
    {
      icon: FaFileInvoiceDollar,
      image: '/images/invoice.jpg',
      title: 'Invoice',
      description: 'Generate and manage invoices for customers quickly and easily.',
      path: '/invoice',
    },
    {
      icon: FaUserPlus,
      image: '/images/clientreg.jpg',
      title: 'Customer Registration',
      description: 'Add new customers to your system with essential details.',
      path: '/customer-reg',
    },
    {
      icon: FaUserCircle,
      image: '/images/clientProfile.jpg',
      title: 'Customer Profile',
      description: 'View and update individual customer profiles and history.',
      path: '/customer-profile',
    },
    {
      icon: FaBoxes,
      image: '/images/inventory.webp',
      title: 'List of Items',
      description: 'Keep track of your stock levels and inventory movement.',
      path: '/inventory',
    },
    {
      icon: FaIndustry,
      image: '/images/profile.jpeg',
      title: 'Company Profile',
      description: 'Manage your company’s core information and branding.',
      path: '/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="flex justify-center w-full mx-5">
        <div className="grid gap-5 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {cards.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              image={card.image}
              title={card.title}
              description={card.description}
              path={card.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
