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
const Rules = () => {
    const rulesData = [
      { imageSrc: 'https://placehold.co/200x200/3498db/ffffff?text=1', title: 'Team Purse & Budget', body: 'Each franchise starts with a purse of ₹1 Crore and cannot exceed this budget.' },
      { imageSrc: 'https://placehold.co/200x200/e74c3c/ffffff?text=2', title: 'Bidding Increments', body: 'Bids rise in three bands: increments of ₹0.5L, ₹1L, and ₹2L.' },
      { imageSrc: 'https://placehold.co/200x200/2ecc71/ffffff?text=3', title: 'Finalizing a Sale', body: 'The "SOLD" button finalizes the sale to the highest bidder.' },
      { imageSrc: 'https://placehold.co/200x200/f1c40f/ffffff?text=4', title: 'Undo a Bid', body: 'The "Undo" button reverses the most recent bid in case of an error.' },
      { imageSrc: 'https://placehold.co/200x200/9b59b6/ffffff?text=5', title: 'Player Roster', body: 'Teams must acquire a minimum of 8 and a maximum of 11 players.' },
      { imageSrc: 'https://placehold.co/200x200/e67e22/ffffff?text=6', title: 'Viewing Team Details', body: 'Right-click a team icon to see their roster and remaining purse.' },
    ];

    return (
        <div className="bg-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                <p className="text-cyan-400 font-semibold tracking-widest">CPL 2025</p>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-wider uppercase" style={{fontFamily: "'AtlantaCollegeRegular', sans-serif"}}>
                        Match Rules
                    </h1>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-lg text-gray-400">The official regulations for the Campus Premier League.</p>
                </div>
                <div className="space-y-12">
                    {rulesData.map((rule, index) => {
                        const isOdd = index % 2 === 0;
                        return (
                            <div key={index} className={`group flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10 ${isOdd ? '' : 'md:flex-row-reverse'}`}>
                                <img src={rule.imageSrc} alt={rule.title} className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 transition-transform duration-300 group-hover:scale-110 group-hover:border-cyan-400" />
                                <div className={`text-center ${isOdd ? 'md:text-left' : 'md:text-right'}`}>
                                    <h3 className="text-3xl font-bold text-white mb-3">{rule.title}</h3>
                                    <p className="text-gray-400 text-lg">{rule.body}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Rules;
