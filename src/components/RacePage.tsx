import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, BookOpen, Languages } from 'lucide-react';
import axios from 'axios';

const RacePage: React.FC = () => {
  const { raceName } = useParams<{ raceName: string }>();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [historyEntries, setHistoryEntries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/history/${raceName}`);
        setHistoryEntries(response.data.history);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [raceName]);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/translate', { text: inputText, race: raceName });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error occurred during translation');
    }
    setLoading(false);
  };

  const filteredHistory = historyEntries.filter((entry) =>
    entry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">{raceName} Database</h1>
      
      <div className="mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Languages className="mr-2" />
          Translator
        </h2>
        <textarea
          className="w-full p-2 border rounded bg-gray-700 text-blue-200 mb-4"
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center w-full hover:bg-blue-700 transition duration-300"
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? 'Translating...' : (
            <>
              <Search className="mr-2" size={20} />
              Translate
            </>
          )}
        </button>
        {translatedText && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Translation:</h3>
            <p className="p-2 bg-gray-700 border border-blue-500 rounded">{translatedText}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2" />
          Historical Database
        </h2>
        <input
          type="text"
          placeholder="Search history..."
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-blue-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="space-y-4">
          {filteredHistory.map((entry, index) => (
            <div key={index} className="p-3 bg-gray-700 rounded">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RacePage;