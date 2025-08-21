import React from "react";

const About = () => {
  return (
    <div className="bg-black text-gray-300 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-cyan-400 font-semibold tracking-widest text-center">
          CPL 2025
        </p>
        <h1
          className="text-4xl sm:text-6xl font-extrabold tracking-wider uppercase text-center"
          style={{
            fontFamily: "'AtlantaCollegeRegular', sans-serif",
            textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
          }}
        >
          About
        </h1>
        <div className="w-32 h-1 bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.7)]"></div>
        {/* --- Main About Section --- */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="md:w-2/3">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Welcome to the official hub for the Campus Premier League. We've
                been organizing this tournament since 2023, and our journey has
                been one of passion and evolution.
              </p>
              <p>
                Initially, our auctions were conducted randomly, and we soon
                realized this created a gap, leading to unfair team
                compositions. We saw an opportunity to not only bring fairness
                to the game but also to elevate the entire experience.
              </p>
              <p>
                That's why we decided to build this dedicated platform. Here, we
                conduct a transparent and fair auction, schedule matches,
                provide live scorecards, and outline all the rules and
                regulations. It's more than just a tournament; it's a complete
                digital ecosystem for our cricket community.
              </p>
            </div>
          </div>

          {/* Right Content - Organizers */}
          <div className="md:w-1/3 flex flex-col items-center gap-10">
            <div className="text-center">
              <img
                src="src/assets/default-player.png"
                alt="Organizer 1"
                className="w-36 h-36 rounded-full object-cover mx-auto mb-4 border-4 border-gray-700"
              />
              <h3 className="text-2xl font-bold text-white">Harish Kumar</h3>
              <p className="text-cyan-400">Founder & Visionary</p>
            </div>
            <div className="text-center">
              <img
                src="src/assets/default-player.png"
                alt="Organizer 2"
                className="w-36 h-36 rounded-full object-cover mx-auto mb-4 border-4 border-gray-700"
              />
              <h3 className="text-2xl font-bold text-white">
                Harsh Vardhan Khajuria
              </h3>
              <p className="text-cyan-400">Head of Operations</p>
            </div>
          </div>
        </div>

        {/* --- Contact Section --- */}
        <div className="mt-24 pt-12 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to visit us?
              </h2>
              <a href="#" className="text-lg text-cyan-400 hover:underline">
                Ganzenmarkt 6, 3512 GD Utrecht, The Netherlands
              </a>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to call us?
              </h2>
              <a
                href="tel:0031633877574"
                className="text-lg text-cyan-400 hover:underline"
              >
                0031633877574
              </a>
            </div>
          </div>
          <div className="text-center mt-16 text-gray-500">
            <p>Thanks for visiting our website!</p>
            <p>The CPL Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
