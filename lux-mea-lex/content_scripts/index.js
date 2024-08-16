/* eslint-disable no-undef */
import './mdui.css';

function onSaveClick(selection) {
  const text = selection.toString();
  chrome.storage.local.set({ text }, () => {
    console.log('Selection saved: ');
  });
}

function createContextMenu(selection, coords) {
  document.querySelector('#lux-mea-lex-container')?.remove();

  const container = document.createElement('div');
  container.innerHTML = `
  <mdui-segmented-button-group>
    <mdui-segmented-button style="background-color: rgb(var(--mdui-color-primary-container)); color: rgb(var(--mdui-color-primary))">
      Save
    </mdui-segmented-button>
    <mdui-segmented-button style="background-color: rgb(var(--mdui-color-primary-container)); color: rgb(var(--mdui-color-primary))">
      Explain
    </mdui-segmented-button>
    <mdui-segmented-button style="background-color: rgb(var(--mdui-color-primary-container)); color: rgb(var(--mdui-color-primary))">
      Close
    </mdui-segmented-button>
  </mdui-segmented-button-group>
  `;
  // TODO promote to top layer
  container.style.cssText += `
    position: absolute;
    left: ${coords.x}px;
    top: ${coords.y}px;
    z-index: 9999;
  `;

  container.id = 'lux-mea-lex-container';
  return container;
}

function showContextMenu(selection, coords) {
  // https://www.mdui.org/en/docs/2/components/icon#usage-material-icons
  /* <mdui-icon src="https://fonts.gstatic.com/s/i/materialicons/search/v17/24px.svg"></mdui-icon> */
  const contextMenu = createContextMenu(selection, coords);
  document.body.appendChild(contextMenu);
}

document.onmouseup = (e) => {
  const selection = window.getSelection();

  if (selection?.type !== 'Range') {
    document.querySelector('#lux-mea-lex-container')?.remove();
    return;
  }

  if (selection?.type === 'Range') {
    showContextMenu(selection, { x: e.clientX, y: e.clientY });
  }
};
