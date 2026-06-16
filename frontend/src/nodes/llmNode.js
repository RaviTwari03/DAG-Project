// llmNode.js
import { BaseNode } from '../components/BaseNode';

export const LLMNode = ({ id, data }) => {
  const inputs = [
    { id: `${id}-system`, label: 'system' },
    { id: `${id}-prompt`, label: 'prompt' },
  ];
  const outputs = [{ id: `${id}-response`, label: 'response' }];

  return (
    <BaseNode
      title="LLM"
      icon="🤖"
      nodeType="llm"
      inputs={inputs}
      outputs={outputs}
    >
      <p style={{ margin: 0, fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
        Large Language Model node. Connect a system prompt and user prompt to generate a response.
      </p>
    </BaseNode>
  );
};
