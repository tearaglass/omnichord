import React, { useState } from 'react';

const SamplerPanel = ({ onSampleChange }) => {
  const [sampleUrl, setSampleUrl] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSampleUrl(url);
      onSampleChange(url);
    }
  };

  return (
    <div className="bg-zinc-800 border border-purple-700 p-4 rounded-xl shadow-md mt-4">
      <h3 className="text-purple-300 font-mono text-sm mb-2">Sampler</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="text-xs text-purple-100"
      />
      {sampleUrl && (
        <audio controls src={sampleUrl} className="mt-2 w-full" />
      )}
    </div>
  );
};

export default SamplerPanel;