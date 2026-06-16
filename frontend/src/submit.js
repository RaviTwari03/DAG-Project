// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        onError(`HTTP ${response.status}: ${response.statusText}`);
      } else {
        const result = await response.json();
        onSuccess(result);
      }
    } catch (err) {
      onError('Network error: could not reach backend. Is it running on port 8000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-bar">
      <button
        className="btn btn--submit"
        onClick={handleSubmit}
        disabled={loading}
        style={{ opacity: loading ? 0.75 : 1 }}
      >
        {loading ? '⏳ Analyzing...' : '🚀 Analyze Pipeline'}
      </button>
    </div>
  );
};
