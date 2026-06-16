// BaseNode.jsx — reusable wrapper for all node types
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

/**
 * BaseNode
 *
 * Props:
 *   title     {string}          — displayed in the header
 *   icon      {string|element}  — optional emoji or React element
 *   inputs    {Array<{id, label, position?}>}  — target handles (left by default)
 *   outputs   {Array<{id, label, position?}>}  — source handles (right by default)
 *   children  {ReactNode}       — body content rendered below the header
 *   width     {number}          — optional inline width override
 *   height    {number}          — optional inline height override
 *   nodeType  {string}          — used to build CSS class for the coloured header
 */
export function BaseNode({
  title,
  icon,
  inputs = [],
  outputs = [],
  children,
  width,
  height,
  nodeType,
}) {
  const containerStyle = {};
  if (width  != null) containerStyle.width  = width;
  if (height != null) containerStyle.height = height;

  return (
    <div className="node-container" style={containerStyle}>
      {/* Input handles (target) */}
      {inputs.map((h) => (
        <div key={h.id} className="handle-row handle-row--input">
          <Handle
            type="target"
            id={h.id}
            position={h.position ?? Position.Left}
          />
          <span className="handle-label">{h.label}</span>
        </div>
      ))}

      {/* Coloured header band */}
      <div className={`node-header node-header--${nodeType}`}>
        {icon && <span className="node-header__icon">{icon}</span>}
        <span className="node-header__title">{title}</span>
      </div>

      {/* Body — node-specific content */}
      <div className="node-body">
        {children}
      </div>

      {/* Output handles (source) */}
      {outputs.map((h) => (
        <div key={h.id} className="handle-row handle-row--output">
          <span className="handle-label">{h.label}</span>
          <Handle
            type="source"
            id={h.id}
            position={h.position ?? Position.Right}
          />
        </div>
      ))}
    </div>
  );
}
