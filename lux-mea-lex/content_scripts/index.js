/* eslint-disable no-undef */
import './mdui.css';

const CONTAINER_ID = 'lux-mea-lex-container';
const CONTAINER_ID_SELECTOR = `#${CONTAINER_ID}`;

const BUTTON_CSS_TEXT = 'background-color: rgb(var(--mdui-color-primary-container)); color: rgb(var(--mdui-color-primary))';

const iconsCss = `
@font-face {
  font-family: 'Material Icons Outlined';
  font-style: normal;
  font-weight: 400;
  src: url(${chrome.runtime.getURL('material-icons.woff2')}) format('woff2');
}
.material-icons-outlined {
  font-family: 'Material Icons Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
`;
const iconsStyle = document.createElement('style');
iconsStyle.innerHTML = iconsCss;
document.head.appendChild(iconsStyle);

function showSnackbar(content) {
  const snackbar = document.createElement('mdui-snackbar');
  snackbar.innerHTML += content;
  snackbar.placement = 'top';
  snackbar.open = true;
  document.body.appendChild(snackbar);
}

function onSaveClick(selection) {
  const text = selection.toString();
  chrome.storage.local.set({ selectionToSave: text }, () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  });
}

function onCloseClick(e) {
  console.log('onCloseClick');
}

function onExplainClick(selection) {
  const text = selection.toString();
  chrome.storage.local.set({ selectionToExplain: text }, () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  });
}

function createContextMenu(selection, coords) {
  document.querySelector(CONTAINER_ID_SELECTOR)?.remove();

  const closeButton = document.createElement('mdui-segmented-button');
  closeButton.addEventListener('click', onCloseClick);
  closeButton.innerHTML += '<mdui-icon slot="icon" name="close--outlined"></mdui-icon>';
  closeButton.style.cssText += BUTTON_CSS_TEXT;

  const saveButton = document.createElement('mdui-segmented-button');
  saveButton.addEventListener('click', () => onSaveClick(selection));
  saveButton.innerHTML += 'Save';
  saveButton.style.cssText += BUTTON_CSS_TEXT;

  const explainButton = document.createElement('mdui-segmented-button');
  explainButton.addEventListener('click', () => onExplainClick(selection));
  explainButton.innerHTML += 'Explain';
  explainButton.style.cssText += BUTTON_CSS_TEXT;

  const container = document.createElement('div');
  const buttonGroup = document.createElement('mdui-segmented-button-group');

  buttonGroup.append(
    saveButton,
    explainButton,
    closeButton,
  );
  container.appendChild(buttonGroup);

  // TODO promote to top layer
  container.style.cssText += `
    position: absolute;
    left: ${coords.x}px;
    top: ${coords.y}px;
    z-index: 9999;
  `;

  container.id = CONTAINER_ID;
  return container;
}

function showContextMenu(selection, coords) {
  // https://www.mdui.org/en/docs/2/components/icon#usage-material-icons
  const contextMenu = createContextMenu(selection, coords);
  document.body.appendChild(contextMenu);
}

document.onmouseup = (e) => {
  const selection = window.getSelection();

  setTimeout(() => {
    if (selection?.type !== 'Range'
      || !selection.toString()
      || e.target?.type === 'button' // close if clicked on a button - including context menu buttons
      || e.target?.parentElement?.type === 'button' // clicking on icon of an icon button, the target element is the icon - look for parent button
    ) {
      document.querySelector(CONTAINER_ID_SELECTOR)?.remove();
      return;
    }

    if (selection?.type === 'Range') {
      showContextMenu(selection, { x: e.pageX, y: e.pageY });
    }
  }, 0);
};
