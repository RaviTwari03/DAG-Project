// emailNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

export const EmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data?.recipient ?? '');

  const updateNodeField = useStore((s) => s.updateNodeField, shallow);

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    updateNodeField(id, 'recipient', e.target.value);
  };

  const inputs  = [{ id: `${id}-message`, label: 'message' }];
  const outputs = [{ id: `${id}-sent`,    label: 'sent'    }];

  return (
    <BaseNode
      title="Email"
      icon="✉️"
      nodeType="email"
      inputs={inputs}
      outputs={outputs}
    >
      <div className="node-field">
        <label>Recipient</label>
        <input
          type="email"
          value={recipient}
          placeholder="user@example.com"
          onChange={handleRecipientChange}
        />
      </div>
    </BaseNode>
  );
};
