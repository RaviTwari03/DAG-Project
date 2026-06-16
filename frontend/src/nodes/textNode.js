// textNode.js
import { useState, useRef, useEffect } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { BaseNode } from '../components/BaseNode';

/**
 * Extract unique {{variable}} names from text.
 * - Valid JS identifiers only: [A-Za-z_$][A-Za-z0-9_$]*
 * - Deduped, ordered by first appearance
 * - Capped at 10
 */
function extractVariables(text) {
  const regex = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
  const seen = new Set();
  const result = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      result.push(name);
      if (result.length === 10) break;
    }
  }
  return result;
}

export const TextNode = ({ id, data }) => {
  const initialText = data?.text || '{{input}}';
  const [text, setText] = useState(initialText);
  const [variables, setVariables] = useState(() => extractVariables(initialText));
  const textareaRef = useRef(null);

  const updateNodeInternals = useUpdateNodeInternals();

  const { updateNodeField, removeEdgesForHandle } = useStore(
    (s) => ({
      updateNodeField:    s.updateNodeField,
      removeEdgesForHandle: s.removeEdgesForHandle,
    }),
    shallow
  );

  // Auto-resize on mount for the initial value
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    const clamped = Math.min(Math.max(ta.scrollHeight, 40), 400);
    ta.style.height = `${clamped}px`;
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateNodeField(id, 'text', newText);

    // Auto-resize textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      const clamped = Math.min(Math.max(ta.scrollHeight, 40), 400);
      ta.style.height = `${clamped}px`;
    }

    // Variable extraction and edge cleanup
    const newVars = extractVariables(newText);
    const removed = variables.filter((v) => !newVars.includes(v));
    removed.forEach((v) => removeEdgesForHandle(id, `${id}-${v}`));
    setVariables(newVars);
    updateNodeInternals(id);
  };

  // Dynamic input handles — one per detected variable
  const inputs = variables.map((v) => ({
    id: `${id}-${v}`,
    label: v,
  }));

  const outputs = [{ id: `${id}-output`, label: 'output' }];

  return (
    <BaseNode
      title="Text"
      icon="📝"
      nodeType="text"
      inputs={inputs}
      outputs={outputs}
    >
      <div className="node-field">
        <label>Text</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Type text with {{variables}}..."
          style={{ minHeight: 40 }}
        />
      </div>
    </BaseNode>
  );
};
