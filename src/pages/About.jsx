import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400">About Us</h1>
          <p className="mt-4 text-lg text-gray-300">The Story Behind the Campus Premier League</p>
        </div>

        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              The team of My Codeless Website has over 18 years of experience in web design and web development. We're based in Utrecht in the Netherlands. Combined, we've created over 500 websites and have seen so many websites – we dream about them. This auction platform is a showcase of creating dynamic, data-driven web applications for events like the Campus Premier League.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-gray-300 leading-relaxed">
              This blog is made for web designers and small business owners who want to build a new website or improve their current one. We believe in the power of technology to bring communities together, and what better way to do that than through the spirit of cricket!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
