// toolbar.js
import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const NODE_DEFINITIONS = [
  { type: 'customInput',  label: 'Input',  icon: '📥' },
  { type: 'customOutput', label: 'Output', icon: '📤' },
  { type: 'llm',          label: 'LLM',    icon: '🤖' },
  { type: 'text',         label: 'Text',   icon: '📝' },
  { type: 'api',          label: 'API',    icon: '🌐' },
  { type: 'math',         label: 'Math',   icon: '🔢' },
  { type: 'filter',       label: 'Filter', icon: '🔽' },
  { type: 'delay',        label: 'Delay',  icon: '⏳' },
  { type: 'email',        label: 'Email',  icon: '✉️' },
];

const selector = (s) => ({ getNodeID: s.getNodeID, addNode: s.addNode });

export const PipelineToolbar = () => {
  const { getNodeID, addNode } = useStore(selector, shallow);

  // Click-to-add: place node at a staggered position in the canvas center
  const handleAdd = (type, index) => {
    const nodeID = getNodeID(type);
    addNode({
      id: nodeID,
      type,
      position: { x: 150 + (index % 4) * 220, y: 80 + Math.floor(index / 4) * 160 },
      data: { id: nodeID, nodeType: type },
    });
  };

  return (
    <div className="toolbar">
      <h2 className="toolbar__brand">🚀 VectorShift Workflow Builder</h2>
      <div className="toolbar__nodes">
        {NODE_DEFINITIONS.map(({ type, label, icon }, i) => (
          <DraggableNode
            key={type}
            type={type}
            label={label}
            icon={icon}
            onClick={() => handleAdd(type, i)}
          />
        ))}
      </div>
    </div>
  );
};
