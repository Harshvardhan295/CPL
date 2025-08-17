import React from 'react';

const Rules = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Auction Rules</h1>
        <div className="prose">
          <h2>Bidding Process</h2>
          <ul>
            <li>Each franchise will start with a purse of 1 crore.</li>
            <li>The base price for every player is 1 lakh.</li>
            <li>Bidding will proceed in increments based on the current bid amount:
              <ul>
                <li>0.5 lakh for bids from 1 lakh to 3 lakh</li>
                <li>1 lakh for bids from 3 lakh to 8 lakh</li>
                <li>2 lakh for bids from 8 lakh to 1 crore</li>
              </ul>
            </li>
          </ul>
          <h2>Team Purse</h2>
          <p>
            Every accepted bid will be immediately deducted from the bidder’s purse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;