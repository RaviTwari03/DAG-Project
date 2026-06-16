// outputNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const updateNodeField = useStore((s) => s.updateNodeField, shallow);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  const inputs = [{ id: `${id}-value`, label: 'value' }];

  return (
    <BaseNode
      title="Output"
      icon="📤"
      nodeType="customOutput"
      inputs={inputs}
      outputs={[]}
    >
      <div className="node-field">
        <label>Name</label>
        <input type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="node-field">
        <label>Type</label>
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
