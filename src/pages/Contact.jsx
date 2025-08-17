import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-300">We'd love to hear from you!</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 font-bold mb-2">Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 border-2 border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:border-cyan-400" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 border-2 border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:border-cyan-400" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-300 font-bold mb-2">Message</label>
                <textarea id="message" rows="5" className="w-full px-4 py-2 border-2 border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:border-cyan-400"></textarea>
              </div>
              <button type="submit" className="bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-colors duration-300">Send</button>
            </form>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Our Information</h2>
            <div className="space-y-4">
                <p className="text-gray-300">
                  <strong>Address:</strong><br/> Ganzenmarkt 6, 3512 GD Utrecht, The Netherlands
                </p>
                <p className="text-gray-300">
                  <strong>Phone:</strong><br/> 0031633877574
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
