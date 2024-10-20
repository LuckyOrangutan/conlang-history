import React, { useState } from 'react';
import { PlusCircle, BookOpen, Languages } from 'lucide-react';
import axios from 'axios';

const RaceWorkshop: React.FC = () => {
  const [selectedRace, setSelectedRace] = useState('');
  const [newRaceName, setNewRaceName] = useState('');
  const [activeTab, setActiveTab] = useState<'conlang' | 'history'>('conlang');
  const [entry, setEntry] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRace = async () => {
    try {
      // Replace with your actual API endpoint
      await axios.post('/api/races', { name: newRaceName });
      setSelectedRace(newRaceName);
      setNewRaceName('');
    } catch (error) {
      console.error('Error creating race:', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(`/api/${activeTab}`, { race: selectedRace, entry });
      setAiResponse(response.data.aiResponse);
      setEntry('');
    } catch (error) {
      console.error('Submission error:', error);
      setAiResponse('Error occurred during processing');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Race Workshop</h1>
      
      <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Select or Create a Race</h2>
        <select
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-blue-200"
          value={selectedRace}
          onChange={(e) => setSelectedRace(e.target.value)}
        >
          <option value="">Select a race</option>
          {/* Add options dynamically based on available races */}
        </select>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="New race name"
            className="flex-grow p-2 border rounded bg-gray-700 text-blue-200"
            value={newRaceName}
            onChange={(e) => setNewRaceName(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700 transition duration-300"
            onClick={handleCreateRace}
          >
            <PlusCircle className="mr-2" size={20} />
            Create
          </button>
        </div>
      </div>

      {selectedRace && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Develop {selectedRace}</h2>
          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 ${activeTab === 'conlang' ? 'bg-blue-600' : 'bg-gray-700'} rounded-l`}
              onClick={() => setActiveTab('conlang')}
            >
              <Languages className="inline mr-2" size={20} />
              Conlang
            </button>
            <button
              className={`flex-1 py-2 ${activeTab === 'history' ? 'bg-blue-600' : 'bg-gray-700'} rounded-r`}
              onClick={() => setActiveTab('history')}
            >
              <BookOpen className="inline mr-2" size={20} />
              History
            </button>
          </div>
          <textarea
            className="w-full p-2 mb-4 border rounded bg-gray-700 text-blue-200"
            rows={6}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder={`Enter ${activeTab === 'conlang' ? 'conlang development notes' : 'historical information'}...`}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center w-full hover:bg-blue-700 transition duration-300"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit for AI Processing'}
          </button>
          {aiResponse && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">AI Response:</h3>
              <p className="p-2 bg-gray-700 border border-blue-500 rounded">{aiResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RaceWorkshop;