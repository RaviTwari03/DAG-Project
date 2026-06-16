// inputNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const updateNodeField = useStore((s) => s.updateNodeField, shallow);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  const outputs = [{ id: `${id}-value`, label: 'value' }];

  return (
    <BaseNode
      title="Input"
      icon="📥"
      nodeType="customInput"
      inputs={[]}
      outputs={outputs}
    >
      <div className="node-field">
        <label>Name</label>
        <input type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="node-field">
        <label>Type</label>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
