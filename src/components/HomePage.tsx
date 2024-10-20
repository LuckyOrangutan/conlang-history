import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [races, setRaces] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get('/api/races');
        setRaces(response.data.races || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching races:', error);
        setError('Failed to fetch races. Please try again later.');
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Explore Alien Civilizations</h1>
      {!races ? (
        <p>Error: Unable to load races.</p>
      ) : races.length === 0 ? (
        <p>No races available. Start by creating a new race in the Workshop!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race) => (
            <Link key={race} href={`/race/${race}`}>
              <a className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                <Users className="mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-semibold">{race}</h2>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;