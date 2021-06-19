import { writeFile } from 'fs/promises';

import { template } from './template.js';
import { activitybar } from './elements/activitybar.js';
import { editor } from './elements/editor.js';
import { sidebar } from './elements/sidebar.js';
import { window } from './elements/window.js';
import { titlebar } from './elements/titlebar.js';
import { actions } from './elements/actions.js';
import { button } from './elements/button.js';
import { dropdown } from './elements/dropdown.js';
import { input } from './elements/input.js';
import { scrollbar } from './elements/scrollbar.js';

async function main() {
  template.colors = {
    ...activitybar,
    ...editor,
    ...sidebar,
    ...window,
    ...titlebar,
    ...actions,
    ...button,
    ...dropdown,
    ...input,
    ...scrollbar,
  };
  try {
    await writeFile(
      `./themes/Rmaki Code-color-theme.json`,
      JSON.stringify(template)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
