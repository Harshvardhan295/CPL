import React from 'react';

const MatchSchedule = () => {
    const schedule = [
        { time: '6:00 AM - 7:00 AM', team1: 'RCB', team2: 'KKR' },
        { time: '7:00 AM - 8:00 AM', team1: 'SRH', team2: 'CSK' },
        { time: '8:00 AM - 9:00 AM', team1: 'DC', team2: 'GT' },
        { time: '9:00 AM - 10:00 AM', team1: 'MI', team2: 'PBKS' },
        { time: '10:00 AM - 11:00 AM', team1: 'SRH', team2: 'DC' },
        { time: '11:00 AM - 12:00 PM', team1: 'CSK', team2: 'KKR' },
        { time: '12:00 PM - 1:00 PM', team1: 'RCB', team2: 'PBKS' },
        { time: '1:00 PM - 2:00 PM', team1: 'MI', team2: 'GT' },
        { time: '2:00 PM - 3:00 PM', team1: 'RCB', team2: 'MI' },
        { time: '3:00 PM - 4:00 PM', team1: 'KKR', team2: 'SRH' },
        { time: '4:00 PM - 5:00 PM', team1: 'CSK', team2: 'DC' },
        { time: '5:00 PM - 6:00 PM', team1: 'PBKS', team2: 'GT' },
    ];

    const teamLogos = {
        RCB: '/teams/RCB.png', CSK: '/teams/CSK.png', KKR: '/teams/KKR.png',
        SRH: '/teams/SRH.png', MI: '/teams/MI.png', DC: '/teams/DC.png',
        PBKS: '/teams/PBKS.png', GT: '/teams/GT.png',
    };

    return (
        <div className="bg-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-cyan-400 font-semibold tracking-widest">CPL 2025</p>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-wider uppercase" style={{fontFamily: "'AtlantaCollegeRegular', sans-serif", textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'}}>
                        Match Day Schedule
                    </h1>
                    <div className="w-32 h-1 bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.7)]"></div>
                </div>

                <div className="space-y-8">
                    {schedule.map((match, index) => (
                        <div key={index} className="text-center transform transition-transform duration-300 hover:scale-105 group">
                            <p className="text-gray-500 mb-3 text-sm tracking-wider">{match.time}</p>
                            <div className="flex items-center justify-center space-x-2 sm:space-x-4 bg-gray-900/50 border border-gray-800 rounded-full p-4 max-w-2xl mx-auto shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:border-cyan-700">
                                <div className="flex-1 flex items-center justify-end space-x-4">
                                    <span className="text-xl sm:text-2xl font-bold group-hover:text-cyan-300 transition-colors">{match.team1}</span>
                                    <img src={teamLogos[match.team1]} alt={match.team1} className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:rotate-[-6deg]" />
                                </div>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-800 border-2 border-cyan-500 flex items-center justify-center font-bold text-lg text-cyan-400 shadow-inner transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-black">
                                    VS
                                </div>
                                <div className="flex-1 flex items-center justify-start space-x-4">
                                    <img src={teamLogos[match.team2]} alt={match.team2} className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:rotate-[6deg]" />
                                    <span className="text-xl sm:text-2xl font-bold group-hover:text-cyan-300 transition-colors">{match.team2}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchSchedule;
