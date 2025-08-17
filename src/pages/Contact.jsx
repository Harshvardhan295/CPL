import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea id="message" rows="5" className="w-full px-3 py-2 border rounded-lg"></textarea>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send Message</button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Information</h2>
            <p className="text-gray-700 mb-4">
              <strong>Address:</strong> Ganzenmarkt 6, 3512 GD Utrecht, The Netherlands
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> 0031633877574
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;