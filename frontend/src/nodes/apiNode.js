// apiNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url ?? '');

  const updateNodeField = useStore((s) => s.updateNodeField, shallow);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    updateNodeField(id, 'url', e.target.value);
  };

  const inputs  = [{ id: `${id}-endpoint`, label: 'endpoint' }];
  const outputs = [{ id: `${id}-response`, label: 'response' }];

  return (
    <BaseNode
      title="API"
      icon="🌐"
      nodeType="api"
      inputs={inputs}
      outputs={outputs}
    >
      <div className="node-field">
        <label>URL</label>
        <input
          type="text"
          value={url}
          placeholder="https://api.example.com/..."
          onChange={handleUrlChange}
        />
      </div>
    </BaseNode>
  );
};
