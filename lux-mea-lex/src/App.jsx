import 'mdui/mdui.css';
import 'mdui/components/button.js';
import 'mdui/components/layout-main.js';
import 'mdui/components/text-field.js';
import '@mdui/icons/save--outlined.js';

import React, { useEffect, useState } from 'react';
import { snackbar } from 'mdui/functions/snackbar.js';

function App() {
  const [selectionToSave, setSelectionToSave] = useState(null);
  const [selectionToExplain, setSelectionToExplain] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.onChanged.addListener((changes) => {
      const selectionToExplainChange = changes.selectionToExplain;
      const selectionToSaveChange = changes.selectionToSave;

      if (selectionToExplainChange) {
        setSelectionToExplain(selectionToExplainChange.newValue);
      } else if (selectionToSaveChange) {
        setSelectionToSave(selectionToSaveChange.newValue);
      }
    });
  }, []);

  const onSaveClick = () => {
    const snackbarInstance = snackbar({
      message: 'Saved!',
      placement: 'top',
      closeable: true,
    });
    snackbarInstance.classList.add('success');
  };

  const onExplainClick = () => {
    const snackbarInstance = snackbar({
      message: 'TODO: Explaining...',
      placement: 'top',
      closeable: true,
    });
    snackbarInstance.classList.add('info');
  };

  return (
    <mdui-layout-main>
      {selectionToSave && (
        <>
          <mdui-text-field
            style={{ width: 'auto' }}
            type="text"
            placeholder="Save a new word or phrase"
            value={selectionToSave}
            clearable
          />
          <mdui-button variant="filled" onClick={onSaveClick}>
            Save
            <mdui-icon-save--outlined slot="icon" />
          </mdui-button>
        </>
      )}
      {selectionToExplain && (
        <>
          <mdui-text-field
            style={{ width: 'auto' }}
            type="text"
            placeholder="Explain a new word or phrase"
            value={selectionToExplain}
            clearable
          />
          <mdui-button variant="filled" onClick={onExplainClick}>
            Explain
            <mdui-icon-save--outlined slot="icon" />
          </mdui-button>
        </>
      )}
    </mdui-layout-main>
  );
}

export default App;
