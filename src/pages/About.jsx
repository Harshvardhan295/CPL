import React from 'react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              The team of My Codeless Website has over 18 years of experience in web design and web development. We're based in Utrecht in the Netherlands. Combined, we've created over 500 websites and have seen so many websites – we dream about them.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              This blog is made for web designers and small business owners who want to build a new website or improve their current one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;