import React from 'react';

// --- Reusable Rule Components ---

/**
 * A single rule card component.
 * It displays an image and text content, with an alternating layout based on the index.
 * @param {object} props - The component props.
 * @param {object} props.rule - The rule object containing imageSrc, title, and body.
 * @param {number} props.index - The index of the rule in the list, used for alternating layout.
 */
const RuleCard = ({ rule, index }) => {
  const isOdd = index % 2 === 0;

  const containerClasses = `
    flex flex-col md:flex-row items-center 
    gap-8 md:gap-12 p-6 md:p-8 
    bg-gray-900/60 backdrop-blur-sm 
    rounded-2xl shadow-lg border border-cyan-500/20
    transition-all duration-300 hover:border-cyan-500/60 hover:shadow-cyan-500/20 hover:scale-[1.02]
  `;

  const layoutClasses = isOdd ? '' : 'md:flex-row-reverse';

  return (
    <article className={`${containerClasses} ${layoutClasses}`}>
      {/* Image Container */}
      <figure className="flex-shrink-0">
        <img
          src={rule.imageSrc}
          alt={rule.title}
          className="w-48 h-48 rounded-full object-cover border-4 border-gray-700 shadow-lg transition-all duration-300 group-hover:border-cyan-400"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/200x200/1a202c/718096?text=Image`;
          }}
        />
      </figure>

      {/* Text Content */}
      <div className="text-center md:text-left">
        <h3 className="text-3xl font-bold text-cyan-300 mb-4">{rule.title}</h3>
        <p className="text-gray-300 leading-relaxed text-lg">{rule.body}</p>
      </div>
    </article>
  );
};

/**
 * A reusable component to display a list of rules.
 * It accepts an array of rule objects and renders them with an alternating layout.
 * @param {object} props - The component props.
 * @param {Array<object>} props.rules - An array of rule objects, each with imageSrc, title, and body.
 * @param {string} [props.className] - Optional additional CSS classes for the container.
 */
const RulesList = ({ rules, className = '' }) => {
  return (
    <div className={`space-y-12 ${className}`}>
      {rules.map((rule, index) => (
        <RuleCard key={index} rule={rule} index={index} />
      ))}
    </div>
  );
};


// --- Example Data for the Rules ---
const rulesData = [
  {
    imageSrc: 'https://placehold.co/200x200/3498db/ffffff?text=Rule+1',
    title: '1. Team Purse & Budget',
    body: 'Each franchise will begin the auction with a total purse of ₹1 Crore. All player purchases will be deducted from this amount. Franchises cannot spend more than their allotted purse under any circumstances.',
  },
  {
    imageSrc: 'https://placehold.co/200x200/e74c3c/ffffff?text=Rule+2',
    title: '2. Bidding Increments',
    body: 'The base price for every player is ₹1 Lakh. Bidding proceeds in structured increments: ₹0.5 Lakh (up to ₹3 Lakh), ₹1 Lakh (up to ₹8 Lakh), and ₹2 Lakh (up to the ₹1 Crore ceiling).',
  },
  {
    imageSrc: 'https://placehold.co/200x200/2ecc71/ffffff?text=Rule+3',
    title: '3. Finalizing a Sale',
    body: 'When the auctioneer finds no further bids, the "SOLD" button finalizes the sale. The player is sold to the highest bidder, and the amount is deducted from their team\'s purse.',
  },
  {
    imageSrc: 'https://placehold.co/200x200/f1c40f/ffffff?text=Rule+4',
    title: '4. Undo a Bid',
    body: 'The "Undo" button can be used to reverse the most recent bid in case of an error. This action reverts the bid amount and the last bidder to their previous state, restoring the purse.',
  },
  {
    imageSrc: 'https://placehold.co/200x200/9b59b6/ffffff?text=Rule+5',
    title: '5. Player Roster',
    body: 'Each team must acquire a minimum of 8 players and a maximum of 11 players. The auction will conclude once all players have been presented or all teams have filled their rosters.',
  },
  {
    imageSrc: 'https://placehold.co/200x200/e67e22/ffffff?text=Rule+6',
    title: '6. Viewing Team Details',
    body: 'Right-clicking on any team\'s icon will open a pop-up window displaying the list of players bought by that team and their remaining purse balance for quick reference.',
  },
];


const Rules = () => {
  return (
    <div className="bg-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 
            className="text-4xl sm:text-5xl font-extrabold text-cyan-400"
            style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.7)' }}
          >
            Auction Rules & Regulations
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Official rules for the Campus Premier League Auction
          </p>
        </div>

        <RulesList rules={rulesData} />
        
      </div>
    </div>
  );
};

export default Rules;
