// filterNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition ?? '');

  const updateNodeField = useStore((s) => s.updateNodeField, shallow);

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
    updateNodeField(id, 'condition', e.target.value);
  };

  const inputs  = [{ id: `${id}-data`,     label: 'data'     }];
  const outputs = [{ id: `${id}-filtered`, label: 'filtered' }];

  return (
    <BaseNode
      title="Filter"
      icon="🔽"
      nodeType="filter"
      inputs={inputs}
      outputs={outputs}
    >
      <div className="node-field">
        <label>Condition</label>
        <input
          type="text"
          value={condition}
          placeholder='e.g. value > 10'
          onChange={handleConditionChange}
        />
      </div>
    </BaseNode>
  );
};
