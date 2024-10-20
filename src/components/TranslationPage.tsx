import React, { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const TranslationPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/translate', { text: inputText });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error occurred during translation');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Conlang Translator</h2>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center w-full"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? (
          'Translating...'
        ) : (
          <>
            <Search className="mr-2" size={20} />
            Translate
          </>
        )}
      </button>
      {translatedText && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Translation:</h3>
          <p className="p-2 bg-white border rounded">{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslationPage;