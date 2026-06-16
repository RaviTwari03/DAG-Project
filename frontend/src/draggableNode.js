// draggableNode.js
export const DraggableNode = ({ type, label, icon, onClick }) => {
  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node draggable-node--${type}`}
      onDragStart={onDragStart}
      onClick={onClick}
      draggable
      title={`Click or drag to add ${label} node`}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
