import React, { useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import axios from 'axios';

const HistoryPage: React.FC = () => {
  const [historyEntry, setHistoryEntry] = useState('');
  const [conlangEntry, setConlangEntry] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Replace with your actual API endpoint
      await axios.post('/api/history', { historyEntry, conlangEntry });
      setHistoryEntry('');
      setConlangEntry('');
      alert('Entry saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Error occurred while saving');
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">History and Conlang Development</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Historical Entry
        </label>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={historyEntry}
          onChange={(e) => setHistoryEntry(e.target.value)}
          placeholder="Enter historical information..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conlang Development
        </label>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={conlangEntry}
          onChange={(e) => setConlangEntry(e.target.value)}
          placeholder="Enter conlang development notes..."
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center w-full"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? (
          'Saving...'
        ) : (
          <>
            <Save className="mr-2" size={20} />
            Save Entry
          </>
        )}
      </button>
    </div>
  );
};

export default HistoryPage;