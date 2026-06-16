// App.js
import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI }      from './ui';
import { SubmitButton }    from './submit';
import { PipelineModal }   from './components/PipelineModal';
import './styles/globals.css';

function App() {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [modalError,  setModalError]  = useState(null);

  const handleSuccess = (result) => {
    setModalResult(result);
    setModalError(null);
    setModalOpen(true);
  };

  const handleError = (errorMsg) => {
    setModalResult(null);
    setModalError(errorMsg);
    setModalOpen(true);
  };

  return (
    <div className="app-layout">
      <PipelineToolbar />

      <PipelineUI />

      <SubmitButton onSuccess={handleSuccess} onError={handleError} />

      <PipelineModal
        isOpen={modalOpen}
        result={modalResult}
        error={modalError}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default App;
