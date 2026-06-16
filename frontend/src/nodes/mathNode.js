// mathNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

export const MathNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator ?? '+');

  const updateNodeField = useStore((s) => s.updateNodeField, shallow);

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
    updateNodeField(id, 'operator', e.target.value);
  };

  const inputs = [
    { id: `${id}-a`, label: 'a' },
    { id: `${id}-b`, label: 'b' },
  ];
  const outputs = [{ id: `${id}-result`, label: 'result' }];

  return (
    <BaseNode
      title="Math"
      icon="🔢"
      nodeType="math"
      inputs={inputs}
      outputs={outputs}
    >
      <div className="node-field">
        <label>Operator</label>
        <select value={operator} onChange={handleOperatorChange}>
          <option value="+">+ (Add)</option>
          <option value="-">− (Subtract)</option>
          <option value="*">× (Multiply)</option>
          <option value="/">÷ (Divide)</option>
        </select>
      </div>
    </BaseNode>
  );
};
