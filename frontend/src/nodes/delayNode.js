// delayNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(
    Math.min(Math.max(data?.delayMs ?? 1000, 1), 300000)
  );

  const updateNodeField = useStore((s) => s.updateNodeField, shallow);

  const handleDelayChange = (e) => {
    const val = Math.min(Math.max(Number(e.target.value), 1), 300000);
    setDelayMs(val);
    updateNodeField(id, 'delayMs', val);
  };

  const inputs  = [{ id: `${id}-trigger`, label: 'trigger' }];
  const outputs = [{ id: `${id}-done`,    label: 'done'    }];

  return (
    <BaseNode
      title="Delay"
      icon="⏳"
      nodeType="delay"
      inputs={inputs}
      outputs={outputs}
    >
      <div className="node-field">
        <label>Delay (ms)</label>
        <input
          type="number"
          value={delayMs}
          min={1}
          max={300000}
          onChange={handleDelayChange}
        />
      </div>
    </BaseNode>
  );
};
