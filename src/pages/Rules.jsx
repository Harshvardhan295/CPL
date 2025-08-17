import React from 'react';

const Rules = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400">Auction Rules & Regulations</h1>
          <p className="mt-4 text-lg text-gray-300">Official rules for the Campus Premier League Auction</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white border-b-2 border-cyan-400 pb-2 mb-4">1. Team Purse</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Each franchise will begin the auction with a total purse of <strong>₹1 Crore</strong>. All player purchases will be deducted from this amount. Franchises cannot spend more than their allotted purse.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white border-b-2 border-cyan-400 pb-2 mb-4">2. Bidding Process</h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              The base price for every player is <strong>₹1 Lakh</strong>. Bidding will proceed in structured increments based on the current bid value.
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-300">
              <li>For bids from ₹1 Lakh up to ₹3 Lakh, the increment will be <strong>₹0.5 Lakh</strong>.</li>
              <li>For bids from ₹3 Lakh up to ₹8 Lakh, the increment will be <strong>₹1 Lakh</strong>.</li>
              <li>For bids from ₹8 Lakh up to the ₹1 Crore ceiling, the increment will be <strong>₹2 Lakh</strong>.</li>
            </ul>
          </div>
           <div>
            <h2 className="text-3xl font-bold text-white border-b-2 border-cyan-400 pb-2 mb-4">3. Finalizing a Sale</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              When the auctioneer finds no further bids for a player, the "SOLD" button will be used to finalize the sale. The player will be sold to the team that made the last highest bid, and the bid amount will be deducted from their purse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
