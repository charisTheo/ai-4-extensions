import 'mdui/mdui.css';
import 'mdui/components/button.js';
import 'mdui/components/layout-main.js';
import '@mdui/icons/save--outlined.js';

import React from 'react';
import { snackbar } from 'mdui/functions/snackbar.js';

function App() {

  const onSaveClick = () => {
    const snackbarInstance = snackbar({
      message: 'Saved!',
      placement: 'top',
      closeable: true,
    });
    snackbarInstance.classList.add('success');
  };

  return (
    <mdui-layout-main>
      <mdui-button variant="filled" onClick={onSaveClick}>
        Save
        <mdui-icon-save--outlined slot="icon" />
      </mdui-button>
    </mdui-layout-main>
  );
}

export default App;
