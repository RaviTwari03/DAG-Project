// PipelineModal.jsx — results overlay after pipeline analysis
export function PipelineModal({ isOpen, result, error, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Pipeline Analysis</h2>

        {error ? (
          <p className="modal-error">{error}</p>
        ) : result ? (
          <div className="modal-stats">
            <div className="stat-row">
              <span>Nodes</span>
              <strong className="stat-value">{result.num_nodes}</strong>
            </div>
            <div className="stat-row">
              <span>Edges</span>
              <strong className="stat-value">{result.num_edges}</strong>
            </div>
            <div className="stat-row">
              <span>Valid DAG</span>
              <span className={`dag-badge dag-badge--${result.is_dag ? 'yes' : 'no'}`}>
                {result.is_dag ? '✅ Yes' : '❌ No'}
              </span>
            </div>
          </div>
        ) : null}

        <button className="btn btn--primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
